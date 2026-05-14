//config/reportColumns.ts
import { Column } from "../lib/supabase";

export const DRILL_DOWN_LINKS: Record<string, { targetUrl: string; queryParam: string; keyFields: string[]; idField?: string; }> = {
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
    { key: "invoice_date", label: "Invoice date", type: "datetime" },
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
  


  
};