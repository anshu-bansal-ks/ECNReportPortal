// src/lib/supabase.ts
export type FilterType =
  | "text"
  | "select"
  | "daterange"
  | "period"
  | "number"
  | "date"
  | "month"
  | "checkbox"
  | "radio"
  | "periodStart" 
  | "periodEnd";

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
  | "datetime"
  | "decimal";
    width?: string; // ✅ ADD THIS
    format?: string;
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
  defaultValue?: string;
  Placeholder?: string;
  defaultSelect?: string;
  hideLabel?: boolean;
  hideWhen?: {
    filter: string;
    value: any;
  };
  showSelectOption?: boolean;

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
  enableSchedule?: boolean; 
  filter_config: {
    filters: FilterConfig[];
  };
  columns?: Column[];
  locationType?: string;
  pagination?: boolean;
}

export const API_BASE_URL = "http://localhost:5278";

export const buildApiUrl = (endpoint: string) => {
  if (endpoint.startsWith("http")) return endpoint;
  return `${API_BASE_URL}${endpoint}`;
};