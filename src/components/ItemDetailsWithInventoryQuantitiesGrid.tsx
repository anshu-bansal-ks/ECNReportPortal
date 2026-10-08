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

export default function ItemDetailsWithInventoryQuantitiesGrid({ compId }: Props) {
  const hotRef = useRef<any>(null);
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);

  const cleanComp = (compId || "").trim().toLowerCase();
  const isXg = cleanComp === "xg";
  const isAdv = cleanComp === "adv";

  const getInitialData = useCallback((): any[][] => {
    if (isXg) {
      return [["", "", "", "", "", "", ""]];
    } else if (isAdv) {
      return [["", "", "", "", "", "", "", "", "", ""]];
    } else {
      return [["", "", "", "", "", "", "", "", ""]];
    }
  }, [isXg, isAdv]);

  const [data, setData] = useState<any[][]>(getInitialData());

  useEffect(() => {
    setData(getInitialData());
  }, [compId, getInitialData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hot = hotRef.current?.hotInstance;
      if (hot) hot.render();
    }, 150);
    return () => clearTimeout(timer);
  }, [compId, data]);

  const getGridConfig = () => {
    if (isXg) {
      return {
        colHeaders: ["Item Id", "Item Description", "UPC", "Release Date", "Price1 ($)", "PA QTY", "Tot Qty"],
        columns: [
          { type: "text" }, { readOnly: true }, { readOnly: true },
          { type: "text", allowEmpty: true, readOnly: false },
          { type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
          { type: "numeric", readOnly: true }, { type: "numeric", readOnly: true },
        ],
      };
    } else if (isAdv) {
      return {
        colHeaders: ["Item Id", "Item Description", "UPC", "Release Date", "Price1 ($)", "NJ QTY", "FL Qty", "CA Qty", "LV Qty", "Tot Qty"],
        columns: [
          { type: "text" }, { readOnly: true }, { readOnly: true },
          { type: "text", allowEmpty: true, readOnly: false },
          { type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
          { type: "numeric", readOnly: true }, { type: "numeric", readOnly: true },
          { type: "numeric", readOnly: true }, { type: "numeric", readOnly: true },
          { type: "numeric", readOnly: true },
        ],
      };
    } else {
      return {
        colHeaders: ["Item Id", "Item Description", "UPC", "Release Date", "Price1 ($)", "NJ QTY", "FL Qty", "CA Qty", "Tot Qty"],
        columns: [
          { type: "text" }, { readOnly: true }, { readOnly: true },
          { type: "text", allowEmpty: true, readOnly: false },
          { type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
          { type: "numeric", readOnly: true }, { type: "numeric", readOnly: true },
          { type: "numeric", readOnly: true }, { type: "numeric", readOnly: true },
        ],
      };
    }
  };

  const { colHeaders, columns } = getGridConfig();

  const fetchItemData = async (itemIdList: string) => {
    const endpoint = buildApiUrl
      ? buildApiUrl("/api/ItemDetailsWithInventoryQuantities/data")
      : "/api/ItemDetailsWithInventoryQuantities/data";

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

        if (prop === 0 || prop === "0") {
          const itemId = (newVal || "").toString().trim();

          if (!itemId) {
            const emptyRow = getInitialData()[0].map(() => "");
            hot.setDataAtCell(row, 0, emptyRow);
            continue;
          }

          if (itemId === (oldVal || "").toString().trim()) continue;

          try {
            const res = await fetchItemData(itemId);
            const obj = Array.isArray(res.data) ? res.data : res.data?.data || [];

            if (obj && obj.length > 0) {
              const item = obj[0];
              if (isXg) {
                hot.setDataAtCell([
                  [row, 1, item.item_desc || ""],
                  [row, 2, item.upc || item.UPC || ""],
                  [row, 3, item.release_date || ""],
                  [row, 4, item.price1 !== "" ? Number(item.price1) : ""],
                  [row, 5, Number(item.pA_Qty || item.PA_Qty || 0)],
                  [row, 6, Number(item.tot_Qty || item.Tot_Qty || 0)],
                ]);
              } else if (isAdv) {
                hot.setDataAtCell([
                  [row, 1, item.item_desc || ""],
                  [row, 2, item.upc || item.UPC || ""],
                  [row, 3, item.release_date || ""],
                  [row, 4, item.price1 !== "" ? Number(item.price1) : ""],
                  [row, 5, Number(item.nJ_QTY || item.NJ_QTY || 0)],
                  [row, 6, Number(item.fL_Qty || item.FL_Qty || 0)],
                  [row, 7, Number(item.cA_Qty || item.CA_Qty || 0)],
                  [row, 8, Number(item.lV_Qty || item.LV_Qty || 0)],
                  [row, 9, Number(item.tot_Qty || item.Tot_Qty || 0)],
                ]);
              } else {
                hot.setDataAtCell([
                  [row, 1, item.item_desc || ""],
                  [row, 2, item.upc || item.UPC || ""],
                  [row, 3, item.release_date || ""],
                  [row, 4, item.price1 !== "" ? Number(item.price1) : ""],
                  [row, 5, Number(item.nJ_QTY || item.NJ_QTY || 0)],
                  [row, 6, Number(item.fL_Qty || item.FL_Qty || 0)],
                  [row, 7, Number(item.cA_Qty || item.CA_Qty || 0)],
                  [row, 8, Number(item.tot_Qty || item.Tot_Qty || 0)],
                ]);
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    },
    [compId, isXg, isAdv, getInitialData]
  );

  const handleAfterPaste = useCallback(() => {
    setTimeout(async () => {
      const hot = hotRef.current?.hotInstance;
      if (!hot || !compId) return;

      const tbldata = hot.getData();
      const ids: string[] = [];
      for (let i = 0; i < tbldata.length; i++) {
        const id = (tbldata[i][0] || "").toString().trim();
        if (id) ids.push(id);
      }

      if (ids.length === 0) return;
      const itemIdList = ids.join(",");

      setLoading(true);
      try {
        const res = await fetchItemData(itemIdList);
        const obj = Array.isArray(res.data) ? res.data : res.data?.data || [];

        const freshRows: any[][] = [];
        obj.forEach((item: any) => {
          if (isXg) {
            freshRows.push([
              item.item_id || "", item.item_desc || "", item.upc || item.UPC || "",
              item.release_date || "", item.price1 !== "" ? Number(item.price1) : "",
              Number(item.pA_Qty || item.PA_Qty || 0), Number(item.tot_Qty || item.Tot_Qty || 0),
            ]);
          } else if (isAdv) {
            freshRows.push([
              item.item_id || "", item.item_desc || "", item.upc || item.UPC || "",
              item.release_date || "", item.price1 !== "" ? Number(item.price1) : "",
              Number(item.nJ_QTY || item.NJ_QTY || 0), Number(item.fL_Qty || item.FL_Qty || 0),
              Number(item.cA_Qty || item.CA_Qty || 0), Number(item.lV_Qty || item.LV_Qty || 0),
              Number(item.tot_Qty || item.Tot_Qty || 0),
            ]);
          } else {
            freshRows.push([
              item.item_id || "", item.item_desc || "", item.upc || item.UPC || "",
              item.release_date || "", item.price1 !== "" ? Number(item.price1) : "",
              Number(item.nJ_QTY || item.NJ_QTY || 0), Number(item.fL_Qty || item.FL_Qty || 0),
              Number(item.cA_Qty || item.CA_Qty || 0), Number(item.tot_Qty || item.Tot_Qty || 0),
            ]);
          }
        });

        if (freshRows.length > 0) hot.loadData(freshRows);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 150);
  }, [compId, isXg, isAdv]);

  const handleClearTable = () => {
    const hot = hotRef.current?.hotInstance;
    if (hot) hot.loadData(getInitialData());
  };

  const handleExportExcel = () => {
    const hot = hotRef.current?.hotInstance;
    if (!hot) return;

    const rawData = hot.getData().filter((r: any[]) => r && r[0]);
    if (!rawData.length) {
      alert("No data available to export!");
      return;
    }

    const exportRows = [colHeaders, ...rawData];
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