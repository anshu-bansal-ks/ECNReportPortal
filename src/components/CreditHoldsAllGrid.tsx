
import { useMemo, useState } from "react";

interface CreditHoldRow {
  comp_id: string;
  customer_id: string;
  customer_name: string;
  terms_desc: string;
  orderHeaderTerms: string;
  credit_limit: number;
  credit_limit_used: number;
  credit_status: string;
  carrier: string;
  order_no: string;
  order_date: string;
  order_total: number;
  validation_status: string;
  job_name: string;
  po_no: string;
  salesrep: string;
  Time_In_Q: number;
}

interface CreditHoldsAllGridProps {
  data: Record<string, CreditHoldRow[]> | null;
}

const COMPANY_TITLES: Record<string, string> = {
  ECN: "ECN Accounts",
  ADV: "Adventure Accounts",
  ADVENTURE: "Adventure Accounts",
  XG: "XGEN Accounts",
  XGEN: "XGEN Accounts",
  IVD: "IVD Accounts",
};

const getGroupTitle = (compId: string) =>
  COMPANY_TITLES[(compId || "").toUpperCase()] || `${compId} Accounts`;

const fmtCurrency = (value: any) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "$0.00";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(num));
  return num < 0 ? `(${formatted})` : formatted;
};

const fmtNumber = (value: any) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("en-US").format(Math.round(num));
};

const fmtDate = (value: any) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const buildTermsStatus = (row: CreditHoldRow) => {
  const terms = (row.orderHeaderTerms || row.terms_desc || "").trim();
  const status = (row.credit_status || "").trim();
  if (!status) return terms;
  if (!terms) return status;
  return `${terms} / ${status}`;
};

export default function CreditHoldsAllGrid({ data }: CreditHoldsAllGridProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!data) return {};
    const q = search.trim().toLowerCase();
    if (!q) return data;

    const out: Record<string, CreditHoldRow[]> = {};
    Object.entries(data).forEach(([compId, rows]) => {
      out[compId] = (rows || []).filter((row) =>
        [
          row.customer_id,
          row.customer_name,
          row.salesrep,
          row.order_no,
          row.order_date,
          row.orderHeaderTerms,
          row.credit_status,
          row.carrier,
        ].some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    });
    return out;
  }, [data, search]);

  const toggleGroup = (compId: string) =>
    setCollapsed((prev) => ({ ...prev, [compId]: !prev[compId] }));

  const getRowClass = (row: CreditHoldRow) => {
    const terms = (row.terms_desc || row.orderHeaderTerms || "").toUpperCase();
    if (terms.includes("PREPA") || terms.includes("PRE-PAID") || terms.includes("PREPAY")) {
      return "bg-[#FFF59D] font-bold hover:bg-[#fff176]";
    }
    return "bg-white hover:bg-gray-50";
  };

  const thBase = "px-3 py-2 text-xs font-bold text-gray-800 bg-[#dce6f1] border border-gray-400 whitespace-nowrap";
  const tdBase = "px-3 py-1.5 text-gray-900 border border-gray-300 align-middle";

  if (!data) {
    return (
      <div className="p-20 text-center text-gray-500">
        No data received
      </div>
    );
  }

  const activeKeys = Object.keys(filteredGroups);
  if (activeKeys.length === 0) {
    return (
      <div className="space-y-4 pb-16">
        <div className="flex justify-end mb-4 px-4 pt-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
          />
        </div>
        <div className="bg-white rounded shadow border p-20 text-center text-gray-500">
          No credit holds found across any company.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      {Object.entries(filteredGroups).map(([compId, rows]) => {
        const isCollapsed = collapsed[compId];
        const list = rows || [];
        if (list.length === 0 && search) return null;

        return (
          <div key={compId} className="bg-white rounded shadow border overflow-hidden mb-6">
            <div
              onClick={() => toggleGroup(compId)}
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
                      <th className={`${thBase} text-center`} style={{ width: 90 }}>Customer Id</th>
                      <th className={`${thBase} text-left`} style={{ width: 280 }}>Name/Rep</th>
                      <th className={`${thBase} text-center`} style={{ width: 110 }}>Order No</th>
                      <th className={`${thBase} text-center`} style={{ width: 110 }}>Order Date</th>
                      <th className={`${thBase} text-right`} style={{ width: 120 }}>Order Total</th>
                      <th className={`${thBase} text-left`} style={{ width: 160 }}>Terms/Status</th>
                      <th className={`${thBase} text-left`} style={{ width: 150 }}>Carrier</th>
                      <th className={`${thBase} text-right`} style={{ width: 100 }}>Min in Q</th>
                      <th className={`${thBase} text-right`} style={{ width: 110 }}>Credit Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-4 text-gray-400 italic">
                          No active credit holds for {compId}
                        </td>
                      </tr>
                    ) : (
                      list.map((row, i) => (
                        <tr
                          key={`${compId}-${row.order_no}-${i}`}
                          className={`transition-colors ${getRowClass(row)}`}
                        >
                          <td className={`${tdBase} text-center font-medium`}>
                            <a
                                href={`/report/customerinfo?Comp_id=${encodeURIComponent(row.comp_id || "")}&custId=${encodeURIComponent(row.customer_id)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800 font-semibold"
                            >
                                {row.customer_id}
                            </a>
                            </td>

                          <td className={`${tdBase} text-left leading-tight`}>
                            <div className="font-semibold">{row.customer_name}</div>
                            <div className="text-gray-600 font-normal">/ {row.salesrep}</div>
                          </td>

                          <td className={`${tdBase} text-center font-medium whitespace-nowrap`}>
                            {row.order_no}
                          </td>
                          <td className={`${tdBase} text-center whitespace-nowrap`}>
                            {fmtDate(row.order_date)}
                          </td>
                          <td className={`${tdBase} text-right tabular-nums font-medium whitespace-nowrap`}>
                            {fmtCurrency(row.order_total)}
                          </td>
                          <td className={`${tdBase} text-left`}>{buildTermsStatus(row)}</td>
                          <td className={`${tdBase} text-left`}>{row.carrier || "—"}</td>
                          <td className={`${tdBase} text-right tabular-nums whitespace-nowrap`}>
                            {fmtNumber(row.Time_In_Q)}
                          </td>
                          <td className={`${tdBase} text-right tabular-nums font-medium whitespace-nowrap`}>
                            {fmtNumber(row.credit_limit)}
                          </td>
                        </tr>
                      ))
                    )}
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