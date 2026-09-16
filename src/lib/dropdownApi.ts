//lib/drpdownapi
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface CompanyOption {
  value: string;
  label: string;
  
}

export interface VendorOption {
  value: string;
  label: string;
}

export interface SalesRepOption {
  value: string;
  label: string;
}

export interface CustomerOption {
    value: string;
    label: string;
  }

  export interface SupplierOption {
    value: string;
    label: string;
  }
  export interface SupplierOpOption {
    value: string;
    label: string;
  }
  export interface ShowOption {
    value: string;
    label: string;
  }
  export interface PromoOption {
    value: string;
    label: string;
  }
  export interface LocationOption {
    value: string;
    label: string;
  }
  export interface LocationSupplierOption {
    value: string;
    label: string;
  }
  export interface PeriodOption {
    periodName: string;
    startDate: string;
    endDate: string;
  }
  export interface SalsifyMcatOption {
    value: string;
    label: string;
  }
  
  export interface SalsifyScatOption {
    value: string;
    label: string;
  }
  
  export interface ItemCategoryOption {
    value: string;
    label: string;
  }
  
  export interface PricePageOption {
    value: string;
    label: string;
  }
  
  export interface TermsOption {
    value: string;
    label: string;
  }
  
  export interface ClassNumberOption {
    value: string;
    label: string;
  }
  
  export interface ClassIdOption {
    value: string;
    label: string;
  }

  export interface PurchaseClassOption {
    value: string;
    label: string;
  }

  export interface ProductGroupOption {
    value: string;
    label: string;
  }
  export interface RolesOption {
    value: string;
    label: string;
  }
  export interface BuyerOption {
    value: string;
    label: string;
  }
  export interface PriceLibraryOption {
    value: string;
    label: string;
  }
  export interface RolesReportsOption {
    value: string;
    label: string;
  }
  export interface BrandOption {
    value: string;
    label: string;
  }
 
export const fetchCompanies = async (token: string): Promise<CompanyOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/companies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const allowed = ["ADV", "IVD", "ECN", "XG"];
  return Array.isArray(res.data)
    ? res.data.filter((c: CompanyOption) => allowed.includes(c.value))
    : [];
};

export const fetchVendors = async (
  token: string,
  companyId: string,
  search: string
): Promise<VendorOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/vendors`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((v: any) => ({ value: String(v.vendor_id), label: `${v.vendor_name} (${v.vendor_id})` }))
    : [];
};

export const fetchSalesReps = async (
  token: string,
  companyId: string,
  search: string
): Promise<SalesRepOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/salesreps`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((s: any) => ({ value: String(s.value), label: s.label }))
    : [];
};

export const fetchSuppliers = async (
  token: string,
  companyId: string,
  search: string
): Promise<SupplierOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/suppliers`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((s: any) => ({
        value: String(s.supplier_id),
        label: `${s.supplier_name} (${s.supplier_id})`,
      }))
    : [];
};

export const fetchCustomers = async (
  token: string,
  companyId: string,
  search: string
): Promise<CustomerOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/customers`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((c: any) => ({
        value: String(c.customer_id),
        label: `${c.customer_name} (${c.customer_id}) - ${c.phys_state}`,
      }))
    : [];
};

export const validateCustomer = async (
  token: string,
  companyId: string,
  customerId: string
) => {
  const res = await axios.get(`${API_BASE}/Dropdown/customers/validate`, {
    params: { compId: companyId, custId: customerId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data?.length > 0 ? res.data[0] : null;
};

export const fetchSuppliersop = async (
  token: string,
  companyId: string,
  search: string
): Promise<SupplierOpOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/suppliers/op`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((s: any) => ({
        value: String(s.supplier_id),
        label: `${s.supplier_name} (${s.supplier_id})`,
      }))
    : [];
};

export const fetchShows = async (
  token: string,
  companyId: string
): Promise<ShowOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/shows`, {
    params: { compId: companyId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((s: any) => ({
        value: s.value,
        label: s.label,
      }))
    : [];
};

export const fetchPromos = async (
  token: string,
  companyId: string
): Promise<PromoOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/promos`, {
    params: { compId: companyId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((p: any) => ({
        value: p.value,
        label: p.label,
      }))
    : [];
};

export const fetchLocations = async (
  token: string,
  companyId: string,
  locType: string = "WAREHOUSE"
): Promise<LocationOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/locations`, {
    params: { compId: companyId,locType: locType },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((l: any) => ({
        value: l.value,
        label: l.label,
      }))
    : [];
};

export const fetchLocationSupplier = async (
  token: string,
  companyId: string
): Promise<LocationSupplierOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/location-supplier`, {
    params: { compId: companyId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((l: any) => ({
        value: l.value,
        label: l.label,
      }))
    : [];
};

export const fetchPeriods = async (token: string): Promise<PeriodOption[]> => {
  const res = await axios.get(`${API_BASE}/Dropdown/periods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data) ? res.data : [];
};

export const fetchSalsifyMcat = async (
  token: string
): Promise<SalsifyMcatOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/salsify/mcat`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.mcat,
        label: x.mcat,
      }))
    : [];
};

export const fetchSalsifyScat = async (
  token: string,
  mcat?: string
): Promise<SalsifyScatOption[]> => {

  const params: any = {};

  if (mcat && mcat.trim() !== "") {
    params.mcat = mcat;
  }

  const res = await axios.get(`${API_BASE}/Dropdown/salsify/scat`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.scat,
        label: x.scat,
      }))
    : [];
};

export const fetchItemCategories = async (
  token: string,
  companyId: string
): Promise<ItemCategoryOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/itemcategories`, {
    params: { compId: companyId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchPricePages = async (
  token: string,
  companyId: string,
  supplierId: string
): Promise<PricePageOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/pricepages`, {
    params: {
      compId: companyId,
      supplierId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchTerms = async (
  token: string,
  companyId: string
): Promise<TermsOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/terms`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchClassNumbers = async (
  token: string,
  companyId: string
): Promise<ClassNumberOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/classnumbers`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchClassIds = async (
  token: string,
  companyId: string,
  classNumber: string
): Promise<ClassIdOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/classid`, {
    params: {
      compId: companyId,
      classNumber,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchPurchaseClass = async (
  token: string,
  companyId: string
): Promise<PurchaseClassOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/purchaseclass`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchProductGroup = async (
  token: string,
  companyId: string
): Promise<ProductGroupOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/productgroup`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchRoles = async (
  token: string,
  companyId: string
): Promise<RolesOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/roles`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchBuyer = async (
  token: string,
  companyId: string
): Promise<BuyerOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/buyer`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchPriceLibrary = async (
  token: string,
  companyId: string
): Promise<PriceLibraryOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/pricelibrary`, {
    params: {
      compId: companyId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchRolesReports = async (
  token: string
): Promise<RolesReportsOption[]> => {

  const res = await axios.get(`${API_BASE}/Dropdown/rolesrepots`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.value,
        label: x.label,
      }))
    : [];
};

export const fetchSupplierCustomerBrands = async (
  token: string,
  companyId: string,
  supplierId: string
): Promise<BrandOption[]> => {
  if (!companyId || !supplierId) return [];

  const res = await axios.get(`${API_BASE}/Dropdown/suppliercustomerbrands`, {
    params: {
      compId: companyId,
      supplierId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Array.isArray(res.data)
    ? res.data.map((x: any) => ({
        value: x.str_brandCode || x.value,
        label: x.str_brandName
          ? `${x.str_brandName} (${x.str_brandCode})`
          : (x.str_brandCode || x.value),
      }))
    : [];
};