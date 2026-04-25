
// src/components/ReportViewer.tsx
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"; 
import AsyncSelect from "react-select/async";
import { ArrowLeft, FileSpreadsheet, FileText, RefreshCw } from "lucide-react";
import axios from "axios";
import { Report, buildApiUrl } from "../lib/supabase";
import ReportSubtitle from "./ReportSubtitle";
import { useTableSorting } from "../hooks/useTableSorting";
import CustomerInfo, { CustomerApiResponse } from "./CustomerInfo";
import ItemDetailsBulkTable from "./ItemDetailsBulkTable"; 
import { REPORT_COLUMN_MAP,FOOTER_TOTAL_CONFIG } from "../config/reportColumns";
import ScheduleModal from "./ScheduleModal";

import {
  fetchCompanies,
  fetchVendors,
  fetchSalesReps,
  fetchSuppliers,
  fetchSuppliersop, 
  fetchCustomers,
  validateCustomer,
  CompanyOption,
  VendorOption,
  SalesRepOption,
  CustomerOption,
  SupplierOption, 
  SupplierOpOption,
  fetchShows,
  fetchPromos,
  fetchLocations,
  fetchLocationSupplier,
  ShowOption,
  PromoOption,
  LocationOption,
  LocationSupplierOption
} from "../lib/dropdownApi";

interface ReportViewerProps {
  report: Report;
  onBack: () => void;
}

export default function ReportViewer({ report, onBack }: ReportViewerProps) {
  const token = localStorage.getItem("token") || "";
  const location = useLocation();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<any[]>([]); // any to handle both array and object
  const [customerData, setCustomerData] = useState<CustomerApiResponse | null>(null); // ✅ Error 2304 Fix
  const [loading, setLoading] = useState(false);
  // 🔥 PAGINATION STATES
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 100;
  const isFetchingRef = useRef(false); // Double trigger rokne ke liye
  const [showSchedule, setShowSchedule] = useState(false);
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<VendorOption | null>(null);
  const [selectedSalesRep, setSelectedSalesRep] = useState<SalesRepOption | null>(null);
  const [salesReps, setSalesReps] = useState<SalesRepOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerOption | null>(null);
  const [customerError, setCustomerError] = useState("");
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierOption | null>(null);
  const [suppliersOp, setSuppliersOp] = useState<SupplierOpOption[]>([]);
  const [selectedSupplierOp, setSelectedSupplierOp] = useState<SupplierOpOption | null>(null);
  const [shows, setShows] = useState<ShowOption[]>([]);
  const [selectedShow, setSelectedShow] = useState<ShowOption | null>(null);
  const [promos, setPromos] = useState<PromoOption[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<PromoOption | null>(null);
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [locationSuppliers, setLocationSuppliers] = useState<LocationSupplierOption[]>([]);
  const [selectedLocationSupplier, setSelectedLocationSupplier] = useState<LocationSupplierOption | null>(null);
  const [months, setMonths] = useState<any[]>([]);
  const [autoRun, setAutoRun] = useState(false); 
  const [downloading, setDownloading] = useState(false);
  
  // ✅ Company filter config nikal rahe hain
const companyFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "company"
);
const getVisibleColumns = (columns: any[], filters: any) => {
  return columns.filter((col) => {
    if (!col.showIf) return true;

    return Object.entries(col.showIf).every(
      ([key, val]) => filters[key] === val
    );
  });
};
// ✅ FINAL FILTER LOGIC (AUTO ALL)
const companyOptions = companies.filter((c) => {
  // agar show define nahi hai → ALL
  if (!companyFilter?.show) return true;

  // agar explicitly ALL hai
  if (companyFilter.show === "ALL") return true;

  // warna specific (ECN / IVD / ADV / XG)
  // return c.value === companyFilter.show;
  const allowed = companyFilter.show
  .split(",")
  .map((x: string) => x.trim().toUpperCase());

return allowed.includes(c.value.toUpperCase());
});

    /* CELL VALUE FORMATTER - With Dollar Sign & 2 Decimal Places */
const formatCellValue = (value: any, type: string) => {
  if (value === undefined || value === null || value === "") return "—";
  if (type === "text") {
    return String(value);
  }

  const num = parseFloat(value);

  if (isNaN(num)) return String(value);
  if (type === "currency") {
    if (num === 0) return "$0.00";

    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(num));
    return num < 0 ? `(${formatted})` : formatted;
  }

  if (type === "number") {
    return String(Math.round(num));
  }
  if (type === "date") {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
  
    return d.toLocaleDateString("en-US");
  }
  
  if (type === "datetime") {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
  
    return d.toLocaleDateString("en-US") + " " +
      d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
  }
  if (type === "percentage") {
    return num.toFixed(2) + "%";
  }

  return String(value);
};

  const reportKey = report.key || report.name?.toLowerCase().trim();
  const isThirteenMonthReport = report.api_endpoint?.toLowerCase().includes("thirteenmonthcustomersalesforvendor");
  let columns =
    REPORT_COLUMN_MAP[reportKey] ||
    report?.columns ||
    [];
  // ✅ NEW FIXED CODE - Replace with this:
  if (isThirteenMonthReport && months.length > 0) {
    columns = columns.map((col) => {
      if (col.key.startsWith("mon")) {
        const monthIndex = parseInt(col.key.replace("mon", "")) - 1;
        const monthInfo = months[monthIndex];

        let cleanLabel = col.label;
        if (monthInfo?.month) {
          cleanLabel = monthInfo.month
            .toString()
            .trim()
            .replace(/\s+\d+$/, '')     // "MAR-25 5" se "MAR-25" banayega
            .replace(/\s+/g, '-')       // spaces ko - se replace
            .toUpperCase();
        }

        return { ...col, label: cleanLabel };
      }
      return col;
    });
  }
  
  // ✅ CLICK FUNCTION (React version of Link())
  const handleVendorClick = (row: any) => {
    const Comp_id = filters.company || "";

    // navigate(`/apdetails?Comp_id=${Comp_id}&vendorid=${row.vendorId}`);
    window.open(
      `/report/apdetails?Comp_id=${Comp_id}&vendorid=${row.vendorId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  // ✅ MODIFY COLUMNS (ADD THIS BLOCK HERE)
const modifiedColumns = columns.map((col) => {
  if (report.api_endpoint?.toLowerCase().includes("apsummary") &&
  col.key === "vendorId") {
    return {
      ...col,
      render: (row: any) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleVendorClick(row);
          }}
          className="text-blue-600 underline cursor-pointer"
        >
          {row.vendorId}
        </a>
      )
    };
  }
  return col;
});
  const isCustomerInfo = report.api_endpoint?.toLowerCase().includes("customerinfo");
  const isItemDetailsReport =report.api_endpoint?.toLowerCase().includes("itemdetails"); 
  
  const tableData = isCustomerInfo ? [] : (Array.isArray(data) ? data : []);
  const visibleColumns = getVisibleColumns(modifiedColumns, filters);
  //const { sortedData, sortConfig, handleSort } = useTableSorting(tableData, modifiedColumns);
  const { sortedData, sortConfig, handleSort } = useTableSorting(tableData, visibleColumns);
  /* INIT FILTERS */
  useEffect(() => {
    if (!report?.filter_config?.filters) return;
    const init: Record<string, string> = {};
    report.filter_config.filters.forEach((f) => (init[f.name] = ""));
    setFilters(init);
  }, [report]);

  // ✅ AUTO LOAD FROM URL (ADD HERE)
useEffect(() => {
  const params = new URLSearchParams(location.search);

  const compId = params.get("Comp_id");
  const vendorId = params.get("vendorid");

  if (compId || vendorId) {
    //filtersset
    setFilters((prev) => ({
      ...prev,
      company: compId || "",
      vendor: vendorId || "",
    }));

    // dropdown bind (important for AsyncSelect)
    if (vendorId) {
      setSelectedVendor({
        value: vendorId,
        label: vendorId,
      });
    }
    setAutoRun(true);
  }
}, [location.search]);

useEffect(() => {
  if (autoRun) {
    handleApplyFilters();
    setAutoRun(false);
  }
}, [autoRun]);

  /* LOAD COMPANIES */
  useEffect(() => {
    if (!token) return;
    const needsCompany = report?.filter_config?.filters.some((f) => f.name === "company");
    if (!needsCompany) return;
    fetchCompanies(token).then(setCompanies).catch(() => setCompanies([]));
  }, [report, token]);

  // ✅ Load all sales reps when company changes (no search)
  // Line 274 ke paas change karein:
useEffect(() => {
  if (!filters.company || !token) {
    setSalesReps([]);
    setSelectedSalesRep(null);
    setShows([]);
    setPromos([]);
    setLocations([]);
    setLocationSuppliers([]);
    return;
  }

  // 🔥 Naya Code: Check karo report me kaunse filters mangi hain
  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  // ✅ Sirf tab call hoga agar "salesrep" filter report config me hai
  if (activeFilters.includes("salesrep")) {
    fetchSalesReps(token, filters.company, "")
      .then(setSalesReps)
      .catch(() => setSalesReps([]));
  }

  // ✅ Sirf tab call hoga agar "show" filter report config me hai
  if (activeFilters.includes("show")) {
    fetchShows(token, filters.company).then(setShows);
  }

  // ✅ Sirf tab call hoga agar "promo" filter report config me hai
  if (activeFilters.includes("promo")) {
    fetchPromos(token, filters.company).then(setPromos);
  }

  // ✅ Sirf tab call hoga agar "location" filter report config me hai
  if (activeFilters.includes("location")) {
    fetchLocations(token, filters.company).then(setLocations);
  }

  // ✅ Sirf tab call hoga agar "locationsupplier" filter report config me hai
  if (activeFilters.includes("locationsupplier")) {
    fetchLocationSupplier(token, filters.company).then(setLocationSuppliers);
  }
  
}, [filters.company, token, report]); // report dependency add kardi
  // ✅ Load all suppliers when company changes
// Line 301 ke paas change karein:
useEffect(() => {
  if (!filters.company || !token) {
    setSuppliers([]);
    setSelectedSupplier(null);
    return;
  }

  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  // 🔥 Check if supplier is needed
  if (activeFilters.includes("supplier")) {
    fetchSuppliers(token, filters.company, "")
      .then(setSuppliers)
      .catch(() => setSuppliers([]));
  }
}, [filters.company, token, report]);

// Line 312 ke paas change karein:
useEffect(() => {
  if (!filters.company || !token) {
    setSuppliersOp([]);
    setSelectedSupplierOp(null);
    return;
  }

  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  // 🔥 Check if supplierop is needed
  if (activeFilters.includes("supplierop")) {
    fetchSuppliersop(token, filters.company, "")
      .then(setSuppliersOp)
      .catch(() => setSuppliersOp([]));
  }
}, [filters.company, token, report]);
// ✅ NEW: allowAll control per report

const salesRepFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "salesrep"
);

const supplierFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "supplier"
);
const supplierOpFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "supplierop"
);

const allowSalesRepAll = salesRepFilter?.allowAll === true;
const allowSupplierAll = supplierFilter?.allowAll === true;
const allowSupplierOPAll = supplierOpFilter?.allowAll === true;

// ✅ NEW: options with ALL conditionally
const salesRepOptions = allowSalesRepAll
  ? [{ value: "ALL", label: "ALL" }, ...salesReps]
  : salesReps;

const supplierOptions = allowSupplierAll
  ? [{ value: "ALL", label: "ALL" }, ...suppliers]
  : suppliers;
  const supplierOpOptions = allowSupplierOPAll
  ? [{ value: "ALL", label: "ALL" }, ...suppliersOp]
  : suppliersOp;
  /* UPDATE FILTER */
  const updateFilter = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name === "company") {
      setSelectedVendor(null);
      setSelectedSalesRep(null);
      setSelectedCustomer(null);
      setSelectedShow(null);
      setSelectedPromo(null);
      setSelectedLocation(null);
      setSelectedLocationSupplier(null);
      setCustomerError("");
      setFilters((prev) => ({
        ...prev,
        vendor: "",
        salesrep: "",
        customer: "",
        show: "",
        promo: "",
        location: "",
        locationsupplier: ""
      }));
    }
  };
  
  // ✅ Fix 7006: pageNum ko 'number' type diya
  
  // const fetchData = async (pageNum: number, isInitial = false) => {
  //   if (!report?.api_endpoint) {
  //     if (isInitial) alert("Report API not configured");
  //     return;
  //   }

  //   if (isFetchingRef.current) return; 
  //   isFetchingRef.current = true;

  //   if (isInitial) {
  //     setLoading(true);
  //     setData([]); 
  //   }

  //   try {
  //     const url = new URL(buildApiUrl(report.api_endpoint));
  //     Object.entries(filters).forEach(([k, v]) => {
  //       if (!v) return;
  //       let paramName = k;
  //       if (k === "company") paramName = "compId";
  //       if (k === "vendor") paramName = "vendorId";
  //       if (k === "salesrep") paramName = "repId";
  //       if (k === "customer") paramName = "custId";
  //       if (k === "supplier") paramName = "supplierId"; 
  //       if (k === "supplierop") paramName = "supplierId";
  //       if (k === "show") paramName = "showId";
  //       if (k === "promo") paramName = "promoId";
  //       if (k === "location") paramName = "locationId";
  //       if (k === "locationsupplier") paramName = "supplierId";
  //       url.searchParams.append(paramName, v);
  //     });

  //     url.searchParams.append("pageNumber", pageNum.toString());
  //     url.searchParams.append("pageSize", PAGE_SIZE.toString());

  //     const res = await axios.get(url.toString(), {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     // ✅ Fix 7034 & 7005: processedData ko 'any' type declare kiya
  //     let processedData: any; 
  //     if (isCustomerInfo) {
  //       const original = res.data || {};
  //       processedData = {
  //         basic: original.Basic || original.basic || [],
  //         groupCode: original.GroupCode || original.groupCode || [],
  //         totalDue: original.TotalDue || original.totalDue || [],
  //         salesSummary: original.SalesSummary || original.salesSummary || [],
  //         salesDetails: original.SalesDetails || original.salesDetails || [],
  //       };
  //     } else if (isThirteenMonthReport) {
  //       processedData = res.data?.data || [];
  //       if (isInitial) setMonths(res.data?.months || []);
  //     } else {
  //       const raw = res.data;
  //       if (Array.isArray(raw)) processedData = raw;
  //       else if (raw && Array.isArray(raw.data)) processedData = raw.data;
  //       else if (raw && Array.isArray(raw.records)) processedData = raw.records;
  //       else processedData = [];
  //     }

  //     if (isInitial) {
  //       setData(processedData);
  //       setCustomerData(isCustomerInfo ? processedData : null);
  //     } else {
  //       setData((prev: any[]) => [...prev, ...processedData]);
  //     }

  //     setHasMore(!isCustomerInfo && processedData.length === PAGE_SIZE);
  //     setAppliedFilters({ ...filters });

  //   } catch (err: any) { // ✅ Fix 18046: err ko 'any' type diya
  //     console.error("Report error:", err);
  //     if (isInitial) alert(err.response?.data?.message || "Failed to load report");
  //   } finally {
  //     setLoading(false);
  //     isFetchingRef.current = false;
  //   }
  // };
  // 🔹 DATA FETCH LOGIC
const fetchData = async (pageNum: number, isInitial = false) => {
  if (!report) return;
  if (isFetchingRef.current) return;
  
  isFetchingRef.current = true;
  if (isInitial) {
    setLoading(true);
    setData([]);
  }

  try {
    // URL format: /api/MasterReport/apsummary
    const url = new URL(buildApiUrl(`/api/MasterReport/${reportKey}`));
    
    // Filters append karein
    Object.entries(filters).forEach(([k, v]) => {
      if (!v) return;
      let paramName = k;
      
      if (k === "company") paramName = "compId";
      else if (k === "vendor") paramName = "vendorId";
      else if (k === "salesrep") paramName = "repId";
      else if (k === "customer") paramName = "custId";
      else if (k === "supplier" || k === "supplierop" || k === "locationsupplier") paramName = "supplierId";
      else if (k === "show") paramName = "showId";
      else if (k === "promo") paramName = "promoId";
      else if (k === "location") paramName = "locationId";
      
      url.searchParams.append(paramName, v);
    });

    url.searchParams.append("pageNumber", pageNum.toString());
    url.searchParams.append("pageSize", PAGE_SIZE.toString());

    const res = await axios.get(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
// 6. 🔥 Special Data Handling
if (isCustomerInfo) {
  // CustomerInfo: Returns an object { Basic: [], GroupCode: [], SalesDetails: [] }
  const apiResponse = res.data;
  setCustomerData(apiResponse);
  setData([]); // Generic table hide rahega
} 
else if (isThirteenMonthReport) {
  // 13-Month: Set months state for dynamic headers
  setData(res.data.data || []);
  if (isInitial && res.data?.months) {
    setMonths(res.data.months); // CS6133 Error Fix: setMonths used here
  }
} 
else {
  // Generic List (APDetails, APSummary, etc.)
  const processedData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
  if (isInitial) setData(processedData);
  else setData((prev) => [...prev, ...processedData]);
}

// 7. Check if there's more data for pagination
const currentDataLength = Array.isArray(res.data) ? res.data.length : (res.data.data?.length || 0);
setHasMore(!isCustomerInfo && currentDataLength === PAGE_SIZE);
setAppliedFilters({ ...filters });
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    isFetchingRef.current = false;
  }
};

// 🔹 EXCEL EXPORT LOGIC
const handleExport = async (type: "excel" | "pdf") => {
  if (type === "pdf") {
    alert("PDF Export coming soon...");
    return;
  }
  setDownloading(true);
  try {
    const exportUrl = buildApiUrl(`/api/MasterReport/${reportKey}/${type}`);
    const footerConfig = FOOTER_TOTAL_CONFIG[reportKey] || { 
      totalColumns: [], 
      labelColumn: undefined 
    };
    const payload = {
      reportName: report.name,
      compId: filters.company,
      filters: filters,
      filterSummary: buildFilterSummary(),
      totalColumns: footerConfig.totalColumns, 
      labelColumn: footerConfig.labelColumn 
    };
    const res = await axios.post(exportUrl, payload, {
      responseType: "blob", // Important for downloading binary files
      headers: { Authorization: `Bearer ${token}` }
    });

    // 3. Create Download Link
    const blob = new Blob([res.data], { 
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
    });
    // 🔹 handleExport ke andar create download link wala part
const generateFormattedFileName = () => {
  const reportName = report.name;
  const parts: string[] = [];

  // 1. Pehle Company ID (ECN, IVD etc.)
  if (filters.company) parts.push(filters.company);

  // 2. Phir baaki filters (Vendor, Customer etc.) agar Date ke alawa kuch hai
  const mainFilter = filters.vendor || filters.customer || filters.salesrep || filters.supplier;
  if (mainFilter && mainFilter !== "ALL") parts.push(mainFilter);

  // 3. Date Range (From aur Till date ko dash se jodna)
  if (filters.fromdate && filters.tilldate) {
    parts.push(`${filters.fromdate}-${filters.tilldate}`);
  } else if (filters.timeperiod) {
    parts.push(filters.timeperiod);
  } else {
    // Agar dates select nahi hain toh current date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    parts.push(today);
  }

  // 4. Bracket ke andar saare parts ko join karna
  const filterString = parts.length > 0 ? `(${parts.join("-")})` : "";

  return `${reportName}${filterString}.xlsx`.replace(/\s+/g, " "); // Spaces clean rakhega
};

const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);

// 🔥 Exactly aapke bataye huye format me download hoga
link.download = generateFormattedFileName();

document.body.appendChild(link);
link.click();
document.body.removeChild(link);
    
  } catch (err) {
    alert("Export failed");
  } finally {
    setDownloading(false);
  }
};
  const handleApplyFilters = () => {
    setPage(1);
    setHasMore(true);
    fetchData(1, true); // true matlab reset everything
  };
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isCustomerInfo || isItemDetailsReport) return;

      // document level height checking
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      
      if (scrollHeight - scrollTop <= clientHeight + 150 && !loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);
      }
    };

    window.addEventListener("scroll", handleBodyScroll);
    return () => window.removeEventListener("scroll", handleBodyScroll);
  }, [loading, hasMore, page]);
  
  // 🔥 CHANGE 1: GENERIC EXCEL EXPORT (POST)
  // const handleExport = async (type: "excel" | "pdf") => {
  //   if (!report?.api_endpoint) return;
  //   setDownloading(true);

  //   const payload = {
  //     reportName: report.name,
  //     compId: filters.company,
  //     columnNames: modifiedColumns.map(c => 
  //       c.type === "currency" ? `${c.label} ($)` : c.label
  //     ),
  //     columnDataTypes: modifiedColumns.map(c => {
  //       const key = c.key.toLowerCase();
      
  //       // ================= FINANCIAL =================
  //       if (c.type === "currency") {
  //         return "SMALL_FINANCIAL_AMT";
  //       }
      
  //       // ================= INTEGER LOGIC =================
  //       // if (c.type === "number") {
  //       //   if (key.includes("id")) return "INTEGER_ID";
      
  //       //   // 👇 heuristic for large vs small integer
  //       //   if (key.includes("qty") || key.includes("count")) {
  //       //     return "LARGE_INTEGER";
  //       //   }
      
  //       //   return "INTEGER";
  //       // }
  //       if (c.type === "integer" || c.type === "large_integer") {
  //         if (key.includes("id")) return "INTEGER_ID";
        
  //         if (c.type === "large_integer") return "LARGE_INTEGER";
        
  //         return "INTEGER";
  //       }
      
  //       // ================= DATE =================
  //       if (c.type === "date") return "DATE";
  //       if (c.type === "datetime") return "DATETIME";
      
  //       // ================= PERCENTAGE =================
  //       if (c.type === "percentage") {
  //         return "PERCENT_SMALL";
  //       }
      
  //       // ================= TEXT =================
  //       if (c.type === "text") return "TEXT";
      
  //       return "TEXT";
  //     }),
  //     totalColumns: footerConfig.totalColumns,
  //     labelColumn: footerConfig.labelColumn,
  //     filterSummary: buildFilterSummary(),
  //     filters: filters // Pass existing filters to backend
  //   };

  //   try {
  //     const res = await axios.post(buildApiUrl(`${report.api_endpoint}/${type}`), payload, {
  //       responseType: "blob",
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = `${report.name}.xlsx`;
  //     link.click();
  //   } catch (err) {
  //     alert("Export failed");
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

// ✅ FOOTER CONFIG with column name support
const footerConfig = FOOTER_TOTAL_CONFIG[reportKey] || { 
  totalColumns: [], 
  labelColumn: undefined 
};

const totalColumns = footerConfig.totalColumns || [];

// ✅ CALCULATE TOTALS (same)
const totals: Record<string, number> = {};

totalColumns.forEach((colKey) => {
  totals[colKey] = sortedData.reduce((sum: number, row: any) => {
    const val = parseFloat(String(row[colKey] || "0"));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
});
  /* CUSTOMER VALIDATION */
  const handleCustomerBlur = async () => {
    if (!filters.customer || !filters.company) return;
    const result = await validateCustomer(token, filters.company, filters.customer);
    setCustomerError(result ? "" : "Invalid Customer ID");
  };
// ================== FILTER SUMMARY FOR EXCEL TITLE ==================
const buildFilterSummary = (): string => {
  const parts: string[] = [];

  // Company
  if (filters.company) {
    const companyName = companies.find(c => c.value === filters.company)?.label || filters.company;
    parts.push(`Company: ${companyName}`);
  }

  // Vendor
  if (filters.vendor && selectedVendor?.label) {
    parts.push(`Vendor: ${selectedVendor.label}`);
  }

  // Sales Rep
  if (filters.salesrep && selectedSalesRep?.label) {
    parts.push(`Sales Rep: ${selectedSalesRep.label}`);
  }

  // Customer
  if (filters.customer && selectedCustomer?.label) {
    parts.push(`Customer: ${selectedCustomer.label}`);
  }

  // Supplier
  if (filters.supplier && selectedSupplier?.label) {
    parts.push(`Supplier: ${selectedSupplier.label}`);
  }

  // Supplier OP
  if (filters.supplierop && selectedSupplierOp?.label) {
    parts.push(`Supplier: ${selectedSupplierOp.label}`);
  }

  // Date Range
  if (filters.fromdate && filters.tilldate) {
    parts.push(`From: ${filters.fromdate} To: ${filters.tilldate}`);
  } 
  else if (filters.timeperiod) {
    parts.push(`Time Period: ${filters.timeperiod}`);
  }
  else {
    // 🔥 Sabse zaroori: Agar kuch bhi select nahi hai, toh Current Date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0]; // Format: 2026-04-23
    parts.push(`As of: ${today}`);
  }

  return parts.length > 0 ? parts.join(" | ") : "";
};
  if (!report) return null;

  return (
    // <div className="min-h-screen bg-slate-50">
    <div className="max-h-screen overflow-auto flex flex-col">
      {/* HEADER */}
      {/* <header className="bg-white border-b shadow sticky top-0 z-50"> */}
      <header className="sticky top-0 z-50 h-[80px] bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={onBack} 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <ArrowLeft size={18} /> Back
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">{report.name}</h1>
            <ReportSubtitle
              report={report}
              filters={appliedFilters}
              companies={companies}
              dropdownOptions={{
                vendor: selectedVendor ? [selectedVendor] : [],
                salesrep: selectedSalesRep ? [selectedSalesRep] : [],
                customer: selectedCustomer ? [selectedCustomer] : [],
              }}
            />
          </div>
          <div className="flex gap-3">
            {report.supports_excel_export && (
              <button
                onClick={() => handleExport("excel")}
                // onClick={handleExport}
                disabled={downloading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-sm"
              >
                <FileSpreadsheet size={16} /> 
                {downloading ? "Downloading..." : "Excel"}
              </button>
            )}
            {report.supports_pdf_export && (
              <button
                // onClick={() => handleExport("pdf")}
                onClick={() => alert("PDF Export coming soon...")}
                disabled={downloading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-sm"
              >
                <FileText size={16} /> 
                {downloading ? "Downloading..." : "PDF"}
              </button>
            )}
            {report?.enableSchedule && (
             <button
             onClick={() => {
              const hasCompanyFilter = report?.filter_config?.filters?.some(
                (f: any) => f.name === "company"
              );
        
              if (hasCompanyFilter && (!filters?.company || filters.company.trim() === "")) {
                alert("Please select Company!");
                return;
              }
               setShowSchedule(true);
             }}
             className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
           >
             Schedule
           </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {/* <main className="max-w-7xl mx-auto"> */}
      <main>
      {/* <main className="max-w-7xl mx-auto h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden px-6"> */}
        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow p-3 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Filters</h2>
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2 shadow-sm disabled:opacity-60"
            >
              <RefreshCw size={16} className={`${loading ? "animate-spin" : ""}`} />
              Apply Filters
            </button>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {report.filter_config.filters.map((f) => {
              
              // ================== MUTUAL DISABLE LOGIC ==================
              let isDisabled = false;
              const fName = f.name.toLowerCase();

              if (fName === "fromdate" || fName === "tilldate") {
                if (filters.timeperiod) isDisabled = true;
              }
              if (fName === "timeperiod") {
                if (filters.fromdate || filters.tilldate) isDisabled = true;
              }
              return (
              <div key={f.name}>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label> */}

                {f.name === "company" ? (
                  <select
                    value={filters.company || ""}
                    onChange={(e) => updateFilter("company", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Company</option>
                    {/* {companies.map((c) => ( */}
                    {companyOptions.map((c) => (
                      <option key={c.value} value={c.value}>
                        { c.value}
                      </option>
                    ))}
                  </select>
                ) : f.name === "vendor" ? (
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ 
                      menuPortal: base => ({ ...base, zIndex: 9999 }),
                      menu: base => ({ ...base, zIndex: 9999 }) 
                    }}
                    menuPosition={'fixed'}
                    isDisabled={!filters.company}
                    value={selectedVendor}
                    loadOptions={(input) => fetchVendors(token, filters.company, input)}
                    onChange={(v: any) => {
                      setSelectedVendor(v);
                      updateFilter("vendor", v?.value || "");
                    }}
                    placeholder="Search vendor..."
                  />
                ) : f.name === "salesrep" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!filters.company}
                    value={selectedSalesRep?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const rep = salesRepOptions.find((r) => r.value === val) || null;
                      setSelectedSalesRep(rep);
                      updateFilter("salesrep", val);
                    }}
                  >
                  <option value="">Select Sales Rep</option>

                    {salesRepOptions.map((rep) => (
                      <option key={rep.value} value={rep.value}>
                        {rep.label}
                      </option>
                    ))}
                  </select>
                ) : f.name === "supplier" ? (
                  <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!filters.company}
                  value={selectedSupplier?.value || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const sup = supplierOptions.find((s) => s.value === val) || null;
                    setSelectedSupplier(sup);
                    updateFilter("supplier", val);
                  }}
                >
                <option value="">Select Supplier</option>

                  {supplierOptions.map((sup) => (
                    <option key={sup.value} value={sup.value}>
                      {sup.label}
                    </option>
                  ))}
                </select>
                ) : f.name === "supplierop" ? (
                  <select
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!filters.company}
                  value={selectedSupplierOp?.value || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const sup = supplierOpOptions.find((s) => s.value === val) || null;
                    setSelectedSupplierOp(sup);
                    updateFilter("supplierop", val);
                  }}
                >
                <option value="">Select Supplier</option>

                  {supplierOpOptions.map((sup) => (
                    <option key={sup.value} value={sup.value}>
                      {sup.label}
                    </option>
                  ))}
                </select>
                ): f.name === "customer" ? (
                  <>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      isClearable
                      isDisabled={!filters.company}
                      value={selectedCustomer}
                      loadOptions={(input) => fetchCustomers(token, filters.company, input)}
                      onChange={(v: CustomerOption | null) => {
                        setSelectedCustomer(v);
                        updateFilter("customer", v?.value || "");
                      }}
                      onBlur={handleCustomerBlur}
                      placeholder="Search customer..."
                    />
                    {customerError && <p className="text-red-500 text-xs mt-1">{customerError}</p>}
                  </>
                ) : f.type === "checkbox" ? (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={filters[f.name] === "true"}
                        onChange={(e) =>
                          updateFilter(f.name, e.target.checked ? "true" : "false")
                        }
                      />
                      <label className="text-sm">{f.label}</label>
                    </div>
                ): f.name === "show" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={!filters.company}
                    value={selectedShow?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const obj = shows.find(s => s.value === val) || null;
                      setSelectedShow(obj);
                      updateFilter("show", val);
                    }}
                  >
                    <option value="">Select Show</option>
                    {shows.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                ): f.name === "promo" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={!filters.company}
                    value={selectedPromo?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const obj = promos.find(p => p.value === val) || null;
                      setSelectedPromo(obj);
                      updateFilter("promo", val);
                    }}
                  >
                    <option value="">Select Promo</option>
                    {promos.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                ): f.name === "location" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={!filters.company}
                    value={selectedLocation?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const obj = locations.find(l => l.value === val) || null;
                      setSelectedLocation(obj);
                      updateFilter("location", val);
                    }}
                  >
                    <option value="">Select Location</option>
                    {locations.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                ): f.name === "locationsupplier" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={!filters.company}
                    value={selectedLocationSupplier?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const obj = locationSuppliers.find(l => l.value === val) || null;
                      setSelectedLocationSupplier(obj);
                      updateFilter("locationsupplier", val);
                    }}
                  >
                    <option value="">Select Location Supplier</option>
                    {locationSuppliers.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                ) : f.type === "date" ? (
                  <input
                    type="date"
                    disabled={isDisabled}
                    value={filters[f.name] || ""}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : f.type === "period" ? (
                  <select
                  disabled={isDisabled}
                    value={filters[f.name] || ""}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Period</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={filters[f.name] || ""}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${f.label?.toLowerCase() || f.name}`}
                  />
                )}
              </div>
              );
                })}
          </div>
        </div>

        {/* REPORT CONTENT */}
        {isCustomerInfo ? (
          <div className="bg-white rounded-xl shadow p-6">
            {loading ? (
              <div className="p-20 text-center">
                <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
              </div>
            // ) : !data || (Array.isArray(data) && data.length === 0) ? (
              ) : !customerData ? (
              <div className="p-20 text-center text-gray-500">
                No customer data available. Please select customer and apply filters.
              </div>
            ) : (
              <CustomerInfo data={customerData} />
            )}
          </div>
        ) : isItemDetailsReport ? (

          // 🔥🔥🔥 HANDSONTABLE HERE (NEW WRAPPER)
          <div className="bg-white rounded-xl shadow p-4 overflow-hidden">
            {!filters.company ? (
              <div className="text-gray-500 text-center p-10">
                Please select company first
              </div>
            ) : (
              <ItemDetailsBulkTable compId={filters.company} />
            )}
          </div>
        
        ) : (
          // <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="bg-white rounded-xl shadow border flex flex-col">
          {/* <div className="bg-white rounded-xl shadow overflow-x-auto overflow-y-auto max-h-[70vh] border rounded"> */}
            {loading ? (
              <div className="p-20 text-center">
                <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
              </div>
            ) : !sortedData || sortedData.length === 0 ? (
              <div className="p-20 text-center text-gray-500">
                No records found. Check filters or API response.
              </div>
            ) : (
              <div className="flex-1">
              <table className="w-full table-fixed border-collapse text-xs">
              <thead className="bg-gray-100 sticky top-[80px] z-40">
                <tr>
                  {/* {modifiedColumns.map((c) => ( */}
                  {visibleColumns.map((c) => (
                    <th
                      key={c.key}
                      style={{ width: c.width }}
                      onClick={() => handleSort(c.key)}
                      className="px-3 py-3 text-left text-xs  text-gray-700 border-b bg-gray-100"
                    >
                      {c.label}
                      {sortConfig?.key === c.key && (
                        <span className="ml-1">
                          {sortConfig?.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {sortedData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {/* {modifiedColumns.map((c) => ( */}
                    {visibleColumns.map((c) => (
                      <td
                        key={c.key}
                        style={{ width: c.width }}
                        
                        className={`px-3 py-2.5 text-gray-900 border-b  ${
                          (c.type === "currency" )
                            ? "text-right font-medium tabular-nums"
                            : "text-left break-words"
                        }`}
                      >
                        {c.render 
                          ? c.render(row) 
                          : formatCellValue(row[c.key], c.type)
                        }
                      </td>
                    ))}
                    
                  </tr>
                ))}
              </tbody>
              {/* ✅ FOOTER TOTAL - Direct Column Name se "Total" label */}
              {totalColumns.length > 0 && (
                // <tfoot className="bg-gray-100 font-semibold border-t">
                <tfoot className="bg-gray-100 font-semibold border-t sticky bottom-0 z-10">
                  <tr>
                    {modifiedColumns.map((col) => {
                      const isLabelColumn = col.key === footerConfig.labelColumn;

                      return (
                        <td 
                          key={col.key} 
                          className={`px-3 py-2 font-semibold ${
                            (col.type === "currency" || col.type === "number") 
                              ? "text-right tabular-nums" 
                              : "text-left"
                          }`}
                        >
                          {isLabelColumn ? (
                            <span className="font-bold">Total</span>
                          ) : totals[col.key] !== undefined ? (
                            col.type === "currency" 
                              ? new Intl.NumberFormat("en-US", { 
                                  style: "currency", 
                                  currency: "USD", 
                                  minimumFractionDigits: 2, 
                                  maximumFractionDigits: 2 
                                }).format(totals[col.key])
                              : Math.round(totals[col.key]).toLocaleString()
                          ) : ""}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
            </div>
            )}
          </div>
        )}
      </main>
      <ScheduleModal
      show={showSchedule}
      onClose={() => setShowSchedule(false)}
       reportName={report?.name}
       companyName={filters?.company}
       filterData={filters}
    />
    </div>
    
  );
}