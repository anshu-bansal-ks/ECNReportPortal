
// src/components/ReportViewer.tsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Date formatting ke liye
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
LocationSupplierOption,fetchPeriods,PeriodOption,fetchSalsifyMcat,fetchSalsifyScat,fetchItemCategories,
fetchPricePages,fetchTerms,fetchClassNumbers,fetchClassIds,SalsifyMcatOption,SalsifyScatOption,ItemCategoryOption,
PricePageOption,TermsOption,ClassNumberOption,ClassIdOption,fetchPurchaseClass,PurchaseClassOption,fetchProductGroup,
ProductGroupOption,fetchRoles,RolesOption,fetchBuyer,BuyerOption,fetchPriceLibrary,PriceLibraryOption,
fetchRolesReports,RolesReportsOption
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
  const [salsifyMcats, setSalsifyMcats] = useState<SalsifyMcatOption[]>([]);
  const [selectedSalsifyMcat, setSelectedSalsifyMcat] = useState<SalsifyMcatOption | null>(null);
  const [salsifyScats, setSalsifyScats] = useState<SalsifyScatOption[]>([]);
  const [selectedSalsifyScat, setSelectedSalsifyScat] = useState<SalsifyScatOption | null>(null);
  const [itemCategories, setItemCategories] = useState<ItemCategoryOption[]>([]);
  const [selectedItemCategory, setSelectedItemCategory] = useState<ItemCategoryOption | null>(null);
  const [pricePages, setPricePages] = useState<PricePageOption[]>([]);
  const [selectedPricePage, setSelectedPricePage] = useState<PricePageOption | null>(null);
  const [terms, setTerms] = useState<TermsOption[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<TermsOption | null>(null);
  const [classNumbers, setClassNumbers] = useState<ClassNumberOption[]>([]);
  const [selectedClassNumber, setSelectedClassNumber] = useState<ClassNumberOption | null>(null);
  const [classIds, setClassIds] =useState<ClassIdOption[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<ClassIdOption | null>(null);
  const [PurchaseClass, setPurchaseClass] =useState<PurchaseClassOption[]>([]);
  const [selectedPurchaseClass, setSelectedPurchaseClass] = useState<PurchaseClassOption | null>(null);
  const [ProductGroup, setProductGroup] =useState<ProductGroupOption[]>([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState<ProductGroupOption | null>(null);
  const [roles, setRoles] = useState<RolesOption[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<RolesOption | null>(null);
  const [buyer, setBuyer] = useState<BuyerOption[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerOption | null>(null);
  const [pricelibrary, setPriceLibrary] = useState<PriceLibraryOption[]>([]);
  const [selectedPriceLibrary, setSelectedPriceLibrary] = useState<PriceLibraryOption | null>(null);
  const [rolesreports, setRolesReports] = useState<RolesReportsOption[]>([]);
  const [selectedRolesReports, setSelectedRolesReports] = useState<RolesReportsOption | null>(null);
  const [months, setMonths] = useState<any[]>([]);
  const [autoRun, setAutoRun] = useState(false); 
  const [downloading, setDownloading] = useState(false);
  const [grandTotals, setGrandTotals] = useState<Record<string, number>>({});

  const validateFilters = () => {
    
    const missingFields: string[] = [];
    const configFilters = report?.filter_config?.filters || [];
  
    // 1. Pehle normal fields check karein (Company, Customer etc.)
    configFilters.forEach((f) => {
      const isDateRelated = ["fromdate", "tilldate", "timeperiod"].includes(f.name);
      
      // Agar Date related nahi hai aur required hai, toh normal check
      if (!isDateRelated && (f.name === "company" || (f as any).required)) {
        const val = filters[f.name];
        if (!val || val.toString().trim() === "") {
          missingFields.push(f.label || f.name);
        }
      }
    });
  
    // 2. SMART DATE VALIDATION (Credits Issued jaise reports ke liye)
    const hasDateConfig = configFilters.some(f => ["fromdate", "tilldate", "timeperiod"].includes(f.name));
    
    if (hasDateConfig) {
      const hasFromDate = !!filters.fromdate;
      const hasTillDate = !!filters.tilldate;
      const hasPeriod = !!filters.timeperiod;
  
      // Logic: (From aur Till dono hone chahiye) YA (Timeperiod hona chahiye)
      const isDateRangeComplete = hasFromDate && hasTillDate;
      const isPeriodSelected = hasPeriod;
  
      if (!isDateRangeComplete && !isPeriodSelected) {
        missingFields.push("Date Range (From & Till) OR Time Period");
      }
    }
  
    if (missingFields.length > 0) {
      alert(`Required: Please select ${missingFields.join(" and ")}`);
      return false;
    }
    return true;
  };
  
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
  
    return d.toLocaleDateString("en-US",{
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });
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
  if (type === "decimal") {
    return Number(value).toFixed(2);
  }

  return String(value);
};
  const reportKey = report.key || report.name?.toLowerCase().trim();
  const endpoint = report.api_endpoint?.toLowerCase() || "";
  const isThirteenMonthReport = 
    endpoint.includes("thirteenmonthcustomersalesforvendor") || 
    endpoint.includes("thirteenmonthsales") || 
    endpoint.includes("thirteenmonthvendorsalesforcustomer");
    let columns = REPORT_COLUMN_MAP[reportKey] || report?.columns || [];
    const comparison = appliedFilters["ytdcomparison"] || "YTD v LYTD";

    columns = columns.map((col: any) => {
      if (
        reportKey === "salesbysupplierforgroupcodeytdcomparison" &&
        col.key === "SALES_LY"
      ) {
        return {
          ...col,
          label: comparison === "YTD v LY"
            ? "Sales LY"
            : "Sales LYTD"
        };
      }
    
      return col;
    });
if (
  reportKey === "backordersforcustomer" ||
  reportKey === "canceled_items_for_customer" ||
  reportKey === "discitems_for_supplier" ||
  reportKey === "discontinueditemstats" ||
  reportKey === "inventory_levels_cost_for_supplier" ||
  reportKey === "inventory_levels_for_item_prefix" ||
  reportKey === "inventorylevelsallitemswithcost" ||
  reportKey === "saleshistory_for_supplier_by_item_location"
) {
  if (appliedFilters.company?.toUpperCase() === "XG") {
    columns = columns.filter((col: any) => {
      const key = col.key?.toUpperCase();

      return ![
        "NJ",
        "NJ_PO",
        "NJ_QTY",
        "NJ_ON_ORDER",
        "FL",
        "FL_PO",
        "FL_QTY",
        "FL_ON_ORDER",
        "CA",
        "CA_PO",
        "CA_QTY",
        "CA_ON_ORDER"
      ].includes(key);
    });
  } else {
    columns = columns.filter((col: any) => {
      const key = col.key?.toUpperCase();

      return ![
        "PA",
        "PA_PO",
        "PA_QTY",
        "PA_ON_ORDER"
      ].includes(key);
    });
  }
}
if (
  reportKey === "inventory_levels_cost_for_supplier" ||
  reportKey === "inventory_levels_cost_for_supplier_nocost"
) {
  const company = appliedFilters.company?.toUpperCase();

  if (company === "XG") {
    // XG => PA only
    columns = columns.filter((col: any) => {
      const key = col.key?.toUpperCase();
      return !["LV", "NJ", "FL", "CA"].includes(key);
    });

  } else if (company === "ADV") {
    // ADV => LV, NJ, FL, CA
    // PA hide
    columns = columns.filter((col: any) => {
      const key = col.key?.toUpperCase();
      return key !== "PA";
    });

  } else {
    // OTHER => NJ, FL, CA
    // PA + LV hide
    columns = columns.filter((col: any) => {
      const key = col.key?.toUpperCase();
      return !["PA", "LV"].includes(key);
    });
  }
}
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

  const handleRowDrillDown = (
    row: any,
    targetUrl: string,
    queryParam: string,
    keyFields: string[],
    idField?: string,
    extraParams?: Record<string, string>,
    carryFilters?: string[]
  ) => {
  
    const Comp_id = filters.company || "";
  
    // main clicked value
    const targetVal = idField
      ? row[idField]
      : keyFields
          .map(f => row[f])
          .find(v => v !== undefined && v !== null);
  
    if (!targetVal) return;
  
    const separator = targetUrl.includes("?") ? "&" : "?";
  
    // base url
    let finalUrl =
      `${targetUrl}${separator}Comp_id=${encodeURIComponent(Comp_id)}` +
      `&${queryParam}=${encodeURIComponent(targetVal)}`;

    // extra params add
    if (extraParams) {
      Object.entries(extraParams).forEach(([urlParam, rowField]) => {
  
        const extraValue = row[rowField];
  
        if (
          extraValue !== undefined &&
          extraValue !== null &&
          extraValue !== ""
        ) {
          finalUrl +=
            `&${urlParam}=${encodeURIComponent(extraValue)}`;
        }
      });
    }
    carryFilters?.forEach(filterName => {

      const value = filters[filterName];

      if (value) {
          finalUrl += `&${filterName}=${encodeURIComponent(value)}`;
      }
  });
    console.log("FINAL URL:", finalUrl);
  
    window.open(
      finalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };
  
  const modifiedColumns = columns.map((col) => {
  const colKeyLower = col.key.toLowerCase();
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
    const reportKey = apiEndpointLower.split("?")[0].split("/").pop()?.toLowerCase() || "";
    const activeReportConfigKey = Object.keys(DRILL_DOWN_LINKS).find(
      // key => apiEndpointLower.includes(key)
      key => key.toLowerCase() === reportKey
      );

    if (activeReportConfigKey) {
      const rawConfig = DRILL_DOWN_LINKS[activeReportConfigKey];
      // const linkConfigs: any[] = Array.isArray(rawConfig) ? rawConfig : [rawConfig];
      const linkConfigs = Array.isArray(rawConfig) ? rawConfig : [rawConfig];
      const matchedConfig = linkConfigs.find((config: any) => 
        config.keyFields.some((field: string) => field.toLowerCase() === colKeyLower)
      );
      if (matchedConfig) {
        return {
          ...col,
          render: (row: any) => {
            let displayValue = colKeyLower === "notes" 
              ? (col.label || "Notes") 
              : (colKeyLower === "gotostatement" 
              ? "Go to Statement" 
              : (row[col.key] ?? "—"));
            if (displayValue === "—" || displayValue === "") return "—";

            return (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleRowDrillDown(
                    row, 
                    matchedConfig.targetUrl, 
                    matchedConfig.queryParam, 
                    matchedConfig.keyFields, 
                    matchedConfig.idField,
                    matchedConfig.extraParams,
                    matchedConfig.carryFilters
                  );
                }}
                className="text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer"
              >
                {displayValue}
              </a>
            );
          }
        }      
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
  
    const init: Record<string, any> = {};
  
    report.filter_config.filters.forEach((f) => {
      if (f.type === "checkbox") {
        init[f.name] = f.defaultValue === "true" ;
  
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
    const keyMap: Record<string, string> = {
      comp_id: "company", compid: "company",company: "company",
      vendorid: "vendor", vendor_id: "vendor",
      custid: "customer", customerid: "customer", customer_id: "customer",
      repid: "salesrep", salesrepid: "salesrep", salesrep_id: "salesrep",
      payment_no: "payment_no", paymentno: "payment_no",
      timeperiod: "timeperiod",
      period: "timeperiod",
    
      fromdate: "fromdate",
      from_date: "fromdate",
    
      tilldate: "tilldate",
      todate: "tilldate",
      till_date: "tilldate"
    };

    // 2. Loop through all URL parameters
    params.forEach((value, urlKey) => {
      const cleanUrlKey = urlKey.toLowerCase().trim();
      
      // Check karenge ki kya ye key hamare map me defined hai
      const stateKey = keyMap[cleanUrlKey];
      
      if (stateKey && value) {
        newFilters[stateKey] =  decodeURIComponent(value);;
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
  if (!autoRun) return;

  if (!filters.company) return;

  handleApplyFilters();
  setAutoRun(false);

}, [autoRun, filters]);

  useEffect(() => {
    if (!token) return;
    const needsCompany = report?.filter_config?.filters.some((f) => f.name === "company");
    if (!needsCompany) return;
    fetchCompanies(token).then(setCompanies).catch(() => setCompanies([]));
  }, [report, token]);

  useEffect(() => {
    if (!token) return;
    const activeFilters = report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];
    if (activeFilters.includes("roles")) {
      fetchRoles(token, filters.company)
        .then(setRoles)
        .catch(() => setRoles([]));
    }
  }, [report, token, filters.company]);

useEffect(() => {
  if (!token || !filters.company) return;
  const activeFilters = report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  if (activeFilters.includes("buyer")) {
    fetchBuyer(token, filters.company)
      .then(setBuyer)
      .catch(() => setBuyer([]));
  }
}, [report, token, filters.company]);

useEffect(() => {
  if (!token || !filters.company) return;
  const activeFilters = report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  if (activeFilters.includes("pricelibrary")) {
    fetchPriceLibrary(token, filters.company)
      .then(setPriceLibrary)
      .catch(() => setPriceLibrary([]));
  }
}, [report, token, filters.company]);

useEffect(() => {
  if (!token) return;
  const activeFilters = report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  if (activeFilters.includes("rolesreports")) {
    fetchRolesReports(token)
      .then(setRolesReports)
      .catch(() => setRolesReports([]));
  }
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
      .then((data) => {
        setSalesReps(data);
  
        // URL se repId aya hua ho to usko select karo
        if (filters.salesrep) {
          const rep = data.find(
            (x: any) => String(x.value) === String(filters.salesrep)
          );
  
          if (rep) {
            setSelectedSalesRep(rep);
          }
        }
      })
      .catch(() => setSalesReps([]));
  }
  if (activeFilters.includes("show")) {
    fetchShows(token, filters.company).then(setShows);
  }
  if (activeFilters.includes("promo")) {
    fetchPromos(token, filters.company).then(setPromos);
  }
  if (activeFilters.includes("location")) {
    const locType = report?.locationType ?? "WAREHOUSE";
    fetchLocations(token, filters.company,locType).then((data) => {
      setLocations(data);
      const conf = report?.filter_config?.filters.find((f: any) => f.name === "location");
      if (conf?.defaultSelect) {
        const defLoc = data.find((l: any) => l.value === conf.defaultSelect);
        if (defLoc) {
          setSelectedLocation(defLoc); 
          setFilters(prev => ({ ...prev, location: defLoc.value })); 
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

useEffect(() => {

  if (!token) return;

  const activeFilters =
    report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  // MCAT
  if (activeFilters.includes("mcat")) {
    fetchSalsifyMcat(token)
      .then(setSalsifyMcats)
      .catch(() => setSalsifyMcats([]));
  }

  // SCAT only report (without MCAT)
  if (activeFilters.includes("scat") && !activeFilters.includes("mcat")) {
    fetchSalsifyScat(token)
      .then(setSalsifyScats)
      .catch(() => setSalsifyScats([]));
  }

  // Item Category
  if (activeFilters.includes("itemcategory") && filters.company) {
    fetchItemCategories(token, filters.company)
      .then(setItemCategories)
      .catch(() => setItemCategories([]));
  }

  // Terms
  if (activeFilters.includes("terms") && filters.company) {
    fetchTerms(token, filters.company)
      .then(setTerms)
      .catch(() => setTerms([]));
  }

  // Class Number
  if (activeFilters.includes("classnumber") && filters.company) {
    fetchClassNumbers(token, filters.company)
      .then(setClassNumbers)
      .catch(() => setClassNumbers([]));
  }

}, [filters.company, report, token]);

useEffect(() => {

  if (!token) return;

  const activeFilters =
    report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  // Report me SCAT hi nahi hai
  if (!activeFilters.includes("scat")) return;

  // Report me MCAT bhi hai
  if (activeFilters.includes("mcat")) {

    // MCAT select nahi hua
    if (!selectedSalsifyMcat) {
      fetchSalsifyScat(token)
        .then(setSalsifyScats)
        .catch(() => setSalsifyScats([]));
      return;
    }

    // MCAT select ho gaya
    fetchSalsifyScat(token, selectedSalsifyMcat.value)
      .then(setSalsifyScats)
      .catch(() => setSalsifyScats([]));

    return;
  }

  // Report me sirf SCAT hai
  fetchSalsifyScat(token)
    .then(setSalsifyScats)
    .catch(() => setSalsifyScats([]));

}, [token, report, selectedSalsifyMcat]);

useEffect(()=>{

  if(!filters.company) return;
  if(!selectedClassNumber) return;

  fetchClassIds(
     token,
     filters.company,
     selectedClassNumber.value
  )
  .then(setClassIds)
  .catch(()=>setClassIds([]));

},[selectedClassNumber]);

useEffect(() => {
  if (!filters.company || !token) {
    setPurchaseClass([]);
    setSelectedPurchaseClass(null);
    return;
  }

  const activeFilters =
    report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  if (!activeFilters.includes("purchaseclass")) return;

  fetchPurchaseClass(token, filters.company)
    .then(setPurchaseClass)
    .catch(() => setPurchaseClass([]));

}, [filters.company, token, report]);

useEffect(() => {
  if (!filters.company || !token) {
    setProductGroup([]);
    setSelectedProductGroup(null);
    return;
  }

  const activeFilters =
    report?.filter_config?.filters.map((x: any) => x.name.toLowerCase()) || [];

  if (!activeFilters.includes("productgroup")) return;

  fetchProductGroup(token, filters.company)
    .then(setProductGroup)
    .catch(() => setProductGroup([]));

}, [filters.company, token, report]);

useEffect(()=>{

  if(!filters.company) return;
  if(!selectedSupplier) return;

  fetchPricePages(
     token,
     filters.company,
     selectedSupplier.value
  )
  .then(setPricePages)
  .catch(()=>setPricePages([]));

},[selectedSupplier]);

const salesRepFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "salesrep"
);
const supplierFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "supplier"
);
const supplierOpFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "supplierop"
);
const locationFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "location"
);
const locationsupplierFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "locationsupplier"
);
const rolesFilter = report?.filter_config?.filters?.find(
  (f: any) => f.name === "roles"
);
const buyerFilter = report?.filter_config?.filters?.find((
  f: any) => f.name === "buyer"
);
const priceLibraryFilter = report?.filter_config?.filters?.find((
  f: any) => f.name === "pricelibrary"
);
const rolesReportsFilter = report?.filter_config?.filters?.find((
  f: any) => f.name === "rolesreports"
);

const allowSalesRepAll = salesRepFilter?.allowAll === true;
const allowSupplierAll = supplierFilter?.allowAll === true;
const allowSupplierOPAll = supplierOpFilter?.allowAll === true;
const allowLocationAll = locationFilter?.allowAll === true ;
const allowLocationSupplierAll = locationsupplierFilter?.allowAll === true ;
const allowBuyerAll = buyerFilter?.allowAll === true;
const allowPriceLibraryAll = priceLibraryFilter?.allowAll === true;
const allowRolesReportsAll = rolesReportsFilter?.allowAll === true;
const allowRolesAll = rolesFilter?.allowAll === true;
// ✅ NEW: options with ALL conditionally
const salesRepOptions = allowSalesRepAll? [{ value: "ALL", label: "ALL" }, ...salesReps]: salesReps;
const supplierOptions = allowSupplierAll? [{ value: "ALL", label: "ALL" }, ...suppliers]: suppliers;
const supplierOpOptions = allowSupplierOPAll? [{ value: "ALL", label: "ALL" }, ...suppliersOp]: suppliersOp;
const locationOptions = allowLocationAll ? [{ value: "ALL", label: "ALL" }, ...locations] : locations;
const locationsupplierOptions = allowLocationSupplierAll ? [{ value: "ALL", label: "ALL" }, ...locationSuppliers] : locationSuppliers;
const sortedRoles = [...roles].sort((a, b) => {
  if (String(a.label).toUpperCase() === "ALL") return -1;
  if (String(b.label).toUpperCase() === "ALL") return 1;
  return String(a.label).localeCompare(String(b.label));
});

const rolesOptions = allowRolesAll 
  ? [{ value: "ALL_ROLE", label: "ALL Role" }, ...sortedRoles] 
  : sortedRoles;
const buyerOptions = allowBuyerAll ? [{ value: "ALL", label: "ALL" }, ...buyer] : buyer;
const priceLibraryOptions = allowPriceLibraryAll ? [{ value: "ALL", label: "ALL" }, ...pricelibrary] : pricelibrary;
const rolesReportsOptions = allowRolesReportsAll ? [{ value: "ALL", label: "ALL" }, ...rolesreports] : rolesreports;

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
      setSelectedPurchaseClass(null);
      setSelectedProductGroup(null);
      setSelectedRoles(null);
      setSelectedBuyer(null);
      setSelectedPriceLibrary(null);
      setSelectedRolesReports(null);
      setCustomerError("");
      setFilters((prev) => ({
        ...prev,
        vendor: "",
        salesrep: "",
        customer: "",
        show: "",
        promo: "",
        location: "",
        locationsupplier: "",
        purchaseclass: "",
        productgroup: "",
        roles: "",
        buyer: "",
        pricelibrary: "",
        rolesreports: "",
        beginDate: "",

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
    // const isSummary = reportKey.toLowerCase().includes("summary") || reportKey.toLowerCase().includes("totals");
    const usePagination = report?.pagination ?? true;
    Object.entries(filters).forEach(([k, v]) => {
      if (!v) return;
      const filterDef = report.filter_config.filters.find(f => f.name === k);
      const paramName = filterDef?.apiParam || k;
      url.searchParams.append(paramName, v);
    });
    if (!isCustomerInfo && usePagination) {
      url.searchParams.append("pageNumber", pageNum.toString());
      url.searchParams.append("pageSize", PAGE_SIZE.toString());
    }
    const res = await axios.get(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    let newItems = Array.isArray(res.data) ? res.data : (res.data?.data || []);
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
      if (isInitial) {
        setData(newItems);
        if (res.data?.totals) {
          setGrandTotals(res.data.totals);
          console.log("API Totals:", res.data.totals);
      }
        // Agar summary hai toh scroll permanently band
        setHasMore(usePagination && newItems.length === PAGE_SIZE);
      
      } else {
        // Sirf scroll hone par append
        setData((prev) => [...prev, ...newItems]);
        setHasMore(usePagination &&newItems.length === PAGE_SIZE);
      }
    }
    setAppliedFilters({ ...filters });
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
        isFetchingRef.current = false;
    }
  };
  useEffect(() => {
    if (reportKey !== "divisionlookup") return;

    const strfilter = (filters.strfilter || "").trim();

    if (strfilter === "") {
        setData([]);
        setHasMore(false);
        return;
    }

    const timer = setTimeout(() => {
        setPage(1);
        setHasMore(true);
        fetchData(1, true);
    }, 300);

    return () => clearTimeout(timer);

}, [filters.strfilter, reportKey]);
// 🔹 EXCEL EXPORT LOGIC
const handleExport = async (type: "excel" | "pdf") => {
  if (!validateFilters()) return;
  setDownloading(true);
  try {
    const exportUrl = buildApiUrl(`/api/MasterReport/${reportKey}/${type}`);
    
    const footerConfig = FOOTER_TOTAL_CONFIG[reportKey] || { 
      totalColumns: [], 
      labelColumn: undefined 
    };
    const mappedFilters: Record<string, string> = {};
      Object.entries(filters).forEach(([k, v]) => {
        const filterDef = report.filter_config.filters.find(f => f.name === k);
        const paramName = filterDef?.apiParam || k;
        mappedFilters[paramName] =
        typeof v === "boolean" ? String(v) : v;
      });
      const reportTitle = `${report.name} (${buildFilterSummary()})`;
    const payload = {
      reportName: report.name,
      reportTitle: reportTitle,
      compId: filters.company,
      // filters: { ...filters, isExport: "true" },
      filters: { ...mappedFilters, isExport: "true" },
      filterSummary: buildFilterSummary(),
      totalColumns: footerConfig.totalColumns, 
      labelColumn: footerConfig.labelColumn 
    };
    const res = await axios.post(exportUrl, payload, {
      responseType: "blob", // Important for downloading binary files
      headers: { Authorization: `Bearer ${token}` }
    });
    const mimeType = type === "excel" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "application/pdf";
    const blob = new Blob( [res.data], { type: mimeType } );
    
    // 🔹 handleExport ke andar create download link wala part
const generateFormattedFileName = () => {
  const reportName = report.name;
  const parts: string[] = [];

  // 1. Pehle Company ID (ECN, IVD etc.)
  if (filters.company) parts.push(filters.company);

  // 2. Phir baaki filters (Vendor, Customer etc.) agar Date ke alawa kuch hai
  const mainFilter = selectedVendor?.label || selectedCustomer?.label ?.replace(" - AR", "") .trim() || selectedSalesRep?.label || selectedSupplier?.label;
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

  const extension = type === "excel" ? "xlsx" : "pdf";
  return `${reportName}${filterString}.${extension}` .replace(/\s+/g, " "); 
};

const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);

// 🔥 Exactly aapke bataye huye format me download hoga
link.download = generateFormattedFileName();

document.body.appendChild(link);
link.click();
document.body.removeChild(link);
    
  } catch (err) {
    alert(`${type.toUpperCase()} Export failed`);
  } finally {
    setDownloading(false);
  }
};
  const handleApplyFilters = () => {
    if (!validateFilters()) return;
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
  visibleColumns.find(c => c.key === colKey)?.type === "percentage";
});


// 1. FIRST PASS: Saare normal columns aur Gross Profit ka direct SUM
totalColumns.forEach((colKey) => {
  const colKeyLower = colKey.toLowerCase();
  const dbMappedKey = dbTotalKeys[colKey];
  const isPercentageCol = colKeyLower.includes("percent") || 
                          visibleColumns.find(c => c.key === colKey)?.type === "percentage";

  if (dbMappedKey && firstRow[dbMappedKey] !== undefined) {
    totals[colKey] = parseFloat(String(firstRow[dbMappedKey]));
  } 
  else if (!isPercentageCol) {
    totals[colKey] = sortedData.reduce((sum: number, row: any) => {
      const val = parseFloat(String(row[colKey] || "0"));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }
});

// 2. SECOND PASS: Percentage calculation (ADS vs Closeout safe logic)
visibleColumns.forEach((col) => {
  if (!totalColumns.includes(col.key)) return;
  const colKeyLower = col.key.toLowerCase();

  if (col.type === "percentage" || colKeyLower.includes("percent")) {
    if (reportKey === "saleshistory_customer_ytd" || reportKey === "saleshistory_customer_ytd_rep" 
    || reportKey ==="saleshistory_for_supplier_by_customer_ytd_lytd" || reportKey =="saleshistory_rep_ytd" 
    || reportKey ==="ydtvslytdsalesexcludingfreight") {

      const lytdTotal = totals["lytd"] || 0;
      const ytdTotal = totals["ytd"] || 0;
      const changeTotal = totals["Change"] || (ytdTotal - lytdTotal);
  
      if (lytdTotal !== 0) {
          totals[col.key] = (changeTotal / lytdTotal) * 100;
      } else {
          totals[col.key] = 0;
      }
  
      return;
  }
    const salesKey = visibleColumns.find(c => 
      ["total_merch", "sales", "merch", "extended_price"].some(k => c.key.toLowerCase() === k)
    )?.key;
    const costKey = visibleColumns.find(c => 
      ["total_cost", "cost", "cogs"].some(k => c.key.toLowerCase() === k)
    )?.key;
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

const buildFilterSummary = (): string => {

  const parts: string[] = [];

  // Company
  if (filters.company) {

    const companyName =
      companies.find(
        c => c.value === filters.company
      )?.label || filters.company;

    parts.push(companyName.toUpperCase());
  }

  // Customer
  if (
    filters.customer &&
    selectedCustomer?.label
  ) {

    parts.push(
      selectedCustomer.label
        .replace(" - AR", "")
        .trim()
    );
  }

  // Vendor
  if (
    filters.vendor &&
    selectedVendor?.label
  ) {

    parts.push(selectedVendor.label);
  }

  // Supplier
  if (
    filters.supplier &&
    selectedSupplier?.label
  ) {

    parts.push(selectedSupplier.label);
  }

  // Time Period
  if (filters.timeperiod) {

    parts.push(filters.timeperiod);
  }

  // Date Range
  else if (
    filters.fromdate &&
    filters.tilldate
  ) {

    parts.push(
      `${filters.fromdate} To ${filters.tilldate}`
    );
  }

  return parts.join(" - ");
};

  if (!report) return null;

  return (
    <div className="max-h-screen overflow-auto flex flex-col">
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
                disabled={downloading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-sm"
              >
                <FileSpreadsheet size={16} /> 
                {downloading ? "Downloading..." : "Excel"}
              </button>
            )}
            {report.supports_pdf_export && (
              <button
                 onClick={() => handleExport("pdf")}
                
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
      <main>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {report.filter_config.filters.map((f) => {
               if (
                f.hideWhen &&
                filters[f.hideWhen.filter] === f.hideWhen.value
              ) {
                return null;
              }
              // ================== MUTUAL DISABLE LOGIC ==================
              let isDisabled = false;
              const shouldShowLabel = f.hideLabel === false ? true : false;
              const fName = f.name.toLowerCase();

              if (fName === "fromdate" || fName === "tilldate") {
                if (filters.timeperiod) isDisabled = true;
              }
              if (fName === "timeperiod") {
                if (filters.fromdate || filters.tilldate) isDisabled = true;
              }
              return (
              <div key={f.name} className="flex flex-col">
                <div className="min-h-[24px]">
                {shouldShowLabel && f.label && (
                    <label className="block text-xs font-semibold text-gray-600 mb-1 tracking-wider">
                        {f.label}
                    </label>
                )}
            </div>
                {f.type === "select" && f.options && f.options.length > 0 ? (
                  <select
                  value={filters[f.name] !== undefined ? filters[f.name] : (f.defaultValue || "")}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  >
                    {f.showSelectOption === true && (
                      <option value="">
                        {`Select ${f.label}`}
                      </option>
                    )}
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
                ) : f.type === "radio" ? (
                    <div key={f.name} className="flex items-center gap-4 mt-2">
                      {f.options?.map((option: string) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={f.name}
                            value={option}
                            checked={filters[f.name] === option}
                            onChange={(e) => {
                              setFilters((prev: any) => ({
                                ...prev,
                                [f.name]: e.target.value
                              }));
                            }}
                            className="w-4 h-4 cursor-pointer"
                          />
                  
                          <span className="text-sm">
                            {option}
                          </span>
                        </label>
                      ))}
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
                      const obj = locationOptions.find(l => l.value === val) || null;
                      setSelectedLocation(obj);
                      updateFilter("location", val);
                    }}
                  >
                   <option value="">Select Location</option>
                   {locationOptions.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                ): f.name === "locationsupplier" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={!filters.company}
                    value={selectedLocationSupplier?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const obj = locationsupplierOptions.find(l => l.value === val) || null;
                      setSelectedLocationSupplier(obj);
                      updateFilter("locationsupplier", val);
                    }}
                  >
                    <option value="">Select Location</option>
                    {locationsupplierOptions.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                ) : f.name === "mcat" ? (
                    <select
                    value={selectedSalsifyMcat?.value || ""}
                    onChange={(e)=>{
                    
                    const obj=salsifyMcats.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedSalsifyMcat(obj);
                    
                    updateFilter("mcat",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select MCAT</option>
                    
                    {salsifyMcats.map((x, index) => (
                      <option
                        key={`${x.value}-${index}`}
                        value={x.value}
                      >
                        {x.label}
                      </option>
                    ))}
                    
                    </select>
                ) : f.name==="scat" ? (
                    
                  <select
                    value={selectedSalsifyScat?.value||""}
                    onChange={(e)=>{
                    
                    const obj=salsifyScats.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedSalsifyScat(obj);
                    
                    updateFilter("scat",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select SCAT</option>
                    
                    {salsifyScats.map((x, index) => (
                      <option
                        key={`${x.value}-${index}`}
                        value={x.value}
                      >
                        {x.label}
                      </option>
                    ))}
                    
                    </select>
                ) : f.name==="itemcategory" ? (
                    
                   <select
                    value={selectedItemCategory?.value||""}
                    onChange={(e)=>{
                    
                    const obj=itemCategories.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedItemCategory(obj);
                    
                    updateFilter("itemcategory",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Item Category</option>
                    
                    {itemCategories.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                  </select>
                ) : f.name==="pricepage" ? (
                    
                    <select
                    value={selectedPricePage?.value||""}
                    onChange={(e)=>{
                    
                    const obj=pricePages.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedPricePage(obj);
                    
                    updateFilter("pricepage",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Price Page</option>
                    
                    {pricePages.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                    </select>
                ) : f.name==="terms" ? (
                    
                    <select
                    value={selectedTerms?.value||""}
                    onChange={(e)=>{
                    
                    const obj=terms.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedTerms(obj);
                    
                    updateFilter("terms",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Terms</option>
                    
                    {terms.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                    </select>
                ) : f.name==="classnumber" ? (
                    
                    <select
                    value={selectedClassNumber?.value||""}
                    onChange={(e)=>{
                    
                    const obj=classNumbers.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedClassNumber(obj);
                    
                    updateFilter("classnumber",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Class Number</option>
                    
                    {classNumbers.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                    </select>
                ) : f.name==="classid" ? (                   
                  <select
                    value={selectedClassId?.value||""}
                    onChange={(e)=>{
                    
                    const obj=classIds.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedClassId(obj);
                    
                    updateFilter("classid",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Class Id</option>
                    
                    {classIds.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                  </select>
                ) : f.name==="purchaseclass" ? (                   
                  <select
                    value={selectedPurchaseClass?.value||""}
                    onChange={(e)=>{
                    
                    const obj=PurchaseClass.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedPurchaseClass(obj);
                    
                    updateFilter("purchaseclass",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Purchase Class</option>
                    
                    {PurchaseClass.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                  </select>
                ) : f.name==="productgroup" ? (                   
                  <select
                    value={selectedProductGroup?.value||""}
                    onChange={(e)=>{
                    
                    const obj=ProductGroup.find(x=>x.value===e.target.value)||null;
                    
                    setSelectedProductGroup(obj);
                    
                    updateFilter("productgroup",obj?.value||"");
                    
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    
                    <option value="">Select Product Group</option>
                    
                    {ProductGroup.map(x=>
                    
                    <option key={x.value} value={x.value}>
                    {x.label}
                    </option>
                    
                    )}
                    
                  </select>
                ) : f.type === "date" ? (
                  <div className="relative w-full custom-datepicker-container">
                  <DatePicker
                  portalId="root"
                    selected={
                      filters[f.name] 
                        ? new Date(filters[f.name].replace(/-/g, '/')) 
                        : f.defaultValue 
                          ? new Date(f.defaultValue.replace(/-/g, '/')) 
                          : null
                    }
                    onChange={(date: Date | null) => {
                      updateFilter(f.name, date ? format(date, "yyyy-MM-dd") : "");
                    }}
                    placeholderText={f.label?.toUpperCase() || (f.name === "fromdate" ? "FROM DATE" : "TILL DATE")}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" 
                    
                    dateFormat="MM/dd/yyyy"
                    autoComplete="off"
                    disabled={isDisabled}
                    className={`w-full border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      isDisabled ? "bg-gray-100 opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                ) : f.name === "roles" ? (
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!filters.company}
                    value={selectedRoles?.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                
                      const role = rolesOptions.find((r) => r.value === val) || null;
                
                      setSelectedRoles(role);
                      updateFilter("roles", val);
                    }}
                  >
                    <option value="">Select Roles</option>
                
                    {rolesOptions.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  ) : f.name === "buyer" ? (
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!filters.company}
                      value={selectedBuyer?.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const obj = buyerOptions.find((b) => b.value === val) || null;
                        setSelectedBuyer(obj);
                        updateFilter("buyer", val);
                      }}
                    >
                      <option value="">Select Buyer</option>
                      {buyerOptions.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  ) : f.name === "pricelibrary" ? (
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!filters.company}
                      value={selectedPriceLibrary?.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const obj = priceLibraryOptions.find((p) => p.value === val) || null;
                        setSelectedPriceLibrary(obj);
                        updateFilter("pricelibrary", val);
                      }}
                    >
                      <option value="">Select Price Library</option>
                      {priceLibraryOptions.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  ) : f.name === "rolesreports" ? (
                    <select
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      //disabled={!filters.company}
                      value={selectedRolesReports?.value || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const obj = rolesReportsOptions.find((r) => r.value === val) || null;
                        setSelectedRolesReports(obj);
                        updateFilter("rolesreports", val);
                      }}
                    >
                      <option value="">Select Roles Reports</option>
                      {rolesReportsOptions.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                ) : f.type === "month" ? (
                  <div className="relative w-full custom-datepicker-container">
                    <DatePicker
                      portalId="root"
                
                      selected={(() => {
                        const value = filters[f.name];
                
                        if (!value) return null;
                
                        const parts = value.split("/");
                
                        if (parts.length !== 2) return null;
                
                        const month = Number(parts[0]);
                        const year = Number(parts[1]);
                
                        if (
                          !Number.isInteger(month) ||
                          !Number.isInteger(year) ||
                          month < 1 ||
                          month > 12 ||
                          year < 1900
                        ) {
                          return null;
                        }
                
                        return new Date(year, month - 1, 1);
                      })()}
                
                      onChange={(date: Date | null) => {
                        updateFilter(
                          f.name,
                          date ? format(date, "MM/yyyy") : ""
                        );
                      }}
                
                      placeholderText={f.label?.toUpperCase() || "MM/YY"}
                
                      showMonthYearPicker
                      dateFormat="MM/yyyy"
                
                      autoComplete="off"
                      disabled={isDisabled}
                
                      className={`w-full border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDisabled
                          ? "bg-gray-100 opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </div>
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
                  ) :f.type === "number" ? (
                    <input
                        type="number"
                        value={filters[f.name] ?? ""}
                        onChange={(e) => updateFilter(f.name, e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={f.placeholder || ""}
                    />
                ): (
                  <input
                    type="text"
                    value={filters[f.name] || ""}
                    onChange={(e) => updateFilter(f.name, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // placeholder={shouldShowLabel ? (f.placeholder || "") : (f.label || f.placeholder || "")}
                    placeholder={shouldShowLabel ? (f.placeholder || "") : ( f.placeholder || "")}
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
              ) : !customerData ? (
              <div className="p-20 text-center text-gray-500">
                No customer data available. Please select customer and apply filters.
              </div>
            ) : (
              <CustomerInfo data={customerData} />
            )}
          </div>
        ) : isItemDetailsReport ? (
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
          <div className="bg-white rounded-xl shadow border flex flex-col">
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
                      className={`px-3 py-3 text-xs font-semibold text-gray-700 border-b bg-gray-100 cursor-pointer select-none ${                
                        (c.type === "currency" || c.type === "percentage" || c.type === "large_integer" || c.type === "decimal") 
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
                          (c.type === "currency" || c.type === "percentage" || c.type === "large_integer" ||  c.type === "decimal")
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
              {/*  FOOTER TOTAL - Direct Column Name se "Total" label */}
              {totalColumns.length > 0 && (
                <tfoot className="bg-gray-100 font-semibold border-t sticky bottom-0 z-10">
                  <tr>
                    {visibleColumns.map((col:any) => {
                      const isLabelColumn = col.key === footerConfig.labelColumn;

                      // API Total ko preference do, warna UI Total use karo
                      const totalValue =
                        grandTotals?.[col.key] !== undefined
                          ? grandTotals[col.key]
                          : totals?.[col.key];

                      return (
                        <td
                          key={col.key}
                          className={`px-3 py-2 font-semibold ${
                            col.type === "currency" ||
                            col.type === "number" ||
                            col.type === "percentage" ||
                            col.type === "decimal" ||
                            col.type === "large_integer"
                              ? "text-right tabular-nums"
                              : "text-left"
                          }`}
                        >
                          {isLabelColumn ? (
                            <span className="font-bold">Total</span>
                          ) : totalValue !== undefined ? (
                            col.type === "percentage" ? (
                              `${Number(totalValue).toFixed(1)}%`
                            ) : col.type === "currency" ? (
                              new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(Number(totalValue))
                            ) : col.type === "decimal" ? (
                              Number(totalValue).toFixed(2)
                            ): (
                              Math.round(Number(totalValue)).toLocaleString()
                            )
                          ) : (
                            ""
                          )}
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