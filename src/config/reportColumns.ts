//config/reportColumns.ts
import { Column } from "../lib/supabase";

export const DRILL_DOWN_LINKS: Record<string, any> = {
  apsummary: {targetUrl: "/report/apdetails",queryParam: "vendorid",
  keyFields: ["vendor_id", "vendorId"]
  },
  accountwithbouncestatus: {targetUrl: "/report/customerinfo",queryParam: "custId",
    keyFields: ["customer_id", "customerid"]
  },
  codorderswithopenbalance: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  creditcardorderswithopenbalance: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  creditholds: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  creditlimitchangehistory: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  creditlimithistoryforcustomer: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  credittermspendingwithbalance: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_name"],
  idField: "customer_id"
  },
  customerpayments: {targetUrl: "/report/corporatepaymentdetailbylocation",queryParam: "payment_no",
  keyFields: ["check_amount", "check_amount"],
  idField: "payment_number"
  },
  customerswithonedollarcreditlimitandrecentactivity: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  ecnstatement: {targetUrl: "/report/invoicedetail",queryParam: "invoice_no",
  keyFields: ["invoice_no", "invoice_no"]
  },
  ecnstatementshipto: {targetUrl: "/report/invoicedetail",queryParam: "invoice_no",
  keyFields: ["invoice_no", "invoice_no"]
  },
  expiringcreditcards: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  // inactivecustomeragingall: {targetUrl: "/report/customerinfo",queryParam: "custId",
  // keyFields: ["customer_id", "customerid"]
  // },
  inactivecustomeragingall: [
    {
      targetUrl: "/report/customerinfo", // 1. ID par customerinfo khulega
      queryParam: "custId",
      keyFields: ["customer_id", "customerid"]
    },
    {
      targetUrl: "/report/ecnstatement",  // 2. Name par ecnstatement khulega
      queryParam: "custId",
      keyFields: ["customer_name"],
      idField: "customer_id" // URL mein ID bhejne ke liye
    }
  ],
  inactivecustomeragingrecent: [
    {
      targetUrl: "/report/customerinfo", // 1. ID par customerinfo khulega
      queryParam: "custId",
      keyFields: ["customer_id", "customerid"]
    },
    {
      targetUrl: "/report/ecnstatement",  // 2. Name par ecnstatement khulega
      queryParam: "custId",
      keyFields: ["customer_name"],
      idField: "customer_id" // URL mein ID bhejne ke liye
    },
    {
      targetUrl: "/report/collectioncallnotes",  // 2. Name par ecnstatement khulega
      queryParam: "custId",
      keyFields: ["notes"],
      idField: "customer_id" // URL mein ID bhejne ke liye
    }
  ],

  
  
  
};
export const FOOTER_TOTAL_CONFIG: Record<string, {totalColumns: string[]; labelColumn?: string;dbTotalKeys?: Record<string, string>; }> = {
  
  apsummary: {totalColumns: ["Balance"],labelColumn: "vendor_name" },

  apdetails: {totalColumns: ["Current", "Over30", "Over60","Over90","Total"], labelColumn: "po_no"},

  adssalesreport: {labelColumn: "customer_name",
    totalColumns: ["total_ship", "total_handling", "total_feed", "total_other", "total_merch", "total_cost", "grand_total","profit_percent"]
  },
  agingreportsummary: {labelColumn: "rep",
    totalColumns: ["Current", "30_to_60", "60_to_90", "Over_90", "Total_Due"]
  },
  itemwithpriceandcost: {labelColumn: "item_desc",
    totalColumns: ["price1", "cost"],
    dbTotalKeys: { price1: "price1_total", cost: "cost_total" }
  },
  agingwithytdsales: {labelColumn: "terms_desc",
    totalColumns: ["last_pmt_amount","ytd_sales","ly_sales","Current", "31_to_60", "61_to_90", "Over90", "Total_Due"]
  },
  closeoutsalesreport: {labelColumn: "sales_discount_group_id",
    totalColumns: ["qty","sales"]
  },
  closeoutsaleswithprofit: {labelColumn: "sales_discount_group_id",
    totalColumns: ["qty","sales","cost","gross_profit","profit_percent"]
  },
  custactivity: {labelColumn: "ship2_name",
  totalColumns: ["invoice_total"]
  },
  corporatepaymentdetailbylocation: {labelColumn: "customer_name",
  totalColumns: ["payment_amount"]
  },
  duebycutoff_cutoff: {labelColumn: "customer_name",
  totalColumns: ["balance_due"]
  },
  ecnbucks: {labelColumn: "supplier_name",
  totalColumns: ["total"]
  },
  ecnbuckscustomer: {labelColumn: "customer_name",
  totalColumns: ["total"]
  },
  ecnstatement: {labelColumn: "po_no",
  totalColumns: ["current","31_to_60","61_to_90","over_90","total"]
  },
  ecnstatementshipto: {labelColumn: "ship_to_name",
  totalColumns: ["current","31_to_60","61_to_90","over_90","total"]
  },
  inactivecustomeragingall: {labelColumn: "rep",
  totalColumns: ["120-150","151-180","Over_180","total"]
  },
  inactivecustomeragingrecent: {labelColumn: "rep",
  totalColumns: ["under_120","120-150","151-180","over_180","total"]
  },
  inactivecustomers: {labelColumn: "email_address",
  totalColumns: ["YTD_SALES","LY_SALES"]
  },
  inactivecustomerswithlocation: {labelColumn: "email_address",
  totalColumns: ["YTD_SALES","LY_SALES"]
  },
  inv_value: {labelColumn: "location_name",
  totalColumns: ["qty","value"]
  },
  inv_value_pg: {labelColumn: "product_group",
  totalColumns: ["qty","value"]
  },
  inventorylevelsandpricesforitemprefix: {labelColumn: "upc",
  totalColumns: ["MAC_Cost","standard_cost","price1","MSRP","MAP"]
  },


  
};
export const REPORT_COLUMN_MAP: Record<string, Column[]> = {
  APDetails: [
    { key: "invoice_date", label: "Invoice Date", type: "date", width: "158px" },
    { key: "invoice_no", label: "Invoice No", type: "integer", width: "200px" },
    { key: "po_no", label: "PO No", type: "text", width: "100px" },
    { key: "Current", label: "Current", type: "currency", width: "100px" },
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
    { key: "vendor_id", label: "Vendor ID", type: "integer" },
    { key: "vendor_name", label: "Vendor Name", type: "text" },
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
    { key: "qty_on_hand", label: "Qty On Hand",type:"number" },
    { key: "primary_bin", label: "Primary Bin",type:"number" },
    { key: "bin", label: "Bin" ,type:"text"}
  ],
  adssalesreport: [
    { key: "customer_id", label: "Customer Id", type: "number" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "total_ship", label: "Total Ship", type: "currency" },
    { key: "total_handling", label: "Total Handling", type: "currency" },
    { key: "total_feed", label: "Total Feed", type: "currency" },
    { key: "total_other", label: "Total Other", type: "currency" },
    { key: "total_merch", label: "Total Merch", type: "currency" },
    { key: "total_cost", label: "Total Cost", type: "currency" },
    { key: "grand_total", label: "Grand Total", type: "currency" },
    { key: "profit_percent", label: "Profit Percent", type: "percentage" },
  ],
  agingreportsummary: [
    { key: "customer_id", label: "Customer Id", type: "integer", width: "158px" },
    { key: "customer_name", label: "Customer Name", type: "text", width: "200px" },
    { key: "terms_desc", label: "Terms Description", type: "text", width: "100px" },
    { key: "rep", label: "Rep", type: "text", width: "100px" },
    { key: "Current", label: "Current", type: "currency", width: "100px" },
    { key: "30_to_60", label: "30 to 60", type: "currency", width: "100px" },
    { key: "60_to_90", label: "60 to 90", type: "currency" , width: "100px"},
    { key: "Over_90", label: "OVER 90", type: "currency" , width: "100px"},
    { key: "Total_Due", label: "Total Due", type: "currency", width: "100px" }
  ],
  "itemwithpriceandcost": [
    { key: "item_id", label: "Item Id", type: "text", width: "150px" },
    { key: "item_desc", label: "Item Description", type: "text", width: "300px" },
    { key: "price1", label: "Price", type: "currency", width: "120px" }, 
    { key: "cost", label: "Cost", type: "currency", width: "120px" }     
  ],
  "accountwithbouncestatus": [
    { key: "customer_id", label: "Customer Id", type: "integer", width: "150px" },
    { key: "customer_name", label: "Customer Name", type: "text", width: "300px" },
    { key: "credit_terms", label: "Credit Terms", type: "text", width: "300px" }, 
    { key: "credit_status", label: "Credit Status", type: "text", width: "200px" }     
  ],
  "accountwithholdterms": [
    { key: "customer_id", label: "Customer Id", type: "integer", width: "150px" },
    { key: "customer_name", label: "Customer Name", type: "text", width: "300px" },
    { key: "credit_terms", label: "Credit Terms", type: "text", width: "300px" }, 
    { key: "credit_status", label: "Credit Status", type: "text", width: "200px" }     
  ],
  accountwithnocreditlimit: [
    { key: "customer_id", label: "Customer Id", type: "integer", width: "158px" },
    { key: "customer_name", label: "Customer Name", type: "text", width: "200px" },
    { key: "credit_status", label: "Credit Status", type: "text", width: "100px" },
    { key: "current", label: "Current", type: "currency", width: "100px" },
    { key: "31-60", label: "30-60", type: "currency", width: "100px" },
    { key: "61-90", label: "61-90", type: "currency" , width: "100px"},
    { key: "Over90", label: "OVER 90", type: "currency" , width: "100px"},
    { key: "total_due", label: "Total Due", type: "currency", width: "100px" }
  ],
  ads_allocation: [
    { key: "location_name", label: "Location Name", type: "text", width: "100px" },
    { key: "order_no", label: "Order No.", type: "integer", width: "60px" },
    { key: "customer_id", label: "Customer Id", type: "integer", width: "70px" },
    { key: "ship2_name", label: "Name", type: "text", width: "150px" },
    { key: "item_id", label: "Item Id", type: "text", width: "100px" },
    { key: "item_desc", label: "Item Description", type: "text", width: "120px" },
    { key: "qty_ordered", label: "Qty Ordered", type: "integer", width: "80px" },
    { key: "qty_backordered", label: "Qty Backorderd", type: "integer", width: "80px" },
    { key: "qty_available", label: "Qt Avaiable", type: "text", width: "80px" },
    { key: "Fillable", label: "Fillable", type: "text", width: "100px" }
  ],
  adsdailytotalshipped: [
    { key: "location_id", label: "Location Id",type:"integer" },
    { key: "location_name", label: "Location Name",type:"text" },
    { key: "qty_shipped", label: "Qty Shipped",type:"large_integer" },
    { key: "total_amount", label: "Total Amount",type:"currency" }
  ],
  agingwithytdsales: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "terms_desc", label: "Terms Description", type: "text" },
    { key: "last_pmt", label: "Last Pmt", type: "date" },
    { key: "last_pmt_amount", label: "Last Pmt Amt", type: "currency" },
    { key: "ytd_sales", label: "YTD Sales", type: "currency" },
    { key: "ly_sales", label: "LY Sales", type: "currency" },
    { key: "Current", label: "Current", type: "currency" },
    { key: "31_to_60", label: "30 to 60", type: "currency" },
    { key: "61_to_90", label: "60 to 90", type: "currency" },
    { key: "Over90", label: "OVER 90", type: "currency" },
    { key: "Total_Due", label: "Total Due", type: "currency" }
  ],
  amazontransferopen: [
    { key: "transfer_no", label: "Transfer No", type: "integer" },
    { key: "from_location_id", label: "From Location Id", type: "integer" },
    { key: "to_location_id", label: "To Location Id", type: "integer" },
    { key: "delete_flag", label: "Delete Flag", type: "text" },
    { key: "complete_flag", label: "Complete Flag", type: "text" },
    { key: "printed_date", label: "Printed Date", type: "date" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "qty_to_transfer", label: "Qty To Transfer", type: "integer" },
    { key: "qty_transferred", label: "Qty Transferred", type: "integer" },
    { key: "qty_received", label: "Qty Received", type: "integer" }
  ],
  backordersfordiscallitems: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship2 Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_on_pick_tickets", label: "Qty On Pick Tickets", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "large_integer" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "date_created", label: "Date Created", type: "date" }
  ],
  backordersfordiscitems: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship2 Name", type: "text" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_on_pick_tickets", label: "Qty On Pick Tickets", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "large_integer" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" }
  ],
  backordersforitem: [
    { key: "salesrep_id", label: "Rep Id", type: "integer" },
    { key: "ship2_id", label: "Ship2 Id", type: "integer" },
    { key: "ship2_name", label: "Ship2 Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "source_loc_id", label: "Source Loc Id", type: "integer" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_on_pick_tickets", label: "Qty On Pick Tickets", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "large_integer" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" },
  ],
  backtostockorder: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" } 
  ],
  badinvoicedatereport: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "created_by", label: "Item Desc", type: "text" },
  ],
  binloc_supplier: [
    { key: "item_id", label: "Iten Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "primary_bin", label: "Primary Bin", type: "text" }
  ],
  BinstobeZeroed: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_backordered", label: "Qty Backordered", type: "large_integer" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "stockable", label: "Stockable", type: "text" },
    { key: "sellable", label: "Sellable", type: "text" },
    { key: "buy", label: "Buy", type: "text" },
    { key: "suppress", label: "Suppress", type: "text" }
  ],
  canceled_items_for_order: [
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_canceled", label: "Qty Canceled", type: "large_integer" },
    { key: "upc", label: "Upc", type: "text" }
  ],
  casecountsforvendor: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "upc", label: "Upc", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "unit_of_measure", label: "Unit Of Measure", type: "text" },
    { key: "unit_description", label: "Unit Description", type: "text" },
    { key: "unit_size", label: "Unit Size", type: "large_integer" }    
  ],
  checkregisterexport: [
    { key: "bank_no", label: "Bank No", type: "integer" },
    { key: "check_no", label: "Check No", type: "text" },
    { key: "check_date", label: "Check Date", type: "date" },
    { key: "vendor_id", label: "Vendor Id", type: "integer" },
    { key: "vendor_name", label: "Vendor Name", type: "text" },
    { key: "check_amount", label: "Check Amount", type: "currency" }    
  ],
  closeoutinventory: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_available", label: "Qty Available", type: "large_integer" },
    { key: "price1", label: "Price", type: "currency" } ,
    { key: "price8", label: "Price", type: "currency" } ,
    { key: "sales_discount_group", label: "Sales Discount Group", type: "text" },
    { key: "upc", label: "Upc", type: "text" }
  ],
  closeoutsalesreport: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "sales_discount_group_id", label: "Sales Discount Group Id", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "sales", label: "Sales", type: "currency" }
  ],
  closeoutsaleswithprofit: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "sales_discount_group_id", label: "Sales Discount Group Id", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "sales", label: "Sales", type: "currency" },
    { key: "cost", label: "Cost", type: "currency" },
    { key: "gross_profit", label: "Gross Profit", type: "currency" },
    { key: "profit_percent", label: "Profit Percent", type: "percentage" }
  ],
  closeoutswithnoinventory: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "suppress_from_web", label: "Suppress From Web", type: "text" }
  ],
  codorderswithopenbalance: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "terms_desc", label: "Terms", type: "text" },
    { key: "invoice_date", label: "Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "service", label: "Service", type: "text" },
    { key: "tracking_no", label: "Tracking No", type: "text" },
    { key: "freight_out", label: "Freight Out", type: "currency" },
    { key: "amount", label: "Amount", type: "currency" }
  ],
  collectioncallnotes: [
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "notes", label: "Item Notes", type: "text" }
  ],
  createopenrma: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "datetime" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Name", type: "text" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "rep", label: "Rep", type: "text" }
  ],
  creditamountrma: [
    { key: "rma_no", label: "Location Id", type: "integer" },
    { key: "RMA_date", label: "RMA Date", type: "date" },
    { key: "credit_no", label: "Credit No", type: "integer" },
    { key: "credit_date", label: "Credit Date", type: "date" },
    { key: "amount", label: "Amount", type: "currency" }
  ],
  creditcardorderswithopenbalance: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "terms_desc", label: "Terms", type: "text" },
    { key: "invoice_date", label: "Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "service", label: "Service", type: "text" },
    { key: "tracking_no", label: "Tracking No", type: "text" },
    { key: "freight_out", label: "Freight Out", type: "currency" },
    { key: "amount", label: "Amount", type: "currency" }
  ],
  creditholds: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "name/rep", label: "Name/Rep", type: "text" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "Terms/Status", label: "Terms/Status", type: "text" },
    { key: "order_total", label: "Order Total", type: "currency" },
    { key: "Time_In_Q", label: "Time In Q", type: "large_integer" },
    { key: "credit_limit", label: "Credit Limit", type: "currency" },
    { key: "current", label: "Current", type: "currency" },
    { key: "31-60", label: "31-60", type: "currency" },
    { key: "61-90", label: "61-90", type: "currency" },
    { key: "Over_90", label: "Over 90", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  creditlimitchangehistory: [
    { key: "column_changed", label: "Column Changed", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "customer_date", label: "Customer Date", type: "date" },
    { key: "old_limit", label: "Old Limit", type: "large_integer" },
    { key: "new_limit", label: "New Limit", type: "large_integer" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "description", label: "Description", type: "text" }
  ],
  creditlimithistoryforcustomer: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "old_value", label: "Old Value", type: "currency" },
    { key: "new_value", label: "New Value", type: "currency" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "created_by", label: "Created By", type: "text" }
  ],
  creditsissued: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "po_no", label: "PO No", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "extended_price", label: "Extended Price", type: "currency" },
    { key: "freight", label: "Freight", type: "large_integer" },
    { key: "total_amount", label: "Total Amount", type: "currency" }
  ],
  credittermspendingwithbalance: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "current", label: "Current", type: "currency" },
    { key: "31-60", label: "31-60", type: "currency" },
    { key: "61-90", label: "61-90", type: "currency" },
    { key: "Over_90", label: "Over 90", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  custactivity: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "datetime" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_total", label: "Invoice Total", type: "currency" }
  ],
  customerlookupbyemailaddress: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "phys_city", label: "Phys City", type: "text" },
    { key: "phys_state", label: "Phys State", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "email_address", label: "Email Address", type: "text" }
  ],
  customerpayments: [
    { key: "date_received", label: "Date Received", type: "date" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "check_number", label: "Check#", type: "text" },
    { key: "check_amount", label: "Check Amount", type: "currency" }
  ],
  corporatepaymentdetailbylocation: [
    { key: "remitter_id", label: "Remitter Id", type: "integer" },
    { key: "date_received", label: "Date Received", type: "date" },
    { key: "check_number", label: "Check#", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "age", label: "Age", type: "integer" },
    { key: "payment_amount", label: "Amount Paid", type: "currency" }
  ],
  customerpricingchanges: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "text" },
    { key: "last_date_modified", label: "Last Date Modified", type: "date" },
    { key: "last_maintained_by", label: "Last Maintained By", type: "text" },
    { key: "customer_build_date", label: "Customer Build Date", type: "date" },
  ],
  customerswithonedollarcreditlimit: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "credit_status", label: "Credit Status", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "current", label: "Current", type: "currency" },
    { key: "31-60", label: "31-60", type: "currency" },
    { key: "61-90", label: "61-90", type: "currency" },
    { key: "Over_90", label: "Over 90", type: "currency" },
    { key: "total_due", label: "Total Due", type: "currency" }
  ],
  customerswithonedollarcreditlimitandrecentactivity: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "credit_status", label: "Credit Status", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "last_sale", label: "Last Sale", type: "date" }
  ],
  diffprice1tocostusage: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "usage", label: "Usage", type: "integer" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "standard_cost", label: "Standard Cost", type: "currency" },
    { key: "price_cost_diff", label: "Diff", type: "currency" }
  ],
  discontinuedbylocation: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "discontinued", label: "Discontinued", type: "text" }
  ],
  dropstock_loc: [
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "order_quantity", label: "Order Quantity", type: "large_integer" },
  ],
  duebycutoff_cutoff: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "datetime" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "total_amount", label: "Total Amount", type: "currency" },
    { key: "amount_paid", label: "Amount Paid", type: "currency" },
    { key: "balance_due", label: "Balance Due", type: "currency" },
  ],
  ecnbucks: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "total", label: "Total", type: "currency" },
  ],
  ecnbuckscustomer: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "total", label: "Total", type: "currency" },
  ],
  ecnstatement: [
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "tracking_no", label: "Tracking No", type: "text" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "current", label: "Current", type: "currency" },
    { key: "31_to_60", label: "31 To 60", type: "currency" },
    { key: "61_to_90", label: "61 To 90", type: "currency" },
    { key: "over_90", label: "Over 90", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  ecnstatementshipto: [
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "tracking_no", label: "Tracking No", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "text" },
    { key: "ship_to_name", label: "Ship To Name", type: "text" },
    { key: "current", label: "Current", type: "currency" },
    { key: "31_to_60", label: "31 To 60", type: "currency" },
    { key: "61_to_90", label: "61 To 90", type: "currency" },
    { key: "over_90", label: "Over 90", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  executivemonthlysalessummary: [
    { key: "year", label: "Year", type: "text" },
    { key: "customer_type", label: "Customer Type", type: "text" },
    { key: "Jan", label: "Jan", type: "currency" },
    { key: "Feb", label: "Feb", type: "currency" },
    { key: "Mar", label: "Mar", type: "currency" },
    { key: "Apr", label: "Apr", type: "currency" },
    { key: "May", label: "May", type: "currency" },
    { key: "Jun", label: "Jun", type: "currency" },
    { key: "Jul", label: "Jul", type: "currency" },
    { key: "Aug", label: "Aug", type: "currency" },
    { key: "Sep", label: "Sep", type: "currency" },
    { key: "Oct", label: "Oct", type: "currency" },
    { key: "Nov", label: "Nov", type: "currency" },
    { key: "Dec", label: "Dec", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  executivevendorsummary: [
    { key: "supplier_id", label: "Supplier Id", type: "text" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "NJ_Sales", label: "NJ Sales", type: "currency" },
    { key: "NJ_Inv_value", label: "NJ Inv Value", type: "currency" },
    { key: "NJ_Open_Po", label: "NJ Open Po", type: "currency" },
    { key: "FL_Sales", label: "FL Sales", type: "currency" },
    { key: "FL_Inv_value", label: "FL Inv Value", type: "currency" },
    { key: "FL_Open_Po", label: "FL Open Po", type: "currency" },
    { key: "CA_Sales", label: "CA Sales", type: "currency" },
    { key: "CA_Inv_value", label: "CA Inv Value", type: "currency" },
    { key: "CA_Open_Po", label: "CA Open Po", type: "currency" },
    { key: "Total_Sales", label: "Total Sales", type: "currency" },
    { key: "Total_Inv_value", label: "Total Inv Value", type: "currency" },
    { key: "Total_Open_Po", label: "Total Open Po", type: "currency" }
  ],
  expiringcreditcards: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "last_sale_date", label: "Last Sale Date", type: "date" },
    { key: "card_ending", label: "Card Ending", type: "integer" },
    { key: "payment_type", label: "Type", type: "text" },
    { key: "card_name", label: "Card Name", type: "text" },
    { key: "expiration_date", label: "Expiration Date", type: "date" },
    { key: "rep", label: "Rep", type: "text" }
  ],
  galleyordersapp: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "external_po_no", label: "External Po no", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "supplier_part_no", label: "Supplier Part No", type: "text" },
    { key: "item_description", label: "Item Description", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "integer" },
    { key: "UOM", label: "UOM", type: "text" },
  ],
  groupcodeexport: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "group_code", label: "Group Code", type: "text" },
    { key: "group_name", label: "Group Name", type: "text" }
  ],
  inactivecustomeragingall: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "days_inactive", label: "Days Inactive", type: "large_integer" },
    { key: "120-150", label: "120-150", type: "currency" },
    { key: "151-180", label: "151-180", type: "currency" },
    { key: "Over_180", label: "Over 180", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  inactivecustomeragingrecent: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "days_inactive", label: "Days Inactive", type: "large_integer" },
    { key: "under_120", label: "Under 120", type: "currency" },
    { key: "120-150", label: "120-150", type: "currency" },
    { key: "151-180", label: "151-180", type: "currency" },
    { key: "over_180", label: "Over 180", type: "currency" },
    { key: "total", label: "Total", type: "currency" },
    { key: "notes", label: "Notes", type: "text" }
  ],
  inactivecustomers: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "email_address", label: "Email Address", type: "text" },
    { key: "Last_SI", label: "Last SI", type: "date" },
    { key: "Last_Sl_Days", label: "Last SI Days", type: "large_integer" },
    { key: "YTD_SALES", label: "YTD Sales", type: "currency" },
    { key: "LY_SALES", label: "LY Sales", type: "currency" },
    { key: "rep", label: "Rep", type: "text" },
  ],
  inactivecustomerswithlocation: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "Last_SI", label: "Last SI", type: "date" },
    { key: "Last_Sl_Days", label: "Last SI Days", type: "large_integer" },
    { key: "YTD_SALES", label: "YTD Sales", type: "currency" },
    { key: "LY_SALES", label: "Ly Sales", type: "currency" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "city", label: "City", type: "text" },
    { key: "state", label: "State", type: "text" },
  ],
  inv_value: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "value", label: "Value", type: "currency" }
  ],
  inv_value_pg: [
    { key: "product_group", label: "Product Group", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "value", label: "Value", type: "currency" }
  ],
  invalidmsds: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "division_id", label: "Division Id", type: "integer" },
    { key: "date_created", label: "Date Created", type: "datetime" },
    { key: "msds", label: "MSDS", type: "text" },
  ],
  inventory_adjustments: [
    { key: "adjustment_number", label: "Adjustment Number", type: "integer" },
    { key: "date_created", label: "Date Created", type: "datetime" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "unit_qty", label: "Unit Qty", type: "integer" },
    { key: "last_maintained", label: "Last Maintained", type: "text" },
    { key: "reason", label: "Reason", type: "text" }
  ],
  inventorylevelsandpricesforitemprefix: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "upc", label: "UPC", type: "text" },
    { key: "qty_available", label: "Qty Available", type: "large_integer" },
    { key: "MAC_Cost", label: "MAC Cost", type: "currency" },
    { key: "standard_cost", label: "Standard Cost", type: "currency" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "MSRP", label: "MSRP", type: "currency" },
    { key: "MAP", label: "MAP", type: "currency" }
  ],
  inventorylocationsupplier: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "supplier_part_no", label: "Supplier Part No", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "cost", label: "Cost", type: "currency" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "class_id4", label: "class_id4", type: "text" },
    { key: "upc", label: "UPC", type: "text" }
  ],
  inventoryvaluelocations: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "total_qty", label: "Total Qty", type: "large_integer" },
    { key: "inventory_value", label: "Inventory Value", type: "currency" }
  ],

  
};