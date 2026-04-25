//lib/drpdownapi
import axios from "axios";

const API_BASE = "http://localhost:5278";

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
  
// Fetch companies
export const fetchCompanies = async (token: string): Promise<CompanyOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/companies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const allowed = ["ADV", "IVD", "ECN", "XG"];
  return Array.isArray(res.data)
    ? res.data.filter((c: CompanyOption) => allowed.includes(c.value))
    : [];
};

// Fetch vendors
export const fetchVendors = async (
  token: string,
  companyId: string,
  search: string
): Promise<VendorOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/vendors`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((v: any) => ({ value: String(v.vendor_id), label: `${v.vendor_name} (${v.vendor_id})` }))
    : [];
};

// Fetch sales reps
export const fetchSalesReps = async (
  token: string,
  companyId: string,
  search: string
): Promise<SalesRepOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/salesreps`, {
    params: { compId: companyId, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return Array.isArray(res.data)
    ? res.data.map((s: any) => ({ value: String(s.value), label: s.label }))
    : [];
};

// 🔹 Fetch suppliers (NEW)
export const fetchSuppliers = async (
  token: string,
  companyId: string,
  search: string
): Promise<SupplierOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/suppliers`, {
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

// 🔹 Search Customers
export const fetchCustomers = async (
  token: string,
  companyId: string,
  search: string
): Promise<CustomerOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/customers`, {
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

// 🔹 Validate Customer ID
export const validateCustomer = async (
  token: string,
  companyId: string,
  customerId: string
) => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/customers/validate`, {
    params: { compId: companyId, custId: customerId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data?.length > 0 ? res.data[0] : null;
};

// 🔹 Fetch suppliersop (NEW)
export const fetchSuppliersop = async (
  token: string,
  companyId: string,
  search: string
): Promise<SupplierOpOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/suppliers/op`, {
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
  const res = await axios.get(`${API_BASE}/api/Dropdown/shows`, {
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
  const res = await axios.get(`${API_BASE}/api/Dropdown/promos`, {
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
  companyId: string
): Promise<LocationOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/locations`, {
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

export const fetchLocationSupplier = async (
  token: string,
  companyId: string
): Promise<LocationSupplierOption[]> => {
  const res = await axios.get(`${API_BASE}/api/Dropdown/location-supplier`, {
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