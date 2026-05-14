
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
import { REPORT_COLUMN_MAP,FOOTER_TOTAL_CONFIG,DRILL_DOWN_LINKS } from "../config/reportColumns";
import ScheduleModal from "./ScheduleModal";

import {fetchCompanies,fetchVendors,fetchSalesReps,fetchSuppliers,fetchSuppliersop, fetchCustomers,
validateCustomer,CompanyOption,VendorOption,SalesRepOption,CustomerOption,SupplierOption, SupplierOpOption,
fetchShows,fetchPromos,fetchLocations,fetchLocationSupplier,ShowOption,PromoOption,LocationOption,
LocationSupplierOption,fetchPeriods,PeriodOption
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
  const [data, setData] = useState<any[]>([]);
  const [customerData, setCustomerData] = useState<CustomerApiResponse | null>(null); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 100;
  const isFetchingRef = useRef(false); 
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
  const [periodOptions, setPeriodOptions] = useState<PeriodOption[]>([]);
  const [months, setMonths] = useState<any[]>([]);
  const [autoRun, setAutoRun] = useState(false); 
  const [downloading, setDownloading] = useState(false);
  
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

const companyOptions = companies.filter((c) => {
  if (!companyFilter?.show) return true;
  if (companyFilter.show === "ALL") return true;
  const allowed = companyFilter.show
  .split(",")
  .map((x: string) => x.trim().toUpperCase());

return allowed.includes(c.value.toUpperCase());
});

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
  if (type === "large_number" || type === "large_integer") {
    return new Intl.NumberFormat("en-US").format(Math.round(num));
  }
  if (type === "number" || type === "integer") {
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
    return num.toFixed(1) + "%";
  }

  return String(value);
};
  const reportKey = report.key || report.name?.toLowerCase().trim();
  const isThirteenMonthReport = report.api_endpoint?.toLowerCase().includes("thirteenmonthcustomersalesforvendor");
  let columns = REPORT_COLUMN_MAP[reportKey] || report?.columns || [];
 
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
            .replace(/\s+\d+$/, '')   
            .replace(/\s+/g, '-')       
            .toUpperCase();
        }

        return { ...col, label: cleanLabel };
      }
      return col;
    });
  }

  const handleRowDrillDown = (row: any,targetUrl: string, queryParam: string, keyFields: string[],idField?: string) => {
    const Comp_id = filters.company || "";
    //const targetIdField = keyFields.find(field => row[field] !== undefined && row[field] !== null);
    //const targetVal = targetIdField ? row[targetIdField] : null;
    const targetVal = idField 
        ? row[idField] 
        : keyFields.map(f => row[f]).find(v => v !== undefined && v !== null);

    if (targetVal) {
      const separator = targetUrl.includes("?") ? "&" : "?";
    const finalUrl = `${targetUrl}${separator}Comp_id=${Comp_id}&${queryParam}=${targetVal}`;
    window.open(
      finalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }
  };
  
  const modifiedColumns = columns.map((col) => {
    const colKeyLower = col.key.toLowerCase();

  // ✅ A. UPS TRACKING LOGIC (Saari reports ke liye universal)
  if (colKeyLower === "tracking_no") {
    return {
      ...col,
      render: (row: any) => {
        const tNo = row[col.key];
        if (!tNo || tNo === "—" || tNo === "") return "—";
        
        return (
          <a
            href={`https://wwwapps.ups.com/etracking/tracking.cgi?InquiryNumber1=${tNo.toString().trim()}&TypeOfInquiryNumber=T&AcceptUPSLicenseAgreement=yes&submit=Track`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer"
          >
            {tNo}
          </a>
        );
      }
    };
  }
    const apiEndpointLower = report.api_endpoint?.toLowerCase() || "";
    //const colKeyLower = col.key.toLowerCase();

    // 1. Check karenge ki kya active report ke liye koi route mapping config file me hai
    const activeReportConfigKey = Object.keys(DRILL_DOWN_LINKS).find(key => apiEndpointLower.includes(key));

    if (activeReportConfigKey) {
      const linkConfig = DRILL_DOWN_LINKS[activeReportConfigKey];

      // 2. Check karenge ki kya is active column par click trigger lagana hai
      const isLinkableColumn = linkConfig.keyFields.some(field => field.toLowerCase() === colKeyLower);

      if (isLinkableColumn) {
        return {
          ...col,
          render: (row: any) => {
            const targetKey = linkConfig.keyFields.find(f => row[f] !== undefined);
            const displayValue = targetKey ? row[targetKey] : "—";

            return (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleRowDrillDown(row, linkConfig.targetUrl, linkConfig.queryParam, linkConfig.keyFields,linkConfig.idField);
                }}
                className="text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer"
              >
                {displayValue}
              </a>
            );
          }
        };
      }
    }
    return col;
  });

  const isCustomerInfo = report.api_endpoint?.toLowerCase().includes("customerinfo");
  const isItemDetailsReport =report.api_endpoint?.toLowerCase().includes("itemdetails"); 
  
  const tableData = isCustomerInfo ? [] : (Array.isArray(data) ? data : []);
  const visibleColumns = getVisibleColumns(modifiedColumns, filters);
  const { sortedData, sortConfig, handleSort } = useTableSorting(tableData, visibleColumns);

  useEffect(() => {
    if (!token) return;
    fetchPeriods(token).then(setPeriodOptions).catch(() => setPeriodOptions([]));
  }, [token]);
  
  useEffect(() => {
    if (!report?.filter_config?.filters) return;
    if (Object.keys(filters).length > 0 && filters.company) return; 
  
    const init: Record<string, string> = {};
    report.filter_config.filters.forEach((f) => {
      // 🔥 Agar config me defaultValue (jaise 'ALL') di hai, toh blank ke bajaye wahi assign karein
      if (f.type === "checkbox") {
        init[f.name] = "false";
      } else {
        init[f.name] = f.defaultValue || ""; 
      }
    });
    setFilters(init);
  }, [report.key]);

// 📂 Path: src/components/ReportViewer.tsx

useEffect(() => {
  const params = new URLSearchParams(location.search);
  
  if (params.size > 0) {
    const newFilters: Record<string, string> = {};
    let hasValidParams = false;

    // 1. Dynamic Parameter Mapping Dictionary
    // URL me kuch bhi aaye (Left side), wo hamare state key (Right side) par bind ho jayega
    const keyMap: Record<string, string> = {
      comp_id: "company", compid: "company",company: "company",
      vendorid: "vendor", vendor_id: "vendor",
      custid: "customer", customerid: "customer", customer_id: "customer",
      repid: "salesrep", salesrepid: "salesrep", salesrep_id: "salesrep",
      payment_no: "payment_no", paymentno: "payment_no",
    };

    // 2. Loop through all URL parameters
    params.forEach((value, urlKey) => {
      const cleanUrlKey = urlKey.toLowerCase().trim();
      
      // Check karenge ki kya ye key hamare map me defined hai
      const stateKey = keyMap[cleanUrlKey];
      
      if (stateKey && value) {
        newFilters[stateKey] = value;
        hasValidParams = true;

        // 3. Dropdowns ko bhi automatically state parameters ke sath update karo
        if (stateKey === "vendor") {
          setSelectedVendor({ value, label: value });
        } else if (stateKey === "customer") {
          setSelectedCustomer({ value, label: value });
        } else if (stateKey === "salesrep") {
          setSelectedSalesRep({ value, label: value });
        }
      }
    });

    // 4. Agar koi valid parameters mile, toh state set karke auto-run execute karo
    if (hasValidParams) {
      setFilters((prev) => ({
        ...prev,
        ...newFilters
      }));
      
      setAutoRun(true);
    }
  }
}, [location.search]);

useEffect(() => {
  if (autoRun) {
    handleApplyFilters();
    setAutoRun(false);
  }
}, [autoRun]);

  useEffect(() => {
    if (!token) return;
    const needsCompany = report?.filter_config?.filters.some((f) => f.name === "company");
    if (!needsCompany) return;
    fetchCompanies(token).then(setCompanies).catch(() => setCompanies([]));
  }, [report, token]);

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

  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  if (activeFilters.includes("salesrep")) {
    fetchSalesReps(token, filters.company, "")
      .then(setSalesReps)
      .catch(() => setSalesReps([]));
  }
  if (activeFilters.includes("show")) {
    fetchShows(token, filters.company).then(setShows);
  }
  if (activeFilters.includes("promo")) {
    fetchPromos(token, filters.company).then(setPromos);
  }
  // if (activeFilters.includes("location")) {
  //   fetchLocations(token, filters.company).then(setLocations);
  // }
  if (activeFilters.includes("location")) {
    fetchLocations(token, filters.company).then((data) => {
      setLocations(data);

      // 🔥 YE CHAR LINE ADD KARNI HAI (Line 268-275 ke beech):
      const conf = report?.filter_config?.filters.find((f: any) => f.name === "location");
      if (conf?.defaultSelect) {
        const defLoc = data.find((l: any) => l.value === conf.defaultSelect);
        if (defLoc) {
          setSelectedLocation(defLoc); // UI par dropdown mein dikhega
          setFilters(prev => ({ ...prev, location: defLoc.value })); // API ke liye value set hogi
        }
      }
    });
  }
  if (activeFilters.includes("locationsupplier")) {
    fetchLocationSupplier(token, filters.company).then(setLocationSuppliers);
  }
}, [filters.company, token, report]); 

useEffect(() => {
  if (!filters.company || !token) {
    setSuppliers([]);
    setSelectedSupplier(null);
    return;
  }

  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  if (activeFilters.includes("supplier")) {
    fetchSuppliers(token, filters.company, "")
      .then(setSuppliers)
      .catch(() => setSuppliers([]));
  }
}, [filters.company, token, report]);

useEffect(() => {
  if (!filters.company || !token) {
    setSuppliersOp([]);
    setSelectedSupplierOp(null);
    return;
  }

  const activeFilters = report?.filter_config?.filters.map((f: any) => f.name.toLowerCase()) || [];

  if (activeFilters.includes("supplierop")) {
    fetchSuppliersop(token, filters.company, "")
      .then(setSuppliersOp)
      .catch(() => setSuppliersOp([]));
  }
}, [filters.company, token, report]);

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
const salesRepOptions = allowSalesRepAll? [{ value: "ALL", label: "ALL" }, ...salesReps]: salesReps;
const supplierOptions = allowSupplierAll? [{ value: "ALL", label: "ALL" }, ...suppliers]: suppliers;
const supplierOpOptions = allowSupplierOPAll? [{ value: "ALL", label: "ALL" }, ...suppliersOp]
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
  // 🔹 DATA FETCH LOGIC
const fetchData = async (pageNum: number, isInitial = false) => {
  if (!report) return;
  if (isFetchingRef.current) return;
  if (isCustomerInfo && !isInitial) return;
  isFetchingRef.current = true;
  if (isInitial) {
    setLoading(true);
    setData([]);
  }

  try {
  
    const url = new URL(buildApiUrl(`/api/MasterReport/${reportKey}`));
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
      else if (k === "startperiod") paramName = "startperiod";
      else if (k === "endperiod") paramName = "endperiod";
      url.searchParams.append(paramName, v);
    });
    if (!isCustomerInfo) {
      url.searchParams.append("pageNumber", pageNum.toString());
      url.searchParams.append("pageSize", PAGE_SIZE.toString());
    }
    const res = await axios.get(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    let newItems: any[] = [];
    if (isCustomerInfo) { 
      setCustomerData(res.data);
      setData([]);
      setHasMore(false);
    } else if (isThirteenMonthReport) {
      newItems = res.data.data || [];
      setData(newItems);
      setHasMore(false);
      if (isInitial && res.data?.months) setMonths(res.data.months);
    } else {
      newItems = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      if (isInitial) setData(newItems);
      else setData((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length === PAGE_SIZE);
    }
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
      filters: { ...filters, isExport: "true" },
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
    fetchData(1, true); 
  };
  useEffect(() => {
    const handleScroll = (e: any) => {
      if (isCustomerInfo || isItemDetailsReport|| loading || !hasMore) return;

      const target = e.target as HTMLElement;
      if (target.classList.contains('overflow-auto') || target.tagName === 'DIV') {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        
        if (scrollHeight - scrollTop <= clientHeight + 100 ) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchData(nextPage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll,true);
    return () => window.removeEventListener("scroll", handleScroll , true);
  }, [loading, hasMore, page,isCustomerInfo]);
  
  
// ✅ FOOTER CONFIG with column name support
const footerConfig = FOOTER_TOTAL_CONFIG[reportKey] || { 
  totalColumns: [], 
  labelColumn: undefined ,
  dbTotalKeys: {} // new
};

const totalColumns = footerConfig.totalColumns || [];
const dbTotalKeys = footerConfig.dbTotalKeys || {};
const totals: Record<string, number> = {};
const firstRow = sortedData[0] || {};
totalColumns.forEach((colKey) => {
  const dbMappedKey = dbTotalKeys[colKey]; 
  const colKeyLower = colKey.toLowerCase();
  const isPercentageCol = colKeyLower.includes("percent") || 
  visibleColumns.find(c => c.key === colKey)?.type === "percentage";
  if (dbMappedKey && firstRow[dbMappedKey] !== undefined && firstRow[dbMappedKey] !== null) {
    totals[colKey] = parseFloat(String(firstRow[dbMappedKey]));
  }   else if (!isPercentageCol) {
    totals[colKey] = sortedData.reduce((sum: number, row: any) => {
      const val = parseFloat(String(row[colKey] || "0"));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }
});


// 1. FIRST PASS: Saare normal columns aur Gross Profit ka direct SUM
// (ADS aur Closeout dono ke liye numeric columns yahan sum honge)
totalColumns.forEach((colKey) => {
  const colKeyLower = colKey.toLowerCase();
  const dbMappedKey = dbTotalKeys[colKey];

  // Percentage ko skip karenge kyunki ye aggregate logic se calculate hoga
  const isPercentageCol = colKeyLower.includes("percent") || 
                          visibleColumns.find(c => c.key === colKey)?.type === "percentage";

  if (dbMappedKey && firstRow[dbMappedKey] !== undefined) {
    totals[colKey] = parseFloat(String(firstRow[dbMappedKey]));
  } 
  else if (!isPercentageCol) {
    // 🔥 Qty, Sales, Cost, Gross Profit, Total Ship etc. sab yahan sum honge
    totals[colKey] = sortedData.reduce((sum: number, row: any) => {
      const val = parseFloat(String(row[colKey] || "0"));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }
});

// 2. SECOND PASS: Percentage calculation (ADS vs Closeout safe logic)
visibleColumns.forEach((col) => {
  const colKeyLower = col.key.toLowerCase();

  if (col.type === "percentage" || colKeyLower.includes("percent")) {
    
    // 🔥 ADS ke liye 'total_merch' aur Closeout ke liye 'sales' dhoondna
    const salesKey = visibleColumns.find(c => 
      ["total_merch", "sales", "merch", "extended_price"].some(k => c.key.toLowerCase() === k)
    )?.key;
    
    // 🔥 ADS ke liye 'total_cost' aur Closeout ke liye 'cost' dhoondna
    const costKey = visibleColumns.find(c => 
      ["total_cost", "cost", "cogs"].some(k => c.key.toLowerCase() === k)
    )?.key;

    // Gross Profit key (agar column mein direct GP hai toh wo use karo, warna Sales-Cost karo)
    const profitKey = visibleColumns.find(c => 
      ["gross_profit", "gross", "profit_amt", "gp"].some(k => c.key.toLowerCase() === k)
    )?.key;

    const sTotal = salesKey ? (totals[salesKey] || 0) : 0;
    const cTotal = costKey ? (totals[costKey] || 0) : 0;
    const pTotal = profitKey ? (totals[profitKey] || 0) : (sTotal - cTotal);

    // Final Percentage Math: (Total Profit / Total Sales) * 100
    if (sTotal !== 0) {
      totals[col.key] = (pTotal / sTotal) * 100;
    } else {
      totals[col.key] = 0;
    }
  }
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
                {f.type === "select" && f.options && f.options.length > 0 ? (
                  <select
                  value={filters[f.name] !== undefined ? filters[f.name] : (f.defaultValue || "")}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  >
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ): f.name === "company" ? (
                  <select
                    value={filters.company || ""}
                    onChange={(e) => updateFilter("company", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
                  key={`vendor-${filters.company}`}
                    cacheOptions
                    defaultOptions={false}
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
                  <div className="flex flex-col w-full">
                    <AsyncSelect
                    key={`customer-${filters.company}`}
                      cacheOptions
                      defaultOptions={false}
                      isClearable
                      isDisabled={!filters.company}
                      value={selectedCustomer}
                      menuPortalTarget={document.body} 
                      menuPosition={'fixed'}
                      styles={{ 
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                        menu: base => ({ ...base, zIndex: 9999 }) 
                      }}
                      loadOptions={(input) => fetchCustomers(token, filters.company, input)}
                      onChange={(v: CustomerOption | null) => {
                        setSelectedCustomer(v);
                        updateFilter("customer", v?.value || "");
                      }}
                      onBlur={handleCustomerBlur}
                      placeholder="Search customer..."
                    />
                    {customerError && <p className="text-red-500 text-xs mt-1">{customerError}</p>}
                    </div>
                ) : f.type === "checkbox" ? (
                  <div key={f.name} className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={f.name} 
                      name={f.name}
                      checked={!!filters[f.name]} 
                      onChange={(e) => {
                        setFilters((prev: any) => ({ ...prev, [f.name]: e.target.checked }));
                      }}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor={f.name} 
                      className="cursor-pointer select-none text-sm"
                    >
                      {f.label}
                    </label>
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
               ) : f.type === "periodStart" ? (
                <div className="flex flex-col gap-1">
                  <select
                    disabled={isDisabled}
                    value={filters.startperiod || ""}
                    onChange={(e) => updateFilter("startperiod", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-sm"
                  >
                    <option value="">Select Start Period</option>
                    {periodOptions.map((p) => (
                      <option key={`start-${p.startDate}`} value={p.startDate}>{p.periodName}</option>
                    ))}
                  </select>
                </div> 
                ) : f.type === "periodEnd" ? (
                  <div className="flex flex-col gap-1">
                    <select
                      disabled={isDisabled}
                      value={filters.endperiod || ""}
                      onChange={(e) => updateFilter("endperiod", e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-sm"
                    >
                      <option value="">Select End Period</option>
                      {periodOptions.map((p) => (
                        <option key={`end-${p.endDate}`} value={p.endDate}>{p.periodName}</option>
                      ))}
                    </select>
                  </div>
                ): (
                  <input
                    type="text"
                    value={filters[f.name] || ""}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={f.placeholder ||`Enter ${f.label?.toLowerCase() || f.name}`}
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
                      //className="px-3 py-3 text-left text-xs  text-gray-700 border-b bg-gray-100"
                      className={`px-3 py-3 text-xs font-semibold text-gray-700 border-b bg-gray-100 cursor-pointer select-none ${
                        // 🔥 Agar type currency ya percentage hai, toh header right mein hoga, nahi toh left mein
                        (c.type === "currency" || c.type === "percentage" || c.type === "large_integer") 
                          ? "text-right" 
                          : "text-left"
                      }`}
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
                          (c.type === "currency" || c.type === "percentage" || c.type === "large_integer")
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
                            (col.type === "currency" || col.type === "number"|| col.type === "percentage" || col.type === "large_integer") 
                              ? "text-right tabular-nums" 
                              : "text-left"
                          }`}
                        >
                          {isLabelColumn ? (
                            <span className="font-bold">Total</span>
                          ) : totals[col.key] !== undefined ? (
                            col.type === "percentage" 
                            ? totals[col.key].toFixed(1) + "%"
                            : col.type === "currency" 
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