// //components/ItemDetailsBulkTable
import { useRef, useState, useCallback, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-classic.min.css";

import Handsontable from "handsontable";
import { textRenderer } from "handsontable/renderers/textRenderer";

import axios from "axios";
import * as XLSX from "xlsx";
import { buildApiUrl } from "../lib/supabase";

registerAllModules();

interface Props {
  compId: string;
}

export default function ItemDetailsBulkTable({ compId }: Props) {
  const hotRef = useRef<any>(null);
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([
    { item_id: "", item_desc: "", price1: "", upc: "" }
  ]);

  useEffect(() => {
    setData([{ item_id: "", item_desc: "", price1: "", upc: "" }]);
    setLoading(false);
    console.log("Company changed → table cleared");
  }, [compId]);

  const afterChange = useCallback((changes: any, source: string) => {
    if (!changes || source === "loadData" || !compId) return;

    changes.forEach(async ([row, prop, , newVal]: any) => {
      if (prop === "item_id" && newVal) {
        try {
          const res = await axios.get(buildApiUrl("/api/ItemDetails/data"), {
            params: { compId, itemIdList: newVal },
            headers: { Authorization: `Bearer ${token}` }
          });

          if (res.data?.length > 0) {
            setData((prev) => {
              const updated = [...prev];
              updated[row] = { ...updated[row], ...res.data[0] };
              return updated;
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  }, [compId, token]);

  const bulkFetch = useCallback(async () => {
    if (!compId) return;

    const hot = hotRef.current?.hotInstance;
    if (!hot) return;

    const ids = hot.getSourceData()
      .map((r: any) => (r?.item_id || "").toString().trim())
      .filter(Boolean);

    if (!ids.length) return;

    setLoading(true);
    try {
      const res = await axios.get(buildApiUrl("/api/ItemDetails/data"), {
        params: { compId, itemIdList: ids.join(",") },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data?.length) {
        setData((prev) =>
          prev.map((row) => {
            const match = res.data.find((d: any) => d.item_id === row.item_id);
            return match ? { ...row, ...match } : row;
          })
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [compId, token]);

  const beforePaste = useCallback((pasteData: any[][], coords: any[]) => {
    const hot = hotRef.current?.hotInstance;
    if (!hot) return;

    let finalData: string[] = [];

    pasteData.forEach((row) => {
      row.forEach((cell) => {
        if (cell) {
          const split = cell.toString().split(/\r?\n/);
          finalData.push(...split);
        }
      });
    });

    finalData = finalData.map(v => v.trim()).filter(Boolean);
    if (!finalData.length) return;

    const startRow = coords[0]?.startRow ?? 0;
    const currentRows = hot.countRows();
    const requiredRows = startRow + finalData.length;

    if (requiredRows > currentRows) {
      hot.alter("insert_row_below", currentRows - 1, requiredRows - currentRows);
    }

    pasteData.length = 0;
    finalData.forEach((val) => pasteData.push([val]));
  }, []);

  const afterPaste = useCallback(() => {
    setTimeout(bulkFetch, 200);
  }, [bulkFetch]);

  const clearTable = () => {
    setData([{ item_id: "", item_desc: "", price1: "", upc: "" }]);
  };
  const handleExportExcel = () => {
    const hot = hotRef.current?.hotInstance;
    if (!hot) return;

    const rawData = hot.getData().filter((r: any[]) => r && r[0]);
    if (!rawData.length) {
      alert("No data available to export!");
      return;
    }

    const colHeaders = ["Item Id", "Description", "Price ($)", "UPC"];
    const exportRows = [colHeaders, ...rawData];
    const ws = XLSX.utils.aoa_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ItemDetailsBulk.xlsx");
  };

  const descriptionRenderer = (
    instance: Handsontable.Core,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) => {
    textRenderer(instance, td, row, col, prop, value, cellProperties);

    if (value && typeof value === "string" && value.toUpperCase().includes("NO LONGER AVAILABLE")) {
      td.style.color = "#ef4444";
      td.style.fontWeight = "500";
    }
  };

  const priceRenderer = (
    instance: Handsontable.Core,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) => {
    textRenderer(instance, td, row, col, prop, value, cellProperties);

    if (value) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        td.textContent = "$" + num.toFixed(2);
        td.style.textAlign = "right";
      }
    }
  };

  return (
    <div className="space-y-4 p-4 bg-[#111827] text-gray-200 text-xs font-sans min-h-screen">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span
          style={{
            fontSize: "15px",
            fontStyle: "italic",
            color: "#f87171"
          }}
        >
          Please paste list of Item Ids in box below.
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={clearTable}
            style={{
              padding: "6px 14px",
              backgroundColor: "#26304a",
              color: "#e7ebf5",
              border: "1px solid #323e5c",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Clear Table
          </button>

          <button
            type="button"
            onClick={handleExportExcel}
            style={{
              padding: "6px 14px",
              backgroundColor: "#26304a",
              color: "#e7ebf5",
              border: "1px solid #323e5c",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Export Excel
          </button>
        </div>
      </div>

      <div style={{ height: "650px", position: "relative", overflow: "hidden" }} className="border border-gray-700 bg-[#1F2937] rounded">
        {loading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(17, 24, 39, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}>
            <div className="spinner" />
          </div>
        )}

        <HotTable
          ref={hotRef}
          data={data}
          colHeaders={["Item Id", "Description", "Price ($)", "UPC"]}
          columns={[
            { data: "item_id" },
            { data: "item_desc", readOnly: true, renderer: descriptionRenderer },
            { data: "price1", readOnly: true, renderer: priceRenderer },
            { data: "upc", readOnly: true },
          ]}
          rowHeaders={false}
          width="100%"
          height={600}
          stretchH="all"
          licenseKey="non-commercial-and-evaluation"
          copyPaste={true}
          minRows={1}
          enterMoves={{ row: 1, col: 0 }}
          fixedRowsTop={1}
          className="custom-handsontable htThemeClassic"
          afterChange={afterChange}
          beforePaste={beforePaste}
          afterPaste={afterPaste}
        />
      </div>
    </div>
  );
}