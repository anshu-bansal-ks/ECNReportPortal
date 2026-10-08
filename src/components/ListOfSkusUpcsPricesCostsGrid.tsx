import { useRef, useState, useCallback, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-classic.min.css";

import axios from "axios";
import * as XLSX from "xlsx";
import { buildApiUrl } from "../lib/supabase";

registerAllModules();

interface Props {
  compId: string;
}

export default function ListOfSkusUpcsPricesCostsGrid({ compId }: Props) {
  const hotRef = useRef<any>(null);
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);

  const getInitialData = useCallback(() => [["", "", "", "", ""]], []);
  const [data, setData] = useState<any[][]>(getInitialData());

  useEffect(() => {
    setData(getInitialData());
  }, [compId, getInitialData]);

  const colHeaders = ["Item Id", "Item Description", "Price 1 ($)", "UPC", "Cost ($)"];
  const columns = [
    { data: "item_id", type: "text" },
    { data: "item_desc", type: "text", readOnly: true },
    { data: "price1", type: "numeric", numericFormat: { pattern: "$0,0.00" } },
    { data: "upc", type: "text", readOnly: true },
    { data: "cost", type: "numeric", numericFormat: { pattern: "$0,0.00" } },
  ];

  const fetchItemData = async (itemIdList: string) => {
    const endpoint = buildApiUrl
      ? buildApiUrl("/api/ListOfSkusUpcsPricesCosts/data")
      : "/api/ListOfSkusUpcsPricesCosts/data";

    return axios.get(endpoint, {
      params: { compId, itemIdList },
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  };

  const handleAfterChange = useCallback(
    async (changes: any, source: string) => {
      if (!changes || source === "loadData" || !compId) return;
      const hot = hotRef.current?.hotInstance;
      if (!hot) return;

      for (let i = 0; i < changes.length; i++) {
        const [row, prop, oldVal, newVal] = changes[i];

        if (prop === "item_id" || prop === 0) {
          const itemId = (newVal || "").toString().trim();
          if (!itemId) {
            hot.setDataAtCell([
              [row, 1, ""],
              [row, 2, ""],
              [row, 3, ""],
              [row, 4, ""],
            ]);
            continue;
          }

          if (itemId === (oldVal || "").toString().trim()) continue;

          try {
            const res = await fetchItemData(itemId);
            const obj = Array.isArray(res.data) ? res.data : res.data?.data || [];
            if (obj && obj.length > 0) {
              const item = obj[0];
              hot.setDataAtCell([
                [row, 1, item.item_desc || item.ITEM_DESC || ""],
                [row, 2, item.price1 !== "" ? Number(item.price1 || item.PRICE1 || 0) : ""],
                [row, 3, item.upc || item.UPC || ""],
                [row, 4, item.cost !== "" ? Number(item.cost || item.COST || 0) : ""],
              ]);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    },
    [compId]
  );

  const handleAfterPaste = useCallback(() => {
    setTimeout(async () => {
      const hot = hotRef.current?.hotInstance;
      if (!hot || !compId) return;

      const tbldata = hot.getSourceData();
      const ids: string[] = [];
      tbldata.forEach((row: any) => {
        if (row.item_id) ids.push(row.item_id.toString().trim());
      });

      if (ids.length === 0) return;
      const itemIdList = ids.join(",");

      setLoading(true);
      try {
        const res = await fetchItemData(itemIdList);
        const obj = Array.isArray(res.data) ? res.data : res.data?.data || [];
        if (obj.length > 0) {
          hot.loadData(obj);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 150);
  }, [compId]);

  const handleClearTable = () => {
    const hot = hotRef.current?.hotInstance;
    if (hot) hot.loadData(getInitialData());
  };

  const handleExportExcel = () => {
    const hot = hotRef.current?.hotInstance;
    if (!hot) return;

    const rawData = hot.getSourceData().filter((r: any) => r && r.item_id);
    if (!rawData.length) {
      alert("No data available to export!");
      return;
    }

    const exportRows = [
      colHeaders,
      ...rawData.map((r: any) => [r.item_id, r.item_desc, r.price1, r.upc, r.cost])
    ];
    const ws = XLSX.utils.aoa_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "DynamicScreening.xlsx");
  };

  return (
    <div style={{ padding: "10px 15px", background: "#1e2739", borderRadius: "12px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontStyle: "italic", color: "#f87171" }}>
          Please paste list of Item Ids in box below.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button type="button" onClick={handleClearTable} style={{ padding: "6px 14px", backgroundColor: "#26304a", color: "#e7ebf5", border: "1px solid #323e5c", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Clear Table
          </button>
          <button type="button" onClick={handleExportExcel} style={{ padding: "6px 14px", backgroundColor: "#26304a", color: "#e7ebf5", border: "1px solid #323e5c", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Export Excel
          </button>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {loading && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(17, 24, 39, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100, fontSize: "13px", fontWeight: "bold", color: "#fff" }}>
            Loading...
          </div>
        )}
        <HotTable
          ref={hotRef}
          data={data}
          colHeaders={colHeaders}
          columns={columns}
          rowHeaders={false}
          minSpareRows={1}
          contextMenu={true}
          columnSorting={true}
          manualColumnMove={true}
          manualColumnResize={true}
          stretchH="all"
          width="100%"
          height={500}
          licenseKey="non-commercial-and-evaluation"
          copyPaste={true}
          className="htThemeClassic"
          afterChange={handleAfterChange}
          afterPaste={handleAfterPaste}
        />
      </div>
    </div>
  );
}