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
  invicedsalesbycustomerlytdbyshipto: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  missingemailaddressforcustomer: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  recentshipments: {targetUrl: "/report/customerinfo",queryParam: "custId",
  keyFields: ["customer_id", "customerid"]
  },
  salehistoryrepcomparision: {targetUrl: "/report/saleshistory_for_rep_by_customer",queryParam: "repId",
  keyFields: ["salesrep_id", "salesrepid","rep_id","repid"]
  },
  paymentinquirybyamount: {
    targetUrl: "/report/paymentdetail",
    queryParam: "check_number", // URL ka main query param
    keyFields: ["check", "check_number"],
    idField: "check_number",
    extraParams: {
        customerid: "customer_id",
    }
},
  inactivecustomeragingall: [
    {
      targetUrl: "/report/customerinfo", 
      queryParam: "custId",
      keyFields: ["customer_id", "customerid"]
    },
    {
      targetUrl: "/report/ecnstatement", 
      queryParam: "custId",
      keyFields: ["customer_name"],
      idField: "customer_id" 
    }
  ],
  inactivecustomeragingrecent: [
    {
      targetUrl: "/report/customerinfo", 
      queryParam: "custId",
      keyFields: ["customer_id", "customerid"]
    },
    {
      targetUrl: "/report/ecnstatement",  
      queryParam: "custId",
      keyFields: ["customer_name"],
      idField: "customer_id" 
    },
    {
      targetUrl: "/report/collectioncallnotes",  
      queryParam: "custId",
      keyFields: ["notes"],
      idField: "customer_id"
    }
  ],
  pastdueaccountreportbyrep: [
    {
      targetUrl: "/report/customerinfo", 
      queryParam: "custId",
      keyFields: ["customer_id", "customerid"]
    },
    {
      targetUrl: "/report/ecnstatement",  
      queryParam: "custId",
      keyFields: ["name"],
      idField: "customer_id" 
    },
    {
      targetUrl: "/report/collectioncallnotes",  
      queryParam: "custId",
      keyFields: ["notes"],
      idField: "customer_id" 
    }
  ],

  
  
  
};
export const FOOTER_TOTAL_CONFIG: Record<string, {totalColumns: string[]; labelColumn?: string;dbTotalKeys?: Record<string, string>; enabled: boolean; }> = {
  
  apsummary: {enabled: false,totalColumns: ["Balance"],labelColumn: "vendor_name" },

  apdetails: {enabled: false,totalColumns: ["Current", "Over30", "Over60","Over90","Total"], labelColumn: "po_no"},

  adssalesreport: { enabled: false,labelColumn: "customer_name",
    totalColumns: ["total_ship", "total_handling", "total_feed", "total_other", "total_merch", "total_cost", "grand_total","profit_percent"]
  },
  agingreportsummary: {enabled: false,labelColumn: "rep",
    totalColumns: ["Current", "30_to_60", "60_to_90", "Over_90", "Total_Due"]
  },
  itemwithpriceandcost: {enabled: true,labelColumn: "item_desc",
    totalColumns: ["price1", "cost"],
  },
  agingwithytdsales: {enabled: false,labelColumn: "terms_desc",
    totalColumns: ["last_pmt_amount","ytd_sales","ly_sales","Current", "31_to_60", "61_to_90", "Over90", "Total_Due"]
  },
  closeoutsalesreport: {enabled: false,labelColumn: "sales_discount_group_id",
    totalColumns: ["qty","sales"]
  },
  closeoutsaleswithprofit: {enabled: false,labelColumn: "sales_discount_group_id",
    totalColumns: ["qty","sales","cost","gross_profit","profit_percent"]
  },
  custactivity: {enabled: false,labelColumn: "ship2_name",
  totalColumns: ["invoice_total"]
  },
  corporatepaymentdetailbylocation: {enabled: false,labelColumn: "customer_name",
  totalColumns: ["payment_amount"]
  },
  duebycutoff_cutoff: {enabled: false,labelColumn: "customer_name",
  totalColumns: ["balance_due"]
  },
  ecnbucks: {enabled: false,labelColumn: "supplier_name",
  totalColumns: ["total"]
  },
  ecnbuckscustomer: {enabled: false,labelColumn: "customer_name",
  totalColumns: ["total"]
  },
  ecnstatement: {enabled: false,labelColumn: "po_no",
  totalColumns: ["current","31_to_60","61_to_90","over_90","total"]
  },
  ecnstatementshipto: {enabled: false,labelColumn: "ship_to_name",
  totalColumns: ["current","31_to_60","61_to_90","over_90","total"]
  },
  inactivecustomeragingall: {enabled: false,labelColumn: "rep",
  totalColumns: ["120-150","151-180","Over_180","total"]
  },
  inactivecustomeragingrecent: {enabled: false,labelColumn: "rep",
  totalColumns: ["under_120","120-150","151-180","over_180","total"]
  },
  inactivecustomers: {enabled: false,labelColumn: "email_address",
  totalColumns: ["YTD_SALES","LY_SALES"]
  },
  inactivecustomerswithlocation: {enabled: false,labelColumn: "email_address",
  totalColumns: ["YTD_SALES","LY_SALES"]
  },
  inv_value: {enabled: false,labelColumn: "location_name",
  totalColumns: ["qty","value"]
  },
  inv_value_pg: {enabled: false,labelColumn: "product_group",
  totalColumns: ["qty","value"]
  },
  inventorylevelsandpricesforitemprefix: {enabled: false,labelColumn: "upc",
  totalColumns: ["MAC_Cost","standard_cost","price1","MSRP","MAP"]
  },
  invoicedsalescustomertotals: {enabled: false,labelColumn: "rep",
  totalColumns: ["sales"]
  },
  invoicedsalescustomertotalswithfreightbreakdown: {enabled: false,labelColumn: "bill2_name",
  totalColumns: ["product_sales","freight","total"]
  },
  invoicedsalesreptotals: {enabled: false,labelColumn: "rep",
  totalColumns: ["sales"]
  },
  invoicedsalessuppliertotals: {enabled: false,labelColumn: "supplier_name",
  totalColumns: ["sales"]
  },
  invoicedsalessuppliertotalswithprofit: {enabled: false,labelColumn: "supplier_name",
  totalColumns: ["sales","cost","gross_profit","profit_percent"]
  },
  invoicesummaryforcustomer: {enabled: false,labelColumn: "customer_name",
  totalColumns: ["Sales","freight","total_amount"]
  },
  itemreturnsforcustomer: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["return_amt"]
  },
  lowprofitreport: {enabled: true,labelColumn: "rep",
  totalColumns: ["sales_amount","shipping_cost","gross_profit","profit_percent"]
  },
  manualpricechanges: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["price1","sold_price","cust_price","over_price","sales_cost"]
  },
  nochargeitemtotalsforsupplier: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["qty"]
  },
  nochargesalesbysupplier: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["price1","qty","sales"]
  },
  order_values: {enabled: false,labelColumn: "delete_flag",
  totalColumns: ["Amt_Filled","Amt_Canceled","Amt_backordered"]
  },
  order_weights: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["total_weight(Lb)","total_weight(Kg)"]
  },
  pastdueaccountreportbyrep: {enabled: false,labelColumn: "rep",
  totalColumns: ["Total_Balance","Total_Current","Total_31-60","Total_61-90","Total_Over_90"]
  },
  paymentdetail: {enabled: false,labelColumn: "check_number",
  totalColumns: ["Amount"]
  },
  pickticketoverviewexecutive: {enabled: false,labelColumn: "location_name",
  totalColumns: ["Pick_Count","open_value","avg_amount"]
  },
  purchaseoverdtrngbysupplier: {enabled: false,labelColumn: "supplier_name",
  totalColumns: ["purchases"]
  },
  purchasesummary: {enabled: false,labelColumn: "location_name",
  totalColumns: ["value"]
  },
  putaway: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["qty_received"]
  },
  returnsinvbyloc: {enabled: false,labelColumn: "item_desc",
  totalColumns: ["qty_on_hand","total"]
  },
  returnsinvbylocsummary: {enabled: false,labelColumn: "supplier_name",
  totalColumns: ["total_value"]
  },
  salehistoryrepcomparision: {enabled: false,labelColumn: "Rep",
  totalColumns: ["qty_current","sales_current","qty_prior","sales_prior"]
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
    { key: "supplier_id", label: "Supplier Id", type: "text", width: "82px" },
    { key: "supplier_name", label: "Supplier Name", type: "text", width: "120px" },
    { key: "customer_id", label: "Customer Id", type: "text", width: "90px" },
    { key: "customer_name", label: "Customer Name", type: "text", width: "120px" },
    { key: "rep", label: "Rep", type: "text", width: "100px" },
    { key: "mon1", label: "Month 1", type: "number", width: "50px" },
    { key: "mon2", label: "Month 2", type: "number", width: "50px" },
    { key: "mon3", label: "Month 3", type: "number", width: "50px" },
    { key: "mon4", label: "Month 4", type: "number", width: "50px" },
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
  discitemswithbinqtyflags: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_back_ordered", label: "Qty Back Ordered", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "stockable", label: "Stockable", type: "text" },
    { key: "sellable", label: "Sellable", type: "text" },
    { key: "buy", label: "Buy", type: "text" },
    { key: "order_quantity", label: "Order Quantity", type: "large_integer" },
    { key: "discontinued", label: "Discontinued", type: "text" },
    { key: "suppress_from", label: "Suppress From", type: "text" }
  ],
  invicedsalesbycustomerlytdbyshipto: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship_to_name", label: "Ship To Name", type: "text" },
    { key: "Salesrep", label: "Salesrep", type: "text" },
    { key: "lytd", label: "LYTD", type: "currency" },
    { key: "ytd", label: "YTD", type: "currency" },
    { key: "Change", label: "Change", type: "currency" },
    { key: "percent", label: "percent", type: "percentage" },
    { key: "ly", label: "LY", type: "currency" },
    { key: "first_si", label: "First SI", type: "date" },
    { key: "last_si", label: "Last SI", type: "date" },
    { key: "last_si_day", label: "Last SI day", type: "integer" }
  ],
  invoicedsalescustomertotals: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "sales", label: "Sales", type: "currency" }
  ],
  invoicedsalescustomertotalswithfreightbreakdown: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "product_sales", label: "Product Sales", type: "currency" },
    { key: "freight", label: "Freight", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  invoicedsalesreptotals: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "sales", label: "Sales", type: "currency" }
  ],
  invoicedsalessuppliertotals: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "sales", label: "Sales", type: "currency" }
  ],
  invoicedsalessuppliertotalswithprofit: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "sales", label: "Sales", type: "currency" },
    { key: "cost", label: "Cost", type: "currency" },
    { key: "gross_profit", label: "Gross Profit", type: "currency" },
    { key: "profit_percent", label: "Profit Percent", type: "percentage" }
  ],
  invoicefreightcharges: [
    { key: "location_name", label: "Customer Name", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_state", label: "Ship To State", type: "text" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "product_amt", label: "Product Amt", type: "currency" },
    { key: "freight", label: "Freight", type: "currency" },
    { key: "total", label: "Total", type: "currency" },
    { key: "carrier_name", label: "Carrier Name", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "rep", label: "Last SI day", type: "integer" }
  ],
  invoicesummaryforcustomer: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "Sales", label: "Sales", type: "currency" },
    { key: "freight", label: "Freight", type: "currency" },
    { key: "total_amount", label: "Total Amount", type: "currency" }
  ],
  invoicesunderspecifiedamount: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "bill2_name", label: "Bill To Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "total_amount", label: "Total Amount", type: "currency" },
    { key: "freight", label: "Freight", type: "currency" }
  ],
  invoiceswithnochargeitems: [
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship2 Name", type: "text" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "total_amount", label: "Total Amount", type: "currency" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "qty_shipped", label: "Qty Shipped", type: "large_integer" },
    { key: "created_by", label: "Created By", type: "text" }
  ],
  itemreturnsforcustomer: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "return_amt", label: "Return Amt", type: "currency" }
  ],
  itemsreleasedoverdaterange: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "Release_Date", label: "Release Date", type: "date" }
  ],
  itemstochangereleasedate: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "NJ_QTY", label: "NJ QTY", type: "large_integer" },
    { key: "FL_Qty", label: "FL Qty", type: "large_integer" },
    { key: "CA_Qty", label: "CA Qty", type: "large_integer" },
    { key: "total_qty", label: "Total Qty", type: "large_integer" },
    { key: "msds", label: "MSDS", type: "text" },
    { key: "release_date", label: "Release Date", type: "date" },
    { key: "price9", label: "Price9", type: "currency" },
    { key: "upc", label: "UPC", type: "text" },
    { key: "price1", label: "Price1", type: "currency" }
  ],
  ivdnewreleasereport: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "Release_Date", label: "Release Date", type: "date" }
  ],
  ivdrestocku: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "msds", label: "MSDS", type: "text" },
    { key: "qty_ordered", label: "QTY Ordered", type: "large_integer" },
    { key: "qty_received", label: "Qty Received", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_in_transit", label: "Qty In Transit", type: "large_integer" },
    { key: "order_quantity", label: "Order Quantity", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "qty_backordered", label: "Qty Backordered", type: "large_integer" },
    { key: "po_no", label: "Po no", type: "text" },
    { key: "buyer_id", label: "Buyer Id", type: "integer" }
  ],
  ivnmgmt_productdates: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "msds", label: "MSDS", type: "text" },
    { key: "release_date", label: "Release Date", type: "date" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "buyable", label: "Buyable", type: "text" },
    { key: "stockable", label: "Stockable", type: "text" },
    { key: "last_purchase_date", label: "Last Purchase Date", type: "date" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "NJ_QTY", label: "NJ Qty", type: "large_integer" },
    { key: "FL_Qty", label: "FL Qty", type: "large_integer" },
    { key: "CA_Qty", label: "CA Qty", type: "large_integer" }
  ],
  leadtimereport: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "lead_time", label: "Lead Time", type: "integer" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "division_id", label: "Division Id", type: "integer" },
    { key: "division_name", label: "Division Name", type: "text" }
  ],
  linecounts: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "pieces_shipped", label: "Pieces Shipped", type: "large_integer" },
    { key: "sales", label: "Sales", type: "currency" }
  ],
  location_inventory: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_available", label: "Qty Available", type: "large_integer" },
    { key: "price", label: "Price", type: "currency" },
    { key: "upc", label: "UPC", type: "text" }
  ],
  loggedinusers: [
    { key: "login_name", label: "Login Name", type: "text" },
    { key: "nt_username", label: "NT Username", type: "text" },
    { key: "database_name", label: "Database Name", type: "text" },
    { key: "dbid", label: "DBID", type: "integer" },
    { key: "current_date", label: "Current Date", type: "datetime" },
    { key: "date_logged_in", label: "Date Logged In", type: "datetime" },
    { key: "client_net_address", label: "Client Net Address", type: "text" },
    { key: "host_name", label: "Host Name", type: "text" }
  ],
  lowprofitreport: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "sales_amount", label: "Sales Amount", type: "currency" },
    { key: "shipping_cost", label: "Shipping Cost", type: "currency" },
    { key: "gross_profit", label: "Gross Profit", type: "currency" },
    { key: "profit_percent", label: "Profit Percent", type: "percentage" }
  ],
  manualfreightchangesonorders: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "address_id", label: "Address Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "DEFAULT_CARRIER", label: "Default Carrier", type: "text" },
    { key: "CARRIER_USED", label: "Carrier Used", type: "text" },
    { key: "changed_by", label: "Changed By", type: "text" },
    { key: "date_changed", label: "Date Changed", type: "date" }
  ],
  manualpricechanges: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "quote", label: "Quote", type: "text" },
    { key: "po_no", label: "Po NO", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "sold_price", label: "Sold Price", type: "currency" },
    { key: "cust_price", label: "Cust Price", type: "currency" },
    { key: "over_price", label: "Over Price", type: "currency" },
    { key: "sales_cost", label: "Sales Cost", type: "currency" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "Audti_created_by", label: "Audti Created By", type: "text" },
  ],
  mismatchedcredittermsreport: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "bill_to_terms", label: "Bill To Terms", type: "text" },
    { key: "ship2_terms", label: "Ship To Terms ", type: "text" }
  ],
  missingemailaddressforcustomer: [
    { key: "customer_id", label: "Customerr Id", type: "integer" },
    { key: "customer_name", label: "Customerr Name", type: "text" },
    { key: "credit_limit", label: "Credit Limit ", type: "currency" },
    { key: "credit_status", label: "Credit Status ", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "last_si", label: "Last SI", type: "date" },
    { key: "invoice_uid", label: "Invoice Uid", type: "large_integer" },
    { key: "invoice_method", label: "Invoice Method", type: "text" },
    { key: "statement_uid", label: "Statement Uid", type: "large_integer" },
    { key: "statement_method", label: "Statement Method", type: "text" },
    { key: "email_address", label: "Email Address", type: "text" },
    { key: "created_by", label: "Created By", type: "text" }
  ],
  missingparkercode: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "parker_product", label: "Parker Product", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "release_date", label: "Release Date", type: "date" }
  ],
  mixeslastsalelastreceiveddate: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "qty", label: "Qty", type: "text" },
    { key: "last_sale_date", label: "Last Sales Date", type: "date" },
    { key: "last_received_date", label: "Last Received Date", type: "date" }
  ],
  monthovermonthsalesforcustomer: [
    { key: "year", label: "Year", type: "integer" },
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
    { key: "TOTAL", label: "Total", type: "currency" }
  ],
  multiplelogins: [
    { key: "login_name", label: "Login Name", type: "text" },
    { key: "nt_username", label: "NT Username", type: "text" },
    { key: "database_name", label: "Database Name", type: "text" },
    { key: "dbid", label: "Dbid", type: "number" },
    { key: "host_name", label: "Host Name", type: "text" }
  ],
  newlybuiltitemsreport: [
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "release_date", label: "Release Date", type: "datetime" },
    { key: "date_created", label: "Date Created", type: "datetime" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "last_maintained_by", label: "Last Maintained By", type: "text" }
  ],
  njmixeswithcost: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "last_rec_po", label: "Last Rec Po", type: "large_integer" }
  ],
  nochargeitemtotalsforsupplier: [
    { key: "supplier_id", label: "Supplier Id", type: "text" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" }
  ],
  nochargesalesbysupplier: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price", type: "currency" },
    { key: "tester", label: "Tester", type: "text" },
    { key: "qty", label: "Qty", type: "large_integer" },
    { key: "sales", label: "sales", type: "currency" }
  ],
  nondefaultsourcelocationforitem: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "taker", label: "Taker", type: "text" },
    { key: "job_name", label: "Job Name", type: "text" },
    { key: "po_no", label: "Po NO", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Bill To Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "state", label: "State", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_requested", label: "Qty Requested", type: "large_integer" },
    { key: "qty_shipped", label: "Qty Shipped", type: "large_integer" },
    { key: "price", label: "Price", type: "currency" },
    { key: "extended_price", label: "Extended Price", type: "currency" },
    { key: "Def_Loc", label: "Def Loc", type: "text" },
    { key: "Used_loc", label: "Used Loc", type: "text" },
    { key: "nj", label: "NJ", type: "large_integer" },
    { key: "fl", label: "FL", type: "large_integer" },
    { key: "ca", label: "CA", type: "large_integer" }
  ],
  nondefaultsourcelocationinvoicelinedetail: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "taker", label: "Taker", type: "text" },
    { key: "job_name", label: "Job Name", type: "text" },
    { key: "po_no", label: "Po NO", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Bill To Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "state", label: "State", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_requested", label: "Qty Requested", type: "large_integer" },
    { key: "qty_shipped", label: "Qty Shipped", type: "large_integer" },
    { key: "price", label: "Price", type: "currency" },
    { key: "extended_price", label: "Extended Price", type: "currency" },
    { key: "Def_Loc", label: "Def Loc", type: "text" },
    { key: "Used_loc", label: "Used Loc", type: "text" },
    { key: "nj", label: "NJ", type: "large_integer" },
    { key: "fl", label: "FL", type: "large_integer" },
    { key: "ca", label: "CA", type: "large_integer" }
  ],
  nondefaultsourcelocationinvoicesummary: [
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po NO", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "amt", label: "Amt", type: "currency" },
    { key: "lines", label: "Lines", type: "integer" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "preferred_location_id", label: "Preferred Location Id", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Bill To Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" }
  ],
  nosalesforspecificitem: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "last_si", label: "Last SI", type: "date" },
    { key: "ytd_sales", label: "Ytd Sales", type: "currency" }
  ],
  nrqtyreceiveddatacenter: [
    { key: "msds", label: "MSDS", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "qty_received", label: "Qty Received", type: "large_integer" }
  ],
  openorderlistview: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po No", type: "text" }
  ],
  openorders: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_on_pick_tickets", label: "Qty On Pick Tickets", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "text" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" }
  ],
  openordersbysupplier: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "location_id", label: "Location Id", type: "text" },
    { key: "supplier_id", label: "Supplier Id", type: "text" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_on_pick_tickets", label: "Qty On Pick Tickets", type: "large_integer" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "text" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" }
  ],
  openordersforitem: [
    { key: "rep", label: "Rep", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "job_name", label: "Job Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "unit_price", label: "Unit Price", type: "currency" },
    { key: "approved", label: "Approved", type: "text" }
  ],
  openpickoverview: [
    { key: "Order_Type", label: "Order Type", type: "text" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "Pick_Count", label: "Pick Count", type: "integer" },
    { key: "Oldest", label: "Oldest", type: "datetime" },
    { key: "Newest", label: "Newest", type: "datetime" }
  ],
  openquotereport: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" }
  ],
  openquotesreport: [
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "quote_no", label: "Quote No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "ship2_id", label: "Ship To Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "po_no", label: "Po No", type: "text" }    
  ],
  openrmadetail: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "taker", label: "Taker", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price", label: "Price", type: "currency" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_canceled", label: "Qty Canceled", type: "large_integer" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" },
    { key: "qty_open", label: "Qty Open", type: "large_integer" },
    { key: "last_date", label: "Last Date", type: "date" }
  ],
  opentransfer: [
    { key: "transfer_no", label: "Transfer No", type: "integer" },
    { key: "from_location_id", label: "From Location Id", type: "integer" },
    { key: "to_location_id", label: "To Location Id", type: "integer" },
    { key: "delete_flag", label: "Delete Flag", type: "text" },
    { key: "complete_flag", label: "Complete Flag", type: "text" },
    { key: "printed_date", label: "Printed Date", type: "date" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "qty_to_transfer", label: "Qty To Transfer", type: "large_integer" },
    { key: "qty_transferred", label: "Qty Transferred", type: "large_integer" },
    { key: "qty_received", label: "Qty Received", type: "large_integer" },
    { key: "created_by", label: "Created By", type: "text" }
  ],
  openvendorreturns: [
    { key: "buyer_id", label: "Buyer Id", type: "integer" },
    { key: "buyer_name", label: "Buyer Name", type: "text" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "last_maintained_by", label: "last Maintained", type: "text" },
    { key: "return_no", label: "Return No", type: "integer" },
    { key: "rma_no", label: "Rma No", type: "text" },
    { key: "return_value", label: "Return Value", type: "currency" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "Status", label: "Status", type: "text" }
  ],
  order_values: [
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "disposition", label: "Disposition", type: "text" },
    { key: "delete_flag", label: "Delete Flag", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_filled", label: "Qty Filled", type: "large_integer" },
    { key: "Amt_Filled", label: "Amt Filled", type: "currency" },
    { key: "qty_canceled", label: "Qty Canceled", type: "large_integer" },
    { key: "Amt_Canceled", label: "Amt Canceled", type: "currency" },
    { key: "qty_backordered", label: "Qty backordered", type: "large_integer" },
    { key: "Amt_backordered", label: "Amt backordered", type: "currency" }
  ],
  order_weights: [
    { key: "line_no", label: "Line No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "weight(Lb)", label: "Weight(Lb)", type: "decimal", format: "0.00" },
    { key: "total_weight(Lb)", label: "Total Weight(Lb)", type: "decimal" ,format: "0.00" },
    { key: "total_weight(Kg)", label: "Total Weight(Kg)", type: "decimal", format: "0.00"}
  ],
  orderallocatedvaluebysupplier: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "created_by", label: "Created BY", type: "text" },
    { key: "cancel_flag", label: "Cancel Flag", type: "text" },
    { key: "projected_order", label: "Projected Order", type: "text" },
    { key: "delete_flag", label: "Delete Flag", type: "text" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "value", label: "Value", type: "currency" }
  ],
  orderexport: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "unit_price", label: "Unit Price", type: "currency" },
    { key: "Discount", label: "Discount", type: "decimal" ,format: "0.00" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "upc", label: "UPC", type: "text" }
  ],
  orderexportforeign: [
    { key: "line_no", label: "Line No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "ship2_name", label: "Ship To Name", type: "text" },
    { key: "po_no", label: "Po No", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_invoiced", label: "Qty Invoiced", type: "large_integer" },
    { key: "weight", label: "Weight", type: "decimal", format: "0.00" },
    { key: "country", label: "Country", type: "text" },
    { key: "class_code", label: "Class Code", type: "text" },
    { key: "material1", label: "Material1", type: "text" },
    { key: "material2", label: "Material2", type: "text" },
    { key: "battery", label: "Battery", type: "text" },
    { key: "battery_location", label: "Battery Location", type: "text" }
  ],
  orderexportnodiscount: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "unit_price", label: "Unit Price", type: "currency" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "upc", label: "UPC", type: "text" }
  ],
  ordersreleasefromhold: [
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "Date_Released", label: "Date Released", type: "date" },
    { key: "Released_By", label: "Released By", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" }
  ],
  ordersshippedbylocation: [
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "bill2_name", label: "Bill To Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "invoice_date", label: "Invoiced Date", type: "date" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "freight", label: "Freight", type: "currency" },
    { key: "carrier_name", label: "Carrier Name", type: "text" },
    { key: "terms_desc", label: "Terms Desc", type: "text" },
    { key: "invoice_desc", label: "Invoice Desc", type: "text" }
  ],
  p21notesforsalesrepcustomers: [
    { key: "note_id", label: "Note Id", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "salesrep_id", label: "Salesrep Id", type: "integer" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "topic", label: "Topic", type: "text" },
    { key: "note", label: "Note", type: "text" },
    { key: "note_area", label: "Note Area", type: "text" },
    { key: "mandatory", label: "Mandatory", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "created_by", label: "Created By", type: "text" }
  ],
  pastdueaccountreportbyrep: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "name", label: "Name", type: "text" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "Oldest_Invoice", label: "Oldest Invoice", type: "large_integer" },
    { key: "Total_Balance", label: "Total Balance", type: "currency" },
    { key: "Total_Current", label: "Total Current", type: "currency" },
    { key: "Total_31-60", label: "Total 31-60", type: "currency" },
    { key: "Total_61-90", label: "Total 61-90", type: "currency" },
    { key: "Total_Over_90", label: "Total Over 90", type: "currency" },
    { key: "Last_Ar_Note", label: "Last AR Note", type: "date" },
    { key: "notes", label: "Notes", type: "text" }
  ],
  paymentdetail: [
    { key: "Date", label: "Date", type: "date" },
    { key: "check_number", label: "Check Number", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "large_integer" },
    { key: "Amount", label: "Amount", type: "currency" }
  ],
  paymentforcustomer: [
    { key: "Remitter", label: "Remitter", type: "integer" },
    { key: "Date", label: "Date", type: "date" },
    { key: "check_number", label: "Check Number", type: "text" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "invoice_no", label: "Invoice No", type: "large_integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "AGE", label: "AGE", type: "large_integer" },
    { key: "Amt_paid", label: "Amt paid", type: "currency" }
  ],
  paymentinquirybyamount: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "name", label: "Name", type: "text" },
    { key: "date", label: "Date", type: "date" },
    { key: "check", label: "Check", type: "text" },
    { key: "amount", label: "Amount", type: "currency" }
  ],
  pendingapproval: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "name", label: "Name", type: "text" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "job_name", label: "Job Name", type: "text" }
  ],
  pickticketoverviewexecutive: [
    { key: "Order_Type", label: "Order Type", type: "text" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "Pick_Count", label: "Pick Count", type: "integer" },
    { key: "open_value", label: "Open Value", type: "currency" },
    { key: "avg_amount", label: "Avg Amount", type: "currency" },
    { key: "oldest", label: "Oldset", type: "datetime" },
    { key: "newest", label: "Newest", type: "datetime" }
  ],
  piecesshipped: [
    { key: "source_location_id", label: "Source Loction Id", type: "integer" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "item_id", label: "Iten Id", type: "text" },
    { key: "qty_shipped", label: "Qty Shipped", type: "large_integer" },
    { key: "unit_price", label: "Avg Amount", type: "currency" }
  ],
  poreceivingdiscrepancyreport: [
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "receipt_number", label: "Receipt Number", type: "text" },
    { key: "po_no", label: "PO NO", type: "text" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "vendor_id", label: "Vendor Id", type: "integer" },
    { key: "vendor_name", label: "Vendor Name", type: "text" },
    { key: "topic", label: "topic", type: "text" },
    { key: "note", label: "note", type: "text" }
  ],
  pricinginfoforsupplier: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "MSRP", label: "MSRP", type: "currency" },
    { key: "MAP", label: "MAP", type: "currency" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "cost", label: "Cost", type: "currency" }
  ],
  productexpirationsreport: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "text" },
    { key: "product_group_desc", label: "Product Group Desc", type: "text" },
    { key: "expiration_date", label: "Expiration Date", type: "date" }    
  ],
  proforma: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "unit_price", label: "Unit Price", type: "currency" },
    { key: "Discount", label: "Discount", type: "decimal" ,format: "0.00" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "disposition", label: "Disposition", type: "text" },
    { key: "upc", label: "UPC", type: "text" }
  ],
  purchaseoverdtrngbysupplier: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "purchases", label: "Purchases", type: "currency" }
  ],
  purchasesummary: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "order_date", label: "Order Date", type: "date" }, 
    { key: "po_no", label: "Po No", type: "text" },
    { key: "created_by", label: "Created By", type: "text" },  
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "value", label: "Value", type: "currency" }
  ],
  purchasing_poexport: [
    { key: "po_no", label: "Po No", type: "text" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" }, 
    { key: "supplier_part_no", label: "Supplier Part No", type: "text" },
    { key: "item_description", label: "Item Description", type: "text" },  
    { key: "unit_of_measure", label: "Unit Of Measure", type: "text" },
    { key: "qty_ordered", label: "Qty Ordered", type: "large_integer" }
  ],
  purchasingdemandreport: [
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "price1", label: "Price1", type: "currency" },
    { key: "cost", label: "Cost", type: "currency" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "last_sale_date", label: "Last Sales Date", type: "date" },
    { key: "last_purchase_date", label: "Last Purchase Date", type: "date" },
    { key: "release_date", label: "Release Date", type: "date" },
    { key: "SUM", label: "SUM", type: "large_integer" },
    { key: "MAX", label: "MAX", type: "large_integer" },
    { key: "AVG", label: "AVG", type: "large_integer" },
    { key: "years_usage", label: "Years Usage", type: "large_integer" },
    { key: "overstock", label: "Overstock", type: "large_integer" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "default_sales_discount_group", label: "Sels Discount Group", type: "text" },
  ],
  putaway: [
    { key: "receipt_no", label: "Receipt Number", type: "integer" },
    { key: "po_no", label: "PO Number", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" },
    { key: "qty_received", label: "Qty Received", type: "large_integer" },
    { key: "primary_bin", label: "Primary Bin", type: "text" },
    { key: "date_created", label: "Date Created", type: "datetime" },
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_backordered", label: "Qty Backordered", type: "large_integer" }
  ],
  receivedporeport: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "location_name", label: "Location Name", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "po_no", label: "PO Number", type: "text" }, 
    { key: "external_po_no", label: "External Po No", type: "text" }
  ],
  receivinglog_pickdate: [
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "receipt_no", label: "Receipt Number", type: "integer" },
    { key: "po_no", label: "PO Number", type: "text" },
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "vendor_id", label: "Vendor Id", type: "integer" },
    { key: "vendor_name", label: "Vendor Name", type: "text" },
    { key: "topic", label: "Topic", type: "text" },
  ],
  recentshipments: [
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "customer_name", label: "Customer Name", type: "text" },
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "name", label: "Name", type: "text" },
    { key: "invoice_date", label: "Invoice Date", type: "date" },
    { key: "invoice_no", label: "Invoice No", type: "integer" },
    { key: "order_no", label: "Order No", type: "integer" },
    { key: "po_no", label: "PO NO", type: "text" }, 
    { key: "ticket_no", label: "Ticket No", type: "integer" },
    { key: "carrier", label: "Carrier", type: "text" },
    { key: "tracking_no", label: "Tracking No", type: "text" },
    { key: "total_amount", label: "Total Amount", type: "currency" },
    { key: "rep", label: "Rep", type: "text" },
    { key: "rep_id", label: "Rep Id", type: "integer" }
  ],
  reducedfreight: [
    { key: "ship_to_id", label: "Ship To Id", type: "integer" },
    { key: "customer_id", label: "Customer Id", type: "integer" },
    { key: "name", label: "Name", type: "text" },
    { key: "carrier_id", label: "Carrier Id", type: "integer" },
    { key: "FREIGHT", label: "Freight", type: "text" },
    { key: "total_sales", label: "Total Sales", type: "currency" },
    { key: "Rep", label: "Rep", type: "text" }, 
    { key: "discount", label: "Discount", type: "text" },
    { key: "payment_type_desc", label: "Payment Type Desc", type: "text" },
    { key: "over_90", label: "over 90", type: "currency" }
  ],
  returnsbybuyer: [
    { key: "buyer_id", label: "Buyer Id", type: "integer" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "date_created", label: "Date Created", type: "date" },
    { key: "return_no", label: "Return#", type: "integer" },
    { key: "rma_no", label: "RMA#", type: "text" }, 
    { key: "location_id", label: "Location Id", type: "integer" }
  ],
  returnsinvbyloc: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "division_name", label: "Division Name", type: "text" },
    { key: "item_id", label: "Item Id", type: "text" },
    { key: "item_desc", label: "Item Desc", type: "text" }, 
    { key: "qty_on_hand", label: "Qty On Hand", type: "large_integer" },
    { key: "qty_allocated", label: "Qty Allocated", type: "large_integer" },
    { key: "moving_average_cost", label: "Moving Average Cost", type: "currency" },
    { key: "total", label: "Total", type: "currency" }
  ],
  returnsinvbylocsummary: [
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "Sum_of_qty_on_hand", label: "Sum Of Qty On Hand", type: "large_integer" },
    { key: "total_value", label: "Total Value", type: "currency" }
  ],
  returnstotalsforsuppliers: [
    { key: "location_id", label: "Location Id", type: "integer" },
    { key: "supplier_id", label: "Supplier Id", type: "integer" },
    { key: "supplier_name", label: "Supplier Name", type: "text" },
    { key: "total_value", label: "Total Value", type: "currency" }
  ],
  salehistoryrepcomparision: [
    { key: "salesrep_id", label: "Rep Id", type: "integer" },
    { key: "Rep", label: "Rep", type: "text" },
    { key: "qty_current", label: "Qty Current", type: "large_integer" },
    { key: "sales_current", label: "Sales Current", type: "currency" },
    { key: "qty_prior", label: "Qty Prior", type: "large_integer" },
    { key: "sales_prior", label: "Sales Prior", type: "currency" }
  ],

  
};