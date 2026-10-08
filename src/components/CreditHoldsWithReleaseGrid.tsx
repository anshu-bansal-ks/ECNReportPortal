import { useState } from "react";
import axios from "axios";
import { buildApiUrl } from "../lib/supabase";
import { showToast } from "../lib/toast";

interface CreditHoldRow {
  comp_id: string;
  customer_id: string;
  customer_name: string;
  terms_desc: string;
  orderHeaderTerms: string;
  credit_limit: number | string;
  credit_status: string;
  order_no: string;
  order_date: string;
  order_total: number | string;
  salesrep: string;
  Time_In_Q: number | string;
  b1: number | string;
  b2: number | string;
  b3: number | string;
  b4: number | string;
  tot: number | string;
  url?: string;
}

interface Props {
  data: Record<string, CreditHoldRow[]> | null;
  onRefresh?: () => void;
}

const COMPANY_TITLES: Record<string, string> = {
  ECN: "ECN Accounts",
  ADV: "Adventure Accounts",
  ADVENTURE: "Adventure Accounts",
  XG: "XGEN Accounts",
  XGEN: "XGEN Accounts",
  IVD: "IVD Accounts",
};

const getGroupTitle = (id: string) =>
  COMPANY_TITLES[(id || "").toUpperCase()] || `${id} Accounts`;

const fmtCurrency = (v: any) => {
  const n = parseFloat(v);
  if (isNaN(n)) return "$0.00";
  const f = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(Math.abs(n));
  return n < 0 ? `(${f})` : f;
};

const fmtNumber = (v: any) => {
  const n = parseFloat(v);
  return isNaN(n) ? "0" : new Intl.NumberFormat("en-US").format(Math.round(n));
};

const fmtDate = (v: any) => {
  if (!v) return "";
  const d = new Date(v);
  return isNaN(d.getTime()) ? String(v)
    : d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
};

const buildTerms = (r: CreditHoldRow) => {
  const t = (r.orderHeaderTerms || r.terms_desc || "").trim();
  const s = (r.credit_status || "").trim();
  if (!s) return t;
  if (!t) return s;
  return `${t} / ${s}`;
};

export default function CreditHoldsWithReleaseGrid({ data, onRefresh }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [releasing, setReleasing] = useState(false);
  const token = localStorage.getItem("token") || "";

  const rowKey = (r: CreditHoldRow) =>
    `${r.comp_id}#${r.customer_id}#${r.order_no}`;

  const toggleRow = (r: CreditHoldRow) => {
    const k = rowKey(r);
    setSelected(prev => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  };

  const handleRelease = async () => {
    if (selected.size === 0) {
      showToast("Please select at least one order.", "warning");
      return;
    }
    setReleasing(true);
    try {
      const res = await axios.post(
        buildApiUrl("/MasterReport/creditholdswithrelease/release"),
        { itemsList: Array.from(selected).join(";") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast(String(res.data?.message || "Release completed."), "success");
      setSelected(new Set());
      onRefresh?.();
    } catch (err: any) {
      showToast(err?.response?.data?.message || "Release failed.", "error");
    } finally {
      setReleasing(false);
    }
  };

  const th = "px-2 py-2 text-xs font-bold text-gray-800 bg-[#dce6f1] border border-gray-400 whitespace-nowrap";
  const td = "px-2 py-1.5 text-gray-900 border border-gray-300 align-middle";

  if (!data) return <div className="p-20 text-center text-gray-500">No data received</div>;

  return (
    <div className="space-y-4 pb-16">
      <div className="flex justify-end px-2">
        <button
          onClick={handleRelease}
          disabled={selected.size === 0 || releasing}
          className="bg-[#4f8bff] hover:bg-[#6b9dff] text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
        >
          {releasing ? "Releasing..." : `Release Selected (${selected.size})`}
        </button>
      </div>

      {Object.entries(data).map(([compId, rows]) => {
        const list = rows || [];
        if (list.length === 0) return null;
        const isCollapsed = collapsed[compId];

        return (
          <div key={compId} className="bg-white rounded shadow border overflow-hidden mb-6">
            <div
              onClick={() => setCollapsed(p => ({ ...p, [compId]: !p[compId] }))}
              className="px-3 py-2 bg-[#161d2e] flex justify-between items-center cursor-pointer select-none"
            >
              <h3 className="text-sm font-bold text-white tracking-wide">
                {getGroupTitle(compId)}
                <span className="ml-2 font-normal text-slate-300">({list.length})</span>
              </h3>
              <span className="text-white text-xs">{isCollapsed ? "▼" : "▲"}</span>
            </div>

            {!isCollapsed && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th className={`${th} text-center`} style={{width:80}}>Cust ID</th>
                      <th className={`${th} text-left`}   style={{width:240}}>Name/Rep</th>
                      <th className={`${th} text-center`} style={{width:90}}>Order No</th>
                      <th className={`${th} text-center`} style={{width:90}}>Order Date</th>
                      <th className={`${th} text-right`}  style={{width:100}}>Order Total</th>
                      <th className={`${th} text-left`}   style={{width:140}}>Terms/Status</th>
                      <th className={`${th} text-right`}  style={{width:80}}>Min in Q</th>
                      <th className={`${th} text-right`}  style={{width:100}}>Credit Limit</th>
                      <th className={`${th} text-right`}  style={{width:90}}>Current</th>
                      <th className={`${th} text-right`}  style={{width:90}}>31-60</th>
                      <th className={`${th} text-right`}  style={{width:90}}>61-90</th>
                      <th className={`${th} text-right`}  style={{width:90}}>Over 90</th>
                      <th className={`${th} text-right`}  style={{width:90}}>Total</th>
                      <th className={`${th} text-center`} style={{width:70}}>Release</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((row, i) => {
                      const key = rowKey(row);
                      const checked = selected.has(key);
                      const canRelease = !!row.url;

                      return (
                        <tr key={`${compId}-${row.order_no}-${i}`}
                            className={`transition-colors "bg-[#FFF59D] font-bold hover:bg-[#fff176]" : "bg-white hover:bg-gray-50"}`}>
                          <td className={`${td} text-center font-medium`}>
                            <a href={`/ReportingPortal_v3/report/customerinfo?Comp_id=${encodeURIComponent(row.comp_id)}&custId=${encodeURIComponent(row.customer_id)}`}
                               target="_blank" rel="noopener noreferrer"
                               className="text-blue-600 underline hover:text-blue-800 font-semibold">
                              {row.customer_id}
                            </a>
                          </td>
                          <td className={`${td} text-left leading-tight`}>
                            <div className="font-semibold">{row.customer_name}</div>
                            <div className="text-gray-600 font-normal">/ {row.salesrep}</div>
                          </td>
                          <td className={`${td} text-center font-medium whitespace-nowrap`}>{row.order_no}</td>
                          <td className={`${td} text-center whitespace-nowrap`}>{fmtDate(row.order_date)}</td>
                          <td className={`${td} text-right tabular-nums font-medium whitespace-nowrap`}>{fmtCurrency(row.order_total)}</td>
                          <td className={`${td} text-left`}>{buildTerms(row)}</td>
                          <td className={`${td} text-right tabular-nums whitespace-nowrap`}>{fmtNumber(row.Time_In_Q)}</td>
                          <td className={`${td} text-right tabular-nums font-medium whitespace-nowrap`}>{fmtCurrency(row.credit_limit)}</td>
                          <td className={`${td} text-right tabular-nums whitespace-nowrap`}>{fmtCurrency(row.b1)}</td>
                          <td className={`${td} text-right tabular-nums whitespace-nowrap`}>{fmtCurrency(row.b2)}</td>
                          <td className={`${td} text-right tabular-nums whitespace-nowrap`}>{fmtCurrency(row.b3)}</td>
                          <td className={`${td} text-right tabular-nums whitespace-nowrap`}>{fmtCurrency(row.b4)}</td>
                          <td className={`${td} text-right tabular-nums font-medium whitespace-nowrap`}>{fmtCurrency(row.tot)}</td>
                          <td className={`${td} text-center`}>
                            <input type="checkbox" checked={checked} disabled={!canRelease}
                              onChange={() => toggleRow(row)}
                              className="w-4 h-4 cursor-pointer disabled:opacity-40" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}