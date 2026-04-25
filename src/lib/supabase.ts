// // lib/supabase.ts

// // src/lib/supabase.ts

// // export interface Report {
// //   id: string;
// //   name: string;
// //   description: string;
// //   category: string;
// //   url: string;
// // }

// export type FilterType =
//   | "text"
//   | "select"
//   | "daterange"
//   | "period"
//   | "number"
//   | "date";

// export interface Column {
//   key: string;
//   label: string;
//   type: "text" | "currency" | "number" | "date" | "datetime" | "percentage";
// }
// export interface FilterConfig {
//   type: FilterType;
//   name: string;
//   label?: string;
//   options?: string[];
//   options_endpoint?: string;
//   placeholder?: string;
//   required?: boolean;
// }

// export interface Report {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   api_endpoint: string;
//   supports_excel_export: boolean;
//   supports_pdf_export: boolean;
//   filter_config: {
//     filters: FilterConfig[];
//   };
//   columns?: Column[];
// }
// // Yeh waise hi rahega — tumhara original data
// export const SAMPLE_REPORTS: Report[] = [
//   {
//     id: '1',
//     name: 'Sales Performance Report',
//     description: 'Comprehensive sales metrics and performance tracking',
//     category: 'Sales',
//     api_endpoint: '/api/reports/sales-performance',
//     supports_excel_export: true,
//     supports_pdf_export: true,
//     filter_config: {
//       filters: [
//         { type: 'daterange', name: 'period', label: 'Period' },
//         { type: 'select', name: 'region', label: 'Region', options: ['North', 'South', 'East', 'West'] }
//       ]
//     }
//   },
//   {
//     id: '2',
//     name: 'Revenue Analytics',
//     description: 'Detailed revenue breakdown and analysis',
//     category: 'Finance',
//     api_endpoint: '/api/reports/revenue-analytics',
//     supports_excel_export: true,
//     supports_pdf_export: true,
//     filter_config: {
//       filters: [
//         { type: 'daterange', name: 'period', label: 'Period' },
//         { type: 'select', name: 'department', label: 'Department', options: ['Sales', 'Marketing', 'Operations'] }
//       ]
//     }
//   },
//   {
//     id: '3',
//     name: 'Employee Productivity',
//     description: 'Track employee performance and productivity metrics',
//     category: 'HR',
//     api_endpoint: '/api/reports/employee-productivity',
//     supports_excel_export: true,
//     supports_pdf_export: false,
//     filter_config: {
//       filters: [
//         { type: 'select', name: 'department', label: 'Department', options: ['Sales', 'Marketing', 'Finance', 'Operations'] },
//         { type: 'text', name: 'employee_id', label: 'Employee ID', placeholder: 'Enter employee ID' }
//       ]
//     }
//   },
//   {
//     id: '4',
//     name: 'Inventory Status',
//     description: 'Current inventory levels and stock tracking',
//     category: 'Operations',
//     api_endpoint: '/api/reports/inventory-status',
//     supports_excel_export: true,
//     supports_pdf_export: false,
//     filter_config: {
//       filters: [
//         { type: 'select', name: 'warehouse', label: 'Warehouse', options: ['Warehouse A', 'Warehouse B', 'Warehouse C'] },
//         { type: 'select', name: 'category', label: 'Category', options: ['Electronics', 'Apparel', 'Food'] }
//       ]
//     }
//   },
//   {
//     id: '5',
//     name: 'Customer Satisfaction',
//     description: 'Customer feedback and satisfaction scores',
//     category: 'Customer Service',
//     api_endpoint: '/api/reports/customer-satisfaction',
//     supports_excel_export: true,
//     supports_pdf_export: true,
//     filter_config: {
//       filters: [
//         { type: 'daterange', name: 'period', label: 'Period' },
//         { type: 'select', name: 'product', label: 'Product', options: ['Product A', 'Product B', 'Product C'] }
//       ]
//     }
//   },
//   {
//     id: '6',
//     name: 'After Hours Users Report',
//     description: 'Users logged in after office hours',
//     category: 'Customer Service',
//     api_endpoint: '/api/AfterHoursUsersReport',
//     supports_excel_export: true,
//     supports_pdf_export: true,
//     filter_config: {
//       filters: [
//         {type: 'text',name: 'fromDate',label: 'From Date'},
//         {type: 'text',name: 'tillDate',label: 'Till Date'},
//         {type: 'period',name: 'timePeriod',label: 'Time Period',options: ['TODAY','YESTERDAY','MONTH TO DATE','LAST MONTH','YEAR TO DATE','LAST YEAR' ]},
              
//       ]
//     },
//     columns: [
//       { key: 'loginname', label: 'Login Name', type: 'text' },
//       { key: 'ntUsername', label: 'User Name', type: 'text' },
//       { key: 'databaseName', label: 'Database Name', type: 'text' },
//       { key: 'dbId', label: 'Dbid', type: 'number' },
//       { key: 'dataDate', label: 'Data Date', type: 'date' },
//       { key: 'dateLoggedIn', label: 'DateLoggedin ', type: 'date' },
//       { key: 'clientNetAddress', label: 'Client Net Address', type: 'text' },
//       { key: 'hostname', label: 'Host Name', type: 'text' }
//     ] 
//   },
//   {
//     id: "7",
//     name: "AP Details",
//     description: "Company expenses and budget tracking",
//     category: "Finance",
//     api_endpoint: "/api/APDetails",
//     supports_excel_export: true,
//     supports_pdf_export: true,
//     filter_config: {
//       filters: [
//         { 
//           type: 'select', 
//           name: 'company', 
//           label: 'Company',
//           options_endpoint: '/api/Dropdown/companies'
//         },
//         { 
//           type: 'text', 
//           name: 'vendor', 
//           label: 'Enter Vendor Id',
//           // options_endpoint: '/api/Dropdown/vendors'
//         }
//       ]
//     },
//     columns: [
//       { key: 'invoiceDate', label: 'Invoice Date', type: 'date' },
//       { key: 'invoiceNo',   label: 'Invoice No',   type: 'number' },
//       { key: 'poNo',        label: 'PO No',        type: 'text' },
//       { key: 'curr',        label: 'Current',      type: 'currency' },     // ← lowercase c
//       { key: 'over30',      label: '30+ Days',     type: 'currency' },
//       { key: 'over60',      label: '60+ Days',     type: 'currency' },
//       { key: 'over90',      label: '90+ Days',     type: 'currency' },
//       { key: 'total',       label: 'Total Due',    type: 'currency' }
//     ]
//   },
//   {
//     id: '8',
//     name: 'ECN Virtual Show 2021 Customer Totals',
//     description: 'Project progress and milestone tracking',
//     category: 'Operations',
//     api_endpoint: '/api/CustomerTotals',
//     supports_excel_export: true,
//     supports_pdf_export: false,
//     filter_config: {
//       filters: [
//         { 
//           type: 'select', 
//           name: 'company', 
//           label: 'Company',
//           options_endpoint: '/api/Dropdown/companies'
//         }
//       ]
//     },
//     columns: [
//       { key: 'customerId', label: 'Customer ID', type: 'number' },
//       { key: 'customerName', label: 'Customer Name', type: 'text' },
//       { key: 'showTotal', label: 'Show Total', type: 'currency' }
//     ]
//   },
//   {
//     id: '9',
//     name: 'Ap Summary',
//     description: 'Summary report with company filter',
//     category: 'Operations',
//     api_endpoint: '/api/APSummary',
//     supports_excel_export: true,
//     supports_pdf_export: false,
//     filter_config: {
//       filters: [
//         { 
//           type: 'select', 
//           name: 'company', 
//           label: 'Company',
//           options_endpoint: '/api/Dropdown/companies'
//         }
//       ]
//     },
//     columns: [
//       { key: 'vendorId', label: 'Vendor ID', type: 'number' },
//       { key: 'vendorName', label: 'Vendor Name', type: 'text' },
//       { key: 'balance', label: 'Balance', type: 'currency' }
//     ]
//   }
// ];

// src/lib/supabase.ts

export type FilterType =
  | "text"
  | "select"
  | "daterange"
  | "period"
  | "number"
  | "date"
  | "checkbox";

export interface Column {
  key: string;
  label: string;
  type:
  | "text"
  | "currency"
  | "number"
  | "large_number"
  | "integer"
  | "large_integer"
  | "percentage"
  | "date"
  | "datetime";
    width?: string; // ✅ ADD THIS
    render?: (row: any) => React.ReactNode; // ✅ IMPORTANT
    showIf?: Record<string, string>;
}

export interface FilterConfig {
  type: FilterType;
  name: string;
  label?: string;
  options?: string[];
  options_endpoint?: string;
  placeholder?: string;
  required?: boolean;
  allowAll?: boolean;
  show?: string;
  apiParam?: string;
}

export interface Report {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  api_endpoint: string;
  supports_excel_export: boolean;
  supports_pdf_export: boolean;
  enableSchedule?: boolean; // ✅ ADD THIS
  filter_config: {
    filters: FilterConfig[];
  };
  columns?: Column[];
}

export const API_BASE_URL = "http://localhost:5278";

export const buildApiUrl = (endpoint: string) => {
  if (endpoint.startsWith("http")) return endpoint;
  return `${API_BASE_URL}${endpoint}`;
};