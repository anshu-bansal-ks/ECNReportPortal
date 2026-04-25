//config/reportColumns.ts

import { Column } from "../lib/supabase";
export const FOOTER_TOTAL_CONFIG: Record<string, {
  totalColumns: string[];           // sum karne wale columns
  labelColumn?: string;             // ← "Total" kis column ke neeche aana hai (column key)
}> = {
  
  // AP Summary Report
  apsummary: {
    totalColumns: ["Balance"],
    labelColumn: "VendorName"       // ← Direct column key (vendorName)
  },

  // AP Details Report
  apdetails: {
    totalColumns: ["Curr", "Over30", "Over60","Over90","Total"], 
    labelColumn: "po_no"
  },

  // // Customer Totals
  // customertotals: {
  //   totalColumns: ["showTotal"],
  //   labelColumn: "customerName"
  // },

  // // Open PO Report
  // openpo: {
  //   totalColumns: ["qty_remaining"],
  //   labelColumn: "supplier_name"    // ya "location_name"
  // },

  // // Thirteen Month Report
  // thirteenmonthcustomersalesforvendor: {
  //   totalColumns: ["total"],
  //   labelColumn: "customer_name"
  // },

  // Default (agar koi report add karna ho)
};
export const REPORT_COLUMN_MAP: Record<string, Column[]> = {
  APDetails: [
    { key: "invoice_date", label: "Invoice Date", type: "date", width: "158px" },
    { key: "invoice_no", label: "Invoice No", type: "integer", width: "200px" },
    { key: "po_no", label: "PO No", type: "text", width: "100px" },
    { key: "Curr", label: "Current", type: "currency", width: "100px" },
    { key: "Over30", label: "OVER 30", type: "currency", width: "100px" },
    { key: "Over60", label: "OVER 60", type: "currency" , width: "100px"},
    { key: "Over90", label: "OVER 90", type: "currency" , width: "100px"},
    { key: "Total", label: "Amount Due", type: "currency", width: "100px" }
  ],

  customertotals: [
    { key: "customer_id", label: "Customer ID", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "showtot", label: "Show Total", type: "currency" }
  ],

  APSummary: [
    { key: "VendorId", label: "Vendor ID", type: "integer" },
    { key: "VendorName", label: "Vendor Name", type: "text" },
    { key: "Balance", label: "Balance", type: "currency" }
  ],
  afterhoursusersreport: [
    { key: "Loginname", label: "Login Name", type: "text" },
    { key: "nt_username", label: "User Name", type: "text" },
    { key: "database_name", label: "Database Name", type: "text" },
    { key: "dbid", label: "Dbid", type: "number" },
    { key: "datadate", label: "Data Date", type: "date" },
    { key: "dateloggedin", label: "Date Logged In", type: "date" },
    { key: "client_net_address", label: "Client Net Address", type: "text" },
    { key: "hostname", label: "Host Name", type: "text" }
  ],
  CustomerInfo: [
    { key: "month_invoicedname", label: "Month", type: "text" },
    { key: "year_invoiced", label: "Year", type: "number" },
    { key: "invoiced_sales", label: "Sales", type: "currency" },
    { key: "amount_paid", label: "Payments", type: "currency" },
    { key: "PmtHist", label: "Pmts Less Sls", type: "currency" }
  ],
  
  thirteenmonthcustomersalesforvendor: [
    { key: "supplier_id",     label: "Supplier Id",     type: "text",    width: "82px" },
    { key: "supplier_name",   label: "Supplier Name",   type: "text",    width: "120px" },
    { key: "customer_id",     label: "Customer Id",     type: "text",    width: "90px" },
    { key: "customer_name",   label: "Customer Name",   type: "text",    width: "120px" },
    { key: "rep",             label: "Rep",             type: "text",    width: "100px" },
    { key: "mon1",  label: "Month 1", type: "number", width: "50px" },
    { key: "mon2",  label: "Month 2", type: "number", width: "50px" },
    { key: "mon3",  label: "Month 3", type: "number", width: "50px" },
    { key: "mon4",  label: "Month 4", type: "number", width: "50px" },
    { key: "mon5",  label: "Month 5", type: "number", width: "50px" },
    { key: "mon6",  label: "Month 6", type: "number", width: "50px" },
    { key: "mon7",  label: "Month 7", type: "number", width: "50px" },
    { key: "mon8",  label: "Month 8", type: "number", width: "50px" },
    { key: "mon9",  label: "Month 9", type: "number", width: "50px" },
    { key: "mon10", label: "Month 10", type: "number", width: "50px" },
    { key: "mon11", label: "Month 11", type: "number", width: "50px" },
    { key: "mon12", label: "Month 12", type: "number", width: "50px" },
    { key: "mon13", label: "Month 13", type: "number", width: "50px" },
    { key: "total", label: "Total", type: "number", width: "50px" },
  ],
  openpo: [
    { key: "location_id", label: "Loc Id", type: "number", width: "65px" },
    { key: "location_name", label: "Loc Name", type: "text", width: "100px" },
    { key: "order_date", label: "Order Date", type: "datetime", width: "100px" },
    { key: "date_due", label: "Due Date", type: "date", width: "88px" },
    { key: "po_no", label: "Po#", type: "text", width: "90px" },
    { key: "external_po_no", label: "External Po", type: "text", width: "87px" },
    { key: "supplier_id", label: "Supplier Id", type: "number", width: "85px" },
    { key: "supplier_name", label: "Supplier Name", type: "text", width: "106px" },
    { key: "item_id", label: "Item Id", type: "text", width: "95px" },
    { key: "supplier_part_no", label: "Supplier Part#", type: "text", width: "106px" },
    { key: "item_desc", label: "Description", type: "text", width: "100px" },
    { key: "qty_ordered", label: "Qty Ordered", type: "number", width: "80px" },
    { key: "qty_received", label: "Qty Received", type: "number", width: "80px" },
    { key: "qty_remaining", label: "Qty Remaining", type: "number", width: "80px" },
  ],
  binchangelocation: [
    { key: "item_id", label: "Item Id",type:"text" },
    { key: "item_desc", label: "Item Description",type:"text" },
    { key: "stockable", label: "Stockable", showIf: { stockable: "true" } ,type:"text"},
    { key: "qty_on_hand", label: "Qty On Hand",type:"text" },
    { key: "primary_bin", label: "Primary Bin",type:"text" },
    { key: "bin", label: "Bin" ,type:"text"}
  ],
};