import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Download, RefreshCw, CheckSquare, Search } from "lucide-react";
import { buildApiUrl } from "../lib/supabase";

interface Props {
  compId: string;
}

export default function ItemToDiscontinueGrid({ compId }: Props) {
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [checkedMap, setCheckedMap] = useState<Record<string, { web: boolean; feed: boolean }>>({});

  const fetchData = async () => {
    if (!compId || compId === "Select Company") return;
    setLoading(true);
    try {
      const url = buildApiUrl ? buildApiUrl("/Home/itemtodiscontinuereport_data") : "/Home/itemtodiscontinuereport_data";
      const res = await axios.post(
        url,
        { Comp_id: compId },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const rawList = Array.isArray(res.data) ? res.data : typeof res.data === "string" ? JSON.parse(res.data) : (res.data?.data || []);
      
      if (rawList.length > 10000) {
        alert("This report cannot be displayed here as the selected criteria produced too many records.\n\nIf you do want to run this report, please export this report directly to excel.");
        setData([]);
        return;
      }

      setData(rawList);

      const initialMap: Record<string, { web: boolean; feed: boolean }> = {};
      rawList.forEach((row: any) => {
        initialMap[row.item_id] = {
          web: row.suppress_web === "Y",
          feed: row.suppress_feed === "Y"
        };
      });
      setCheckedMap(initialMap);

    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch data or criteria produced too many records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [compId]);

  const handleToggle = (itemId: string, field: "web" | "feed") => {
    setCheckedMap(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: !prev[itemId]?.[field]
      }
    }));
  };

  const handleSuppressUpdate = async () => {
    if (!compId || compId === "Select Company") {
      alert("Please Select Company !");
      return;
    }

    const payloadList: string[] = [];

    data.forEach((row) => {
      const id = row.item_id;
      const originalWebDisabled = row.suppress_web === "Y";
      const originalFeedDisabled = row.suppress_feed === "Y";

      const currentWebChecked = checkedMap[id]?.web || false;
      const currentFeedChecked = checkedMap[id]?.feed || false;

      if (currentWebChecked && !originalWebDisabled && currentFeedChecked && !originalFeedDisabled) {
        payloadList.push(`${id}_Y_Y`);
      } else if (currentWebChecked && !originalWebDisabled && currentFeedChecked && originalFeedDisabled) {
        payloadList.push(`${id}_Y_Y`);
      } else if (currentWebChecked && originalWebDisabled && currentFeedChecked && !originalFeedDisabled) {
        payloadList.push(`${id}_Y_Y`);
      } else if (currentWebChecked && !originalWebDisabled) {
        payloadList.push(`${id}_Y_N`);
      } else if (currentFeedChecked && !originalFeedDisabled) {
        payloadList.push(`${id}_N_Y`);
      }
    });

    if (payloadList.length === 0) {
      alert("No new items selected to suppress.");
      return;
    }

    setUpdating(true);
    try {
      const url = buildApiUrl ? buildApiUrl("/Home/getItemSuppress_data") : "/Home/getItemSuppress_data";
      const res = await axios.post(
        url,
        { Comp_id: compId, ItemsList: payloadList.join(";") },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const respText = typeof res.data === "string" ? res.data : res.data?.message || "";
      if (respText.includes("Successfull")) {
        alert("Suppress flags updated successfully.");
        fetchData();
      } else {
        alert("Suppress flags failed for below Item Id(s): " + respText);
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while updating suppress flags.");
    } finally {
      setUpdating(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(val =>
        val !== null && val !== undefined && String(val).toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  const handleExportExcel = () => {
    if (!filteredData.length) {
      alert("No data available to export!");
      return;
    }

    const headers = [
      "Suppress Web", "Suppress Feed", "UID", "Item Id", "Item Desc", "Release date",
      "Last Sold", "Dis Group", "Bought", "QTY", "Order", "NJ Buy", "FL Buy",
      "CA Buy", "NJ Sell.", "FL Sell.", "CA Sell.", "Nj Dis.", "Fl Dis.",
      "CA Dis.", "NJ ABC", "FL ABC", "CA ABC"
    ];

    const exportRows = filteredData.map(r => [
      checkedMap[r.item_id]?.web ? "Y" : "N",
      checkedMap[r.item_id]?.feed ? "Y" : "N",
      r.inv_mast_uid,
      r.item_id,
      r.item_desc,
      r.release_date,
      r.Last_Sold,
      r.default_sales_discount_group,
      r.Last_Bought,
      r.Tot_Qty,
      r.Tot_on_Order,
      r.nj_buy,
      r.fl_buy,
      r.ca_buy,
      r.nj_sellable,
      r.fl_sellable,
      r.ca_sellable,
      r.nj_discontinued,
      r.fl_discontinued,
      r.ca_discontinued,
      r.NJ_ABC,
      r.FL_ABC,
      r.CA_ABC
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...exportRows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `DynamicScreening_${(compId || "").toUpperCase()}.xlsx`);
  };

  return (
    <div style={{ padding: "10px 15px", background: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleSuppressUpdate}
            disabled={updating || loading}
            style={{
              padding: "6px 14px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "1px solid #1d4ed8",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <CheckSquare size={14} /> {updating ? "Updating..." : "Update Suppress Flags"}
          </button>

          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            style={{
              padding: "6px 12px",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "8px", color: "#888" }} />
            <input
              type="text"
              placeholder="Search in grid..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "5px 8px 5px 28px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "12px",
                width: "220px"
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleExportExcel}
            style={{
              padding: "6px 14px",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "1px solid #059669",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <Download size={13} /> Export Excel
          </button>
        </div>
      </div>

      <div style={{ maxHeight: "650px", overflow: "auto", border: "1px solid #ccc", position: "relative" }}>
        {loading && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px", color: "#2563eb", fontWeight: "bold" }}>
            Loading Data...
          </div>
        )}

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", whiteSpace: "nowrap" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1", textAlign: "center" }}>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Suppress Web</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Suppress Feed</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>UID</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1", textAlign: "left" }}>Item Id</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1", textAlign: "left" }}>Item Desc</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Release date</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Last Sold</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Dis Group</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Bought</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>QTY</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Order</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>NJ Buy</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>FL Buy</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>CA Buy</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>NJ Sell.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>FL Sell.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>CA Sell.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Nj Dis.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>Fl Dis.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>CA Dis.</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>NJ ABC</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>FL ABC</th>
              <th style={{ padding: "8px 6px", border: "1px solid #cbd5e1" }}>CA ABC</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={23} style={{ textAlign: "center", padding: "25px", color: "#666" }}>
                  {loading ? "Fetching data..." : "No records found."}
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => {
                const rowBg = index % 2 !== 0 ? "#dddddd" : "#ffffff";
                const webDisabled = row.suppress_web === "Y";
                const feedDisabled = row.suppress_feed === "Y";
                const isWebChecked = checkedMap[row.item_id]?.web || false;
                const isFeedChecked = checkedMap[row.item_id]?.feed || false;

                return (
                  <tr key={row.item_id || index} style={{ background: rowBg, borderBottom: "1px solid #ccc" }}>
                    <td style={{ textAlign: "center", padding: "4px", border: "1px solid #ddd" }}>
                      <input
                        type="checkbox"
                        checked={isWebChecked}
                        disabled={webDisabled}
                        onChange={() => handleToggle(row.item_id, "web")}
                        style={{ cursor: webDisabled ? "not-allowed" : "pointer" }}
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "4px", border: "1px solid #ddd" }}>
                      <input
                        type="checkbox"
                        checked={isFeedChecked}
                        disabled={feedDisabled}
                        onChange={() => handleToggle(row.item_id, "feed")}
                        style={{ cursor: feedDisabled ? "not-allowed" : "pointer" }}
                      />
                    </td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.inv_mast_uid}</td>
                    <td style={{ padding: "4px 8px", fontWeight: "bold", border: "1px solid #ddd" }}>{row.item_id}</td>
                    <td style={{ padding: "4px 8px", border: "1px solid #ddd", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{row.item_desc}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.release_date}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.Last_Sold}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.default_sales_discount_group}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.Last_Bought}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.Tot_Qty}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.Tot_on_Order}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.nj_buy}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.fl_buy}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.ca_buy}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.nj_sellable}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.fl_sellable}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.ca_sellable}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.nj_discontinued}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.fl_discontinued}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.ca_discontinued}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.NJ_ABC}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.FL_ABC}</td>
                    <td style={{ textAlign: "center", padding: "4px 8px", border: "1px solid #ddd" }}>{row.CA_ABC}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}