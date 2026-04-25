
//config/reportConfig.ts
import { Report } from "../lib/supabase";

export const REPORT_CONFIG: Record<string, Partial<Report>> = {

  // 🔹 AP Details Report
  "apdetails": {
    key: "apdetails",
    api_endpoint: "/api/APDetails",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        {
          type: "select",
          name: "company",
          label: "Company"
        },
        {
          type: "select",
          name: "vendor",
          label: "Vendor"
        }
      ]
    }
  },
  // 🔹 AP Summary Report
  "apsummary": {
    key: "apsummary",
    api_endpoint: "/api/APSummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        {
          type: "select",
          name: "company",
          label: "Company"
        }
      ]
    }
  },

  // 🔹 Customer Totals Report
  "customertotals": {
    key: "customertotals",
    api_endpoint: "/api/CustomerTotals",
    enableSchedule: true,
    supports_excel_export: true,
    
    filter_config: {
      filters: [
        {
          type: "select",
          name: "company",
          label: "Company",
          show: "ECN"
        }
      ]
    }
  },
// 🔵 After Hours Users Report
"afterhoursusersreport": {
  key:"afterhoursusersreport",
  api_endpoint: "/api/AfterHoursUsersReport",
  enableSchedule: true,
  supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period",
          name: "timeperiod", // Matches your ReportViewer logic
          label: "Time Period",
          options: ["TODAY", "YESTERDAY", "MONTH TO DATE", "LAST MONTH", "YEAR TO DATE", "LAST YEAR"]
        }
      ]
    }
  },
//Customer Info
"customerinfo": {
  key: "customerinfo",
  api_endpoint: "/api/CustomerInfo",
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "customer", label: "Customer" }
    ]
  }
},
//Item Details
"itemdetails": {
  key: "itemdetails",
  api_endpoint: "/api/itemdetails",
  enableSchedule: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }
  
},
// 13 Month Customer Invoiced Sales for Vendor
"thirteenmonthcustomersalesforvendor": {
  key: "thirteenmonthcustomersalesforvendor",
  api_endpoint: "/api/thirteenmonthcustomersalesforvendor",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "salesrep", label: "Sales Rep", type: "select",allowAll: true    },
      { name: "supplier", label: "Supplier", type: "select" },
    ]
  }  
},
// // Items to Discontinue Report
// "itemtodiscontinuereport": {
//   key: "itemtodiscontinuereport",
//   api_endpoint: "/api/itemtodiscontinuereport",
//   supports_excel_export: true,
//   filter_config: {
//     filters: [
//       { name: "company", label: "Company", type: "select" , show: "ECN" }
//     ]
//   }  
// },
// Open Vendor PO Report
"openpo": {
  key: "openpo",
  api_endpoint: "/api/openpo",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "supplierop", label: "Supplier", type: "select",allowAll: true  },
    ]
  }  
},
"binchangelocation": {
  key: "binchangelocation",
  api_endpoint: "/api/binchangelocation",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "location", label: "Location" },
      { type: "checkbox", name: "stockable", label: "Stockable Only" }
    ]
  }
},


};