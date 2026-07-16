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
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
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
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"],
          defaultValue: "ALL"
        },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "checkbox", name: "binzero", label: "Exclude Bin Zero"}
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "period", name: "timeperiod", label: "Time Period",
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
        { type: "periodStart", name: "start", label: "Start", apiParam: "startperiod" },
        { type: "periodEnd", name: "end", label: "End", apiParam: "endperiod" }
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
  "discitemswithbinqtyflags": {
    key: "discitemswithbinqtyflags",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "XG"},
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "select",name: "dataversion", label: "Data Version", apiParam: "Dataversion",required: true,defaultValue: "ALLDATA",
          options: ["All Data","No Qty","Suppress From Web Flag"]
        }
      ]
    }
  },
  "invicedsalesbycustomerlytdbyshipto": {
    key: "invicedsalesbycustomerlytdbyshipto",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" , show:"ECN"},
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B"],defaultValue: "ALL"
        }
      ]
    }
  },
  "invoicedsalescustomertotals": {
    key: "invoicedsalescustomertotals",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicedsalescustomertotalswithfreightbreakdown": {
    key: "invoicedsalescustomertotalswithfreightbreakdown",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicedsalesreptotals": {
    key: "invoicedsalesreptotals",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicedsalessuppliertotals": {
    key: "invoicedsalessuppliertotals",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicedsalessuppliertotalswithprofit": {
    key: "invoicedsalessuppliertotalswithprofit",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "po_no", label: "Po No", apiParam: "po_no", placeholder: "Enter Po Number", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicefreightcharges": {
    key: "invoicefreightcharges",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B"],defaultValue: "ALL" 
        },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicesummaryforcustomer": {
    key: "invoicesummaryforcustomer",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoicesunderspecifiedamount": {
    key: "invoicesunderspecifiedamount",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"],defaultValue: "ALL" },
        { type: "text", name: "freight", label: "Freight", apiParam: "freight", defaultValue: "100", placeholder: "Enter freight", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "invoiceswithnochargeitems": {
    key: "invoiceswithnochargeitems",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "itemreturnsforcustomer": {
    key: "itemreturnsforcustomer",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "itemsreleasedoverdaterange": {
    key: "itemsreleasedoverdaterange",
    enableSchedule:true,
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
  "itemstochangereleasedate": {
    key: "itemstochangereleasedate",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show:"ECN" },
        { type: "date", name: "releasedate", label: "From Date",apiParam: "releasedate",required: true,
        defaultValue: new Intl.DateTimeFormat('en-CA').format(new Date())
        }
      ]
    }
  },
  "ivdnewreleasereport": {
    key: "ivdnewreleasereport",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "date", name: "releasedate", label: "From Date",apiParam: "releasedate",required: true,
        defaultValue: new Intl.DateTimeFormat('en-CA').format(new Date())
        }
      ]
    }
  },
  "ivdrestocku": {
    key: "ivdrestocku",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "IVD" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },
  "ivnmgmt_productdates": {
    key: "ivnmgmt_productdates",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show:"ECN" },
        { type: "date", name: "releasedate", label: "From Date",apiParam: "releasedate",required: true,
        defaultValue: new Intl.DateTimeFormat('en-CA').format(new Date())
        }
      ]
    }
  },
  "leadtimereport": {
    key: "leadtimereport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true, allowAll: true }
      ]
    }
  },
  "linecounts": {
    key: "linecounts",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "location_inventory": {
    key: "location_inventory",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company" , apiParam: "compId"},
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "text", name: "minqty", label: "Min Qty", apiParam: "minqty", placeholder: "Enter Min Qty Here...", required: true },
        
      ]
    }
  },
  "loggedinusers": {
    key: "loggedinusers",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [   
      ]
    }
  },
  "lowprofitreport": {
    key: "lowprofitreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B"], defaultValue: "ALL" },
        { type: "text", name: "profit", label: "Profit Margin (%)", apiParam: "profit", hideLabel: false, defaultValue: "20", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "manualfreightchangesonorders": {
    key: "manualfreightchangesonorders",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "manualpricechanges": {
    key: "manualpricechanges",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "mismatchedcredittermsreport": {
    key: "mismatchedcredittermsreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "missingemailaddressforcustomer": {
    key: "missingemailaddressforcustomer",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "missingparkercode": {
    key: "missingparkercode",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", show: "ECN", apiParam: "compId" }
      ]
    }
  },
  "mixeslastsalelastreceiveddate": {
    key: "mixeslastsalelastreceiveddate",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "IVD"},
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }      
      ]
    }
  },
  "monthovermonthsalesforcustomer": {
    key: "monthovermonthsalesforcustomer",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true }
      ]
    }
  },
  "multiplelogins": {
    key: "multiplelogins",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "text", name: "numb", label: "Number Of Logins", apiParam: "numb", hideLabel: false, defaultValue: "3", required: true },
        
      ]
    }
  },
  "newlybuiltitemsreport": {
    key: "newlybuiltitemsreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "njmixeswithcost": {
    key: "njmixeswithcost",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "IVD"},
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }      
      ]
    }
  },
  "nochargeitemtotalsforsupplier": {
    key: "nochargeitemtotalsforsupplier",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"], defaultValue: "ALL" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nochargesalesbysupplier": {
    key: "nochargesalesbysupplier",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true },
        { type: "checkbox", name: "stockable", label: "Exclude Testers" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nondefaultsourcelocationforitem": {
    key: "nondefaultsourcelocationforitem",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ECN" },
        { type: "text", name: "itemId", label: "Item Id", apiParam: "itemId", placeholder: "Enter Item Id Here..", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "This Week", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nondefaultsourcelocationinvoicelinedetail": {
    key: "nondefaultsourcelocationinvoicelinedetail",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ECN" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "This Week", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nondefaultsourcelocationinvoicesummary": {
    key: "nondefaultsourcelocationinvoicesummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "This Week", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nosalesforspecificitem": {
    key: "nosalesforspecificitem",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "itemId", label: "Item Id", apiParam: "itemId", placeholder: "Enter Item Id Here..", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "nrqtyreceiveddatacenter": {
    key: "nrqtyreceiveddatacenter",
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
  "openorderlistview": {
    key: "openorderlistview",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["ALL", "Approved", "Unapproved"],
          defaultValue: "ALL"
        },
      ]
    }
  },
  "openorders": {
    key: "openorders",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["ALL", "Approved", "Unapproved"],
          defaultValue: "ALL"
        },
      ]
    }
  },
  "openordersbysupplier": {
    key: "openordersbysupplier",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", allowAll: true, required: true },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", allowAll: true, required: true },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["ALL", "Approved", "Unapproved"],
          defaultValue: "ALL"
        },
      ]
    }
  },
  "openordersforitem": {
    key: "openordersforitem",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["ALL", "Approved", "Unapproved"],
          defaultValue: "ALL"
        },
        { type: "text", name: "itemId", label: "Item Id", apiParam: "itemId", placeholder: "Enter Item Id Here..", required: true }
      ]
    }
  },
  "openpickoverview": {
    key: "openpickoverview",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "openquotereport": {
    key: "openquotereport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["ALL", "Approved", "Unapproved"],
          defaultValue: "ALL"
        }
      ]
    }
  },
  "openquotesreport": {
    key: "openquotesreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", allowAll: true, required: true }
      ]
    }
  },
  "openrmadetail": {
    key: "openrmadetail",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "opentransfer": {
    key: "opentransfer",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "openvendorreturns": {
    key: "openvendorreturns",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "checkbox", name: "stockable", label: "Show All" }
      ]
    }
  },
  "order_values": {
    key: "order_values",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "order_weights": {
    key: "order_weights",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "orderallocatedvaluebysupplier": {
    key: "orderallocatedvaluebysupplier",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "orderexport": {
    key: "orderexport",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "orderexportforeign": {
    key: "orderexportforeign",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "orderexportnodiscount": {
    key: "orderexportnodiscount",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "ordersreleasefromhold": {
    key: "ordersreleasefromhold",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "ordersshippedbylocation": {
    key: "ordersshippedbylocation",
    enableSchedule:true,
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
  "p21notesforsalesrepcustomers": {
    key: "p21notesforsalesrepcustomers",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", required: true }
      ]
    }
  },
  "pastdueaccountreportbyrep": {
    key: "pastdueaccountreportbyrep",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "daysold", label: "Day Sold", apiParam: "daysold", defaultValue: "90", placeholder: "Enter Number Days Here...", required: true }
      ]
    }
  },
  "paymentdetail": {
    key: "paymentdetail",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "text", name: "check_number", label: "Check No", apiParam: "check_number", required: true, placeholder: "Type Check Number Here..." }
      ]
    }
  },
  "paymentforcustomer": {
    key: "paymentforcustomer",
    supports_excel_export: true,
    supports_pdf_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "customer", label: "Customer", apiParam: "custId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "paymentinquirybyamount": {
    key: "paymentinquirybyamount",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "amount_num", label: "Amount No", apiParam: "amount_num", required: true, placeholder: "Type Amount Number Here..." },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "pendingapproval": {
    key: "pendingapproval",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", required: true }
      ]
    }
  },
  "pickticketoverviewexecutive": {
    key: "pickticketoverviewexecutive",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" }
      ]
    }
  },
  "piecesshipped": {
    key: "piecesshipped",
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
  "poreceivingdiscrepancyreport": {
    key: "poreceivingdiscrepancyreport",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "pricinginfoforsupplier": {
    key: "pricinginfoforsupplier",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", required: true }
      ]
    }
  },
  "productexpirationsreport": {
    key: "productexpirationsreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId", show: "ADV,ECN,XG" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "checkbox", name: "stockable", label: "Show Blank Dates" }
      ]
    }
  },
  "proforma": {
    key: "proforma",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "ordernum", label: "Order Num", apiParam: "ordernum", placeholder: "Order Number", required: true }
      ]
    }
  },
  "purchaseoverdtrngbysupplier": {
    key: "purchaseoverdtrngbysupplier",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "purchasesummary": {
    key: "purchasesummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Last Week(Sun to Sat)", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "purchasing_poexport": {
    key: "purchasing_poexport",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "pono", label: "Po No", apiParam: "pono", placeholder: "Enter Po No. Here..", required: true }
      ]
    }
  },
  "purchasingdemandreport": {
    key: "purchasingdemandreport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true },
        { type: "select", name: "supplier", label: "Supplier", apiParam: "supplierId", allowAll: true, required: true },
        { type: "periodStart", name: "start", label: "Start", apiParam: "startperiod" },
        { type: "periodEnd", name: "end", label: "End", apiParam: "endperiod" }
      ]
    }
  },
  "putaway": {
    key: "putaway",
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "text", name: "pono", label: "Po No", apiParam: "pono", placeholder: "Enter Po No. Here..", required: true }
      ]
    }
  },
  "receivedporeport": {
    key: "receivedporeport",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "receivinglog_pickdate": {
    key: "receivinglog_pickdate",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "releasedate", label: "From Date",apiParam: "releasedate",required: true,
        defaultValue: new Intl.DateTimeFormat('en-CA').format(new Date())
        }
      ]
    }
  },
  "recentshipments": {
    key: "recentshipments",
    enableSchedule:true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "salesrep", label: "Sales Rep", apiParam: "repId", required: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "This Week", "Last Week(Sun to Sat)"]
        }
      ]
    }
  },
  "reducedfreight": {
    key: "reducedfreight",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "returnsbybuyer": {
    key: "returnsbybuyer",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "status", label: "Status", apiParam: "status",
          options: ["Select Status", "Approved", "Unapproved"]
        },
      ]
    }
  },
  "returnsinvbyloc": {
    key: "returnsinvbyloc",
    supports_excel_export: true,
    locationType: "RETURNS",
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },
  "returnsinvbylocsummary": {
    key: "returnsinvbylocsummary",
    supports_excel_export: true,
    locationType: "RETURNS",
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true }
      ]
    }
  },
  "returnstotalsforsuppliers": {
    key: "returnstotalsforsuppliers",
    supports_excel_export: true,
    locationType: "RETURNS",
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "location", label: "Location", apiParam: "locationId", required: true, allowAll: true },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },
  "salehistoryrepcomparision": {
    key: "salehistoryrepcomparision",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "select", name: "company", label: "Company", apiParam: "compId" },
        { type: "select", name: "custclass", label: "Customer Class", apiParam: "custclass",
          options: ["ALL", "ADS", "B2B", "KIOSK"], defaultValue: "ALL" },
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period", name: "timeperiod", label: "Time Period",
          options: ["Today", "Yesterday", "Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

  


};