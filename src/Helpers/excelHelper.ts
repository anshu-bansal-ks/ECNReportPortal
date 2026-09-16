// src/Helpers/excelHelper.ts
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Column {
  key: string;
  label: string;
  type?: string;
}

interface ExcelExportOptions {
  data: any[];
  columns: Column[];
  reportName: string;
  totalColumns?: string[];
  footerConfig?: {
    labelColumn?: number | string;
  };
  totals?: Record<string, number>;
}

export const exportReportToExcel = ({
  data,
  columns,
  reportName,
  totalColumns = [],
  footerConfig,
  totals = {},
}: ExcelExportOptions) => {
  
  if (!data || data.length === 0) {
    alert("No data available to export!");
    return;
  }

  try {
    const headers = columns.map((col) => {
        if (col.type === "currency") {
          return `${col.label} ($)`;       
        }
        return col.label;
      });

    // Data Rows
    const rows = data.map((row) => {
      return columns.map((col) => {
        let value = row[col.key];

        if (col.type === "currency" || col.type === "number") {
          return parseFloat(value) || 0;
        }
        if (col.type === "date") {
          return value ? new Date(value).toLocaleDateString("en-US") : "";
        }
        return value ?? "";
      });
    });

    if (totalColumns.length > 0 && footerConfig?.labelColumn !== undefined) {
      const totalRow = columns.map((col, index) => {
        if (index === footerConfig.labelColumn) {
          return "Total";
        }
        if (totals[col.key] !== undefined) {
          return col.type === "currency" 
            ? totals[col.key] 
            : Math.round(totals[col.key]);
        }
        return "";
      });
      rows.push(totalRow);
    }

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    worksheet["!cols"] = columns.map(() => ({ wch: 20 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const date = new Date().toISOString().split("T")[0];
    const cleanName = reportName.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${cleanName}_${date}.xlsx`;

    // Download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, fileName);

  } catch (error) {
    console.error("Excel Export Error:", error);
    alert("Failed to export Excel file. Please try again.");
  }
};