// src/config/reportConfig.ts
import { Report } from "../lib/supabase";

export const REPORT_CONFIG: Record<string, Partial<Report>> = {

  "apdetails": {
    key: "apdetails",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId"},
        { type: "select", name: "vendor", label: "Vendor", apiParam: "vendorId", required: true }
      ]
    }
  },

  "apsummary": {
    key: "apsummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId"}
      ]
    }
  },

  "customertotals": {
    key: "customertotals",
    enableSchedule: true,
    supports_excel_export: true,  
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ECN" }
      ]
    }
  },

  "afterhoursusersreport": {
    key: "afterhoursusersreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "customerinfo": {
    key: "customerinfo",
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },

  "itemdetails": {
    key: "itemdetails",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "thirteenmonthcustomersalesforvendor": {
    key: "thirteenmonthcustomersalesforvendor",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
      ]
    }
  },

  "openpo": {
    key: "openpo",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplierop", label: "Supplier", apiParam: "supplierId", allowAll: true, required: true },
      ]
    }
  },

  "binchangelocation": {
    key: "binchangelocation",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "checkbox", name: "stockable", label: "Stockable Only" }
      ]
    }
  },

  "adssalesreport": {
    key: "adssalesreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "agingreportsummary": {
    key: "agingreportsummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        {
          type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"],
          defaultValue: "ALL"
        },
      ]
    }
  },

  "itemwithpriceandcost": {
    key: "itemwithpriceandcost",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "accountwithbouncestatus": {
    key: "accountwithbouncestatus",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "accountwithholdterms": {
    key: "accountwithholdterms",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "accountwithnocreditlimit": {
    key: "accountwithnocreditlimit",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "ads_allocation": {
    key: "ads_allocation",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "adsdailytotalshipped": {
    key: "adsdailytotalshipped",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        {
          type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"],
          defaultValue: "ALL"
        },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "agingwithytdsales": {
    key: "agingwithytdsales",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true }
      ]
    }
  },

  "amazontransferopen": {
    key: "amazontransferopen",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "backordersfordiscallitems": {
    key: "backordersfordiscallitems",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "backordersfordiscitems": {
    key: "backordersfordiscitems",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "backordersforitem": {
    key: "backordersforitem",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "itemId", label: "Item Id", apiParam: "itemId", placeholder: "Enter Item Id Here..", required: true }
      ]
    }
  },

  "backtostockorder": {
    key: "backtostockorder",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },

  "badinvoicedatereport": {
    key: "badinvoicedatereport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "binloc_supplier": {
    key: "binloc_supplier",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "binstobezeroed": {
    key: "binstobezeroed",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "checkbox", name: "binzero", label: "Exclude Bin Zero" }
      ]
    }
  },

  "canceled_items_for_order": {
    key: "canceled_items_for_order",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },

  "casecountsforvendor": {
    key: "casecountsforvendor",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "checkregisterexport": {
    key: "checkregisterexport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ECN" },
        { type: "text", name: "bank_no", label: "Bank No", apiParam: "bank_no", placeholder: "Enter Bank Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "closeoutinventory": {
    key: "closeoutinventory",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "XG" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", defaultSelect: "100002" },
        { type: "text", name: "minavail", label: "Min Avail", apiParam: "minavail", defaultValue: "0", placeholder: "Min Qty.", required: true }
      ]
    }
  },

  "closeoutsalesreport": {
    key: "closeoutsalesreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "WTD (Week to Date)", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "closeoutsaleswithprofit": {
    key: "closeoutsaleswithprofit",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "WTD (Week to Date)", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "closeoutswithnoinventory": {
    key: "closeoutswithnoinventory",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "XG" }
      ]
    }
  },

  "codorderswithopenbalance": {
    key: "codorderswithopenbalance",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "collectioncallnotes": {
    key: "collectioncallnotes",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },

  "createopenrma": {
    key: "createopenrma",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "creditamountrma": {
    key: "createopenrma",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "creditcardorderswithopenbalance": {
    key: "creditcardorderswithopenbalance",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "creditholds": {
    key: "creditholds",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "creditlimitchangehistory": {
    key: "creditlimitchangehistory",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "creditlimithistoryforcustomer": {
    key: "creditlimithistoryforcustomer",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },

  "creditsissued": {
    key: "creditsissued",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "credittermspendingwithbalance": {
    key: "credittermspendingwithbalance",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "custactivity": {
    key: "custactivity",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "fromdate", label: "From Date", required: true },
        { type: "date", name: "tilldate", label: "Till Date", required: true }
      ]
    }
  },

  "customerlookupbyemailaddress": {
    key: "customerlookupbyemailaddress",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "emailaddress", label: "Email", apiParam: "emailaddress", required: true, placeholder: "Type Email Address Here..." }
      ]
    }
  },

  "customerpayments": {
    key: "customerpayments",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },

  "corporatepaymentdetailbylocation": {
    key: "corporatepaymentdetailbylocation",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "payment_no", label: "Payment No", apiParam: "payment_no", required: true, placeholder: "Type Payment Number Here..." }
      ]
    }
  },

  "customerpricingchanges": {
    key: "customerpricingchanges",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        {
          type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "customerswithonedollarcreditlimit": {
    key: "customerswithonedollarcreditlimit",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "checkbox", name: "stockable", label: "All Customer" }
      ]
    }
  },

  "customerswithonedollarcreditlimitandrecentactivity": {
    key: "customerswithonedollarcreditlimitandrecentactivity",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },

  "diffprice1tocostusage": {
    key: "diffprice1tocostusage",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "periodStart", name: "start", label: "Start", apiParam: "startperiod", required: true },
        { type: "periodEnd", name: "end", label: "End", apiParam: "endperiod", required: true }
      ]
    }
  },

  "discontinuedbylocation": {
    key: "discontinuedbylocation",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },

  "dropstock_loc": {
    key: "dropstock_loc",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "text", name: "bin", label: "Bin", apiParam: "bin", placeholder: "Bin No...", required: true }
      ]
    }
  },

  "duebycutoff_cutoff": {
    key: "duebycutoff_cutoff",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "cutoff", label: "Select Cutoff", apiParam: "cutoffDate", required: true }
      ]
    }
  },

  "ecnbucks": {
    key: "ecnbucks",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "show", label: "ShowName", apiParam: "ShowId", required: true },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "ecnbuckscustomer": {
    key: "ecnbuckscustomer",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "show", label: "ShowName", apiParam: "ShowId", required: true },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  "ecnstatement": {
    key: "ecnstatement",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },
  "ecnstatementshipto": {
    key: "ecnstatementshipto",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },
  "executivemonthlysalessummary": {
    key: "executivemonthlysalessummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "executivevendorsummary": {
    key: "executivevendorsummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", show:"ECN" , apiParam: "compId"},
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "180", placeholder: "Enter Number Days Here...", required: true }
      ]
    }
  },
  "expiringcreditcards": {
    key: "expiringcreditcards",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true }
      ]
    }
  },
  "galleyordersapp": {
    key: "galleyordersapp",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "groupcodeexport": {
    key: "groupcodeexport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ADV,ECN,XG"}
      ]
    }
  },
  "inactivecustomeragingall": {
    key: "inactivecustomeragingall",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "90", placeholder: "Enter Number Days Here...", required: true }
      ]
    }
  },
  "inactivecustomeragingrecent": {
    key: "inactivecustomeragingrecent",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "90", placeholder: "Enter Number Days Here...", required: true },
        { type: "text", name: "maxdaysold", label: "Max Day Sold", apiParam: "maxdaysold", defaultValue: "120", placeholder: "Enter Max Number Days Here...", required: true }
      ]
    }
  },
  "inactivecustomers": {
    key: "inactivecustomers",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "60", placeholder: "Enter Number Days Here...", required: true },
        { type: "text", name: "maxdaysold", label: "Max Day Sold", apiParam: "maxdaysold", defaultValue: "180", placeholder: "Enter Max Number Days Here...", required: true }
      ]
    }
  },
  "inactivecustomerswithlocation": {
    key: "inactivecustomerswithlocation",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "60", placeholder: "Enter Number Days Here...", required: true },
        { type: "text", name: "maxdaysold", label: "Max Day Sold", apiParam: "maxdaysold", defaultValue: "180", placeholder: "Enter Max Number Days Here...", required: true }
      ]
    }
  },
  "inv_value": {
    key: "inv_value",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"}
      ]
    }
  },
  "inv_value_pg": {
    key: "inv_value_pg",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"}
      ]
    }
  },
  "invalidmsds": {
    key: "invalidmsds",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"}
      ]
    }
  },
  "inventory_adjustments": {
    key: "inventory_adjustments",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "text", name: "minqty", label: "Min Qty", apiParam: "minqty", placeholder: "Enter Min Qty Here...", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "inventorylevelsandpricesforitemprefix": {
    key: "inventorylevelsandpricesforitemprefix",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "text", name: "prefix", label: "Prefix", apiParam: "prefix", placeholder: "Enter Prefix Here...", required: true }
      ]
    }
  },
  "inventorylocationsupplier": {
    key: "inventorylocationsupplier",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },
  "inventoryvaluelocations": {
    key: "inventoryvaluelocations",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },


};