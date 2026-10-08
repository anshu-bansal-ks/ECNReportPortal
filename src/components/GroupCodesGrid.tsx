import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";

interface GroupCodeRow {
  customer_id: string;
  customer_name: string;
  B1: number | string;
  B2: number | string;
  B3: number | string;
  B4: number | string;
  tot: number | string;
}

interface GroupCodesGridProps {
  data: Record<string, GroupCodeRow[]> | null;
  loading?: boolean;
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

export default function GroupCodesGrid({ data, loading }: GroupCodesGridProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search] = useState("");

  const filteredGroups = useMemo(() => {
    if (!data) return {};
    const q = search.trim().toLowerCase();
    if (!q) return data;

    const out: Record<string, GroupCodeRow[]> = {};
    Object.entries(data).forEach(([compId, rows]) => {
      out[compId] = (rows || []).filter((row) =>
        [row.customer_id, row.customer_name].some((v) =>
          String(v ?? "").toLowerCase().includes(q)
        )
      );
    });
    return out;
  }, [data, search]);

  const grandTotals = useMemo(() => {
    let b1 = 0, b2 = 0, b3 = 0, b4 = 0, tot = 0;
    Object.values(filteredGroups).forEach((rows) => {
      (rows || []).forEach((r) => {
        b1 += parseFloat(String(r.B1 || 0)) || 0;
        b2 += parseFloat(String(r.B2 || 0)) || 0;
        b3 += parseFloat(String(r.B3 || 0)) || 0;
        b4 += parseFloat(String(r.B4 || 0)) || 0;
        tot += parseFloat(String(r.tot || 0)) || 0;
      });
    });
    return { b1, b2, b3, b4, tot };
  }, [filteredGroups]);

  const toggleGroup = (compId: string) =>
    setCollapsed((prev) => ({ ...prev, [compId]: !prev[compId] }));

  const thBase = "px-3 py-2 text-xs font-bold text-gray-800 bg-[#dce6f1] border border-gray-400 whitespace-nowrap";
  const tdBase = "px-3 py-1.5 text-gray-900 border border-gray-300 align-middle";

  if (loading) {
    return (
      <div className="bg-white rounded shadow border p-20 text-center">
        <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded shadow border p-20 text-center text-gray-500">
        No data received. Please apply filters.
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">

      {Object.entries(filteredGroups).map(([compId, rows]) => {
        const isCollapsed = collapsed[compId];
        const list = rows || [];
        if (list.length === 0 && search) return null;

        const subTotal = list.reduce(
          (acc, r) => {
            acc.b1 += parseFloat(String(r.B1 || 0)) || 0;
            acc.b2 += parseFloat(String(r.B2 || 0)) || 0;
            acc.b3 += parseFloat(String(r.B3 || 0)) || 0;
            acc.b4 += parseFloat(String(r.B4 || 0)) || 0;
            acc.tot += parseFloat(String(r.tot || 0)) || 0;
            return acc;
          },
          { b1: 0, b2: 0, b3: 0, b4: 0, tot: 0 }
        );

        const groupTitle = getGroupTitle(compId);
        const companyLabelName = groupTitle.replace(" Accounts", "");

        return (
          <div key={compId} className="bg-white rounded shadow border overflow-hidden mb-6">
            <div
              onClick={() => toggleGroup(compId)}
              className="px-3 py-2 bg-[#161d2e] flex justify-between items-center cursor-pointer select-none"
            >
              <h3 className="text-sm font-bold text-white tracking-wide">
                {groupTitle}
                <span className="ml-2 font-normal text-slate-300">({list.length})</span>
              </h3>
              <span className="text-white text-xs">{isCollapsed ? "▼" : "▲"}</span>
            </div>

            {!isCollapsed && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th className={`${thBase} text-center`} style={{ width: 100 }}>Customer Id</th>
                      <th className={`${thBase} text-left`} style={{ width: 300 }}>Customer Name</th>
                      <th className={`${thBase} text-right`} style={{ width: 110 }}>Current</th>
                      <th className={`${thBase} text-right`} style={{ width: 110 }}>30 - 60</th>
                      <th className={`${thBase} text-right`} style={{ width: 110 }}>60 - 90</th>
                      <th className={`${thBase} text-right`} style={{ width: 110 }}>Over 90</th>
                      <th className={`${thBase} text-right`} style={{ width: 120 }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-gray-400 italic">
                          No records found for {compId}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {list.map((row, i) => (
                          <tr key={`${compId}-${row.customer_id}-${i}`} className="hover:bg-gray-50 transition-colors">
                            <td className={`${tdBase} text-center font-medium`}>
                              <a
                                href={`/report/customerinfo?Comp_id=${encodeURIComponent(compId)}&custId=${encodeURIComponent(row.customer_id)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                {row.customer_id}
                              </a>
                            </td>
                            <td className={`${tdBase} text-left font-semibold`}>{row.customer_name}</td>
                            <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.B1)}</td>
                            <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.B2)}</td>
                            <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.B3)}</td>
                            <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.B4)}</td>
                            <td className={`${tdBase} text-right tabular-nums font-bold`}>{fmtCurrency(row.tot)}</td>
                          </tr>
                        ))}

                        <tr className="bg-gray-100 font-bold border-t border-gray-400">
                          <td className={`${tdBase} text-center`}>—</td>
                          <td className={`${tdBase} text-left`}>{companyLabelName} Total:</td>
                          <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(subTotal.b1)}</td>
                          <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(subTotal.b2)}</td>
                          <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(subTotal.b3)}</td>
                          <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(subTotal.b4)}</td>
                          <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(subTotal.tot)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-white rounded shadow border overflow-hidden mt-6">
        <div className="px-3 py-2 bg-[#161d2e] flex justify-between items-center">
          <h3 className="text-sm font-bold text-white tracking-wide">Total Due of Accounts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className={`${thBase} text-center`} style={{ width: 100 }}>Customer Id</th>
                <th className={`${thBase} text-left`} style={{ width: 300 }}>Customer Name</th>
                <th className={`${thBase} text-right`} style={{ width: 110 }}>Current</th>
                <th className={`${thBase} text-right`} style={{ width: 110 }}>30 - 60</th>
                <th className={`${thBase} text-right`} style={{ width: 110 }}>60 - 90</th>
                <th className={`${thBase} text-right`} style={{ width: 110 }}>Over 90</th>
                <th className={`${thBase} text-right`} style={{ width: 120 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 font-bold">
                <td className={`${tdBase} text-center`}>—</td>
                <td className={`${tdBase} text-left`}>Grand Total:</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(grandTotals.b1)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(grandTotals.b2)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(grandTotals.b3)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(grandTotals.b4)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(grandTotals.tot)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}