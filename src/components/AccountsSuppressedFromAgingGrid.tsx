import { useRef, useState, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-classic.min.css";

import axios from "axios";
import { buildApiUrl } from "../lib/supabase";

registerAllModules();

interface Props {
  compId: string;
}

export default function AccountsSuppressedFromAgingGrid({ compId }: Props) {
  const hotRef = useRef<any>(null);
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);

  const getInitialData = (): any[][] => [["", "", "", "", "", "", "", ""]];
  const [data, setData] = useState<any[][]>(getInitialData());

  const colHeaders = [
    "Customer Id",
    "Customer Name",
    "Rep",
    "Current ($)",
    "31-60 ($)",
    "61-90 ($)",
    "Over90 ($)",
    "Total ($)",
  ];

  const columns = [
    { data: "customer_id", type: "text", readOnly: true },
    { data: "customer_name", type: "text", readOnly: true },
    { data: "Rep", type: "text", readOnly: true },
    { data: "B1", type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
    { data: "B2", type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
    { data: "B3", type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
    { data: "B4", type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
    { data: "Total_Due", type: "numeric", numericFormat: { pattern: "$0,0.00" }, readOnly: true },
  ];

  const fetchReportData = async () => {
    if (!compId || compId === "Select Company") {
      setData(getInitialData());
      return;
    }

    setLoading(true);
    try {
      const endpoint = buildApiUrl
        ? buildApiUrl("/api/accountssuppressedfromagingcollection/data")
        : "/api/accountssuppressedfromagingcollection/data";

      const res = await axios.post(
        endpoint,
        { CompId: compId },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const rawList = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (rawList.length > 0) {
        setData(rawList);
      } else {
        setData(getInitialData());
      }
    } catch (err) {
      console.error("Accounts Suppressed fetch error:", err);
      setData(getInitialData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [compId]);


  return (
    <div style={{ padding: "10px 15px", background: "#1e2739", borderRadius: "12px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontStyle: "italic", color: "#f87171" }}>
          Accounts Suppressed from Aging Collections
        </span>
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
          minSpareRows={0}
          contextMenu={true}
          columnSorting={true}
          manualColumnMove={true}
          manualColumnResize={true}
          stretchH="all"
          width="100%"
          height={550}
          licenseKey="non-commercial-and-evaluation"
          className="htThemeClassic"
          cells={(row, col) => {
            const cellProperties: any = {};
            if (col >= 3) {
              if (row % 2 === 1) {
                cellProperties.numericFormat = { pattern: "0.00%" };
              } else {
                cellProperties.numericFormat = { pattern: "$0,0.00" };
              }
            }
            return cellProperties;
          }}
        />
      </div>
    </div>
  );
}