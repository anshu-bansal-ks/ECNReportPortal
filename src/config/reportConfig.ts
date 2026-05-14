
//config/reportConfig.ts
import { Report } from "../lib/supabase";

export const REPORT_CONFIG: Record<string, Partial<Report>> = {

  "apdetails": {
    key: "apdetails",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        {type: "select", name: "company",label: "Company"},
        { type: "select",name: "vendor",label: "Vendor"}
      ]
    }
  },

  "apsummary": {
    key: "apsummary",
    enableSchedule: true,
    supports_excel_export: true,
    filter_config: {
      filters: [
        {type: "select",name: "company",label: "Company"}
      ]
    }
  },

  "customertotals": {
    key: "customertotals",
    enableSchedule: true,
    supports_excel_export: true,  
    filter_config: {
      filters: [
        { type: "select",name: "company",label: "Company",show: "ECN"}
      ]
    }
  },

"afterhoursusersreport": {
  key:"afterhoursusersreport",
  enableSchedule: true,
  supports_excel_export: true,
    filter_config: {
      filters: [
        { type: "date", name: "fromdate", label: "From Date" },
        { type: "date", name: "tilldate", label: "Till Date" },
        { type: "period",name: "timeperiod",label: "Time Period",
          options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]
        }
      ]
    }
  },

"customerinfo": {
  key: "customerinfo",
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "customer", label: "Customer" }
    ]
  }
},

"itemdetails": {
  key: "itemdetails",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }
  
},

"thirteenmonthcustomersalesforvendor": {
  key: "thirteenmonthcustomersalesforvendor",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "salesrep", label: "Sales Rep", type: "select", allowAll: true },
      { name: "supplier", label: "Supplier", type: "select" },
    ]
  }  
},

"openpo": {
  key: "openpo",
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
"adssalesreport": {
  key: "adssalesreport",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]
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
      { name: "company", label: "Company", type: "select" },
      { name: "salesrep", label: "Sales Rep", type: "select", allowAll: true },
      { name: "custclass", label: "Customer Class", type: "select", 
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
      { name: "company", label: "Company", type: "select" }
    ]
  }  
},
"accountwithbouncestatus": {
  key: "accountwithbouncestatus",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select"}
    ]
  }  
},
"accountwithholdterms": {
  key: "accountwithholdterms",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select"}
    ]
  }  
},
"accountwithnocreditlimit": {
  key: "accountwithnocreditlimit",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select"}
    ]
  }  
},
"ads_allocation": {
  key: "ads_allocation",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select"}
    ]
  }  
},
"adsdailytotalshipped": {
  key: "adsdailytotalshipped",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "custclass", label: "Customer Class", type: "select", 
        options: ["ALL", "ADS", "B2B", "KIOSK"],
        defaultValue: "ALL"
      },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]      }
    ]
  }
},
"agingwithytdsales": {
  key: "agingwithytdsales",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "salesrep", label: "Sales Rep", type: "select", allowAll: true }    
    ]
  }  
},
"amazontransferopen": {
  key: "amazontransferopen",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "select", name: "location", label: "Location" }   
    ]
  }  
},
"backordersfordiscallitems": {
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "select", name: "location", label: "Location" }   
    ]
  }  
},
"backordersfordiscitems": {
  key: "backordersfordiscitems",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "supplier", label: "Supplier", type: "select" },
      { type: "select", name: "location", label: "Location" }  
    ]
  }  
},
"backordersforitem": {
  key: "backordersforitem",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "text", name: "itemId", label: "Item Id", placeholder: "Enter Item Id Here.."}  
    ]
  }  
},
"backtostockorder": {
  key: "backtostockorder",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "text", name: "ordernum", label: "ordernum", placeholder: "Order Number"}  
    ]
  }  
},
"badinvoicedatereport": {
  key: "badinvoicedatereport",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" }
    ]
  }  
},
"binloc_supplier": {
  key: "binloc_supplier",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "supplier", label: "Supplier", type: "select" },
      { type: "select", name: "location", label: "Location" }  
    ]
  }  
},
"binstobezeroed": {
  key: "binstobezeroed",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "select", name: "location", label: "Location" },
      { type: "checkbox", name: "binzero", label: "Exclude Bin Zero" }
    ]
  }  
},
"canceled_items_for_order": {
  key: "canceled_items_for_order",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "text", name: "ordernum", label: "ordernum", placeholder: "Order Number"}  
    ]
  }  
},
"casecountsforvendor": {
  key: "casecountsforvendor",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { name: "supplier", label: "Supplier", type: "select" },
      { type: "select", name: "location", label: "Location" }  
    ]
  }  
},
"checkregisterexport": {
  key: "checkregisterexport",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select"  , show: "ECN"  },
      { type: "text", name: "bank_no", label: "bank_no", placeholder: "Enter Bank Number"},
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]
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
      { type: "select", name: "company", label: "Company", show: "XG" },
      { type: "select", name: "location", label: "Location" , defaultSelect: "100002"},
      { type: "text", name: "minavail", label: "minavail", defaultValue: "0", placeholder: "Min Qty." }
    ]
  }
},
"closeoutsalesreport": {
  key: "closeoutsalesreport",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","WTD (Week to Date)", "Last Week(Sun to Sat)","Month To Date", "Last Month", "Year To Date", "Last Year"]
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
      { name: "company", label: "Company", type: "select" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","WTD (Week to Date)", "Last Week(Sun to Sat)","Month To Date", "Last Month", "Year To Date", "Last Year"]
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
      { type: "select", name: "company", label: "Company", show: "XG" },
    ]
  }  
},
"codorderswithopenbalance": {
  key: "codorderswithopenbalance",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
    ]
  }  
},
"collectioncallnotes": {
  key: "collectioncallnotes",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "customer", label: "Customer" }
    ]
  }  
},
"createopenrma": {
  key: "createopenrma",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }  
},
"creditamountrma": {
  key: "createopenrma",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }  
},
"creditcardorderswithopenbalance": {
  key: "creditcardorderswithopenbalance",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
    ]
  }  
},
"creditholds": {
  key: "creditholds",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
    ]
  }  
},
"creditlimitchangehistory": {
  key: "creditlimitchangehistory",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]
      }
    ]
  }  
},
"creditlimithistoryforcustomer": {
  key: "creditlimithistoryforcustomer",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "customer", label: "Customer" }
    ]
  }  
},
"creditsissued": {
  key: "creditsissued",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "select", name: "customer", label: "Customer" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Month To Date", "Last Month", "Year To Date", "Last Year"]
      }
    ]
  }  
},
"credittermspendingwithbalance": {
  key: "credittermspendingwithbalance",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }  
},
"custactivity": {
  key: "custactivity",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "select", name: "customer", label: "Customer" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" }
    ]
  }  
},
"customerlookupbyemailaddress": {
  key: "customerlookupbyemailaddress",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "text", name: "emailaddress", label: "emailaddress", placeholder: "Type Email Address Here..." }
    ]
  }  
},
"customerpayments": {
  key: "customerpayments",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "customer", label: "Customer" }
    ]
  }  
},
"corporatepaymentdetailbylocation": {
  key: "corporatepaymentdetailbylocation",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "text", name: "payment_no", label: "payment_no", placeholder: "Type Payment Number Here..." }
    ]
  }  
},
"customerpricingchanges": {
  key: "customerpricingchanges",
  enableSchedule: true,
  supports_excel_export: true,
  filter_config: {
    filters: [
      { name: "company", label: "Company", type: "select" },
      { type: "date", name: "fromdate", label: "From Date" },
      { type: "date", name: "tilldate", label: "Till Date" },
      { type: "period",name: "timeperiod",label: "Time Period",
        options: ["Today","Yesterday","Last Week(Sun to Sat)","Month To Date", "Last Month", "Year To Date", "Last Year"]
      }
    ]
  }  
},
"customerswithonedollarcreditlimit": {
  key: "customerswithonedollarcreditlimit",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "checkbox", name: "stockable", label: "All Customer" }
    ]
  }
},
"customerswithonedollarcreditlimitandrecentactivity": {
  key: "customerswithonedollarcreditlimitandrecentactivity",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" }
    ]
  }
},
"diffprice1tocostusage": {
  key: "diffprice1tocostusage",
  supports_excel_export: true,
  filter_config: {
    filters: [
      { type: "select", name: "company", label: "Company" },
      { type: "select", name: "location", label: "Location" },
      { type: "periodStart", name: "start", label: "Start" }, // Dropdown 1
      { type: "periodEnd", name: "end", label: "End" }
    ]
  }
},



};