import { useState } from "react";
import { RefreshCw } from "lucide-react";

interface BreakdownRow {
  customer_id: string;
  bill2_name: string;
  year: string;
  Jan: number | string;
  Feb: number | string;
  Mar: number | string;
  Apr: number | string;
  May: number | string;
  Jun: number | string;
  Jul: number | string;
  Aug: number | string;
  Sep: number | string;
  Oct: number | string;
  Nov: number | string;
  Dec: number | string;
  TOTAL: number | string;
}

interface Props {
  data: BreakdownRow[][]; 
  loading?: boolean;
}

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

export default function CustomerBreakdownGroupGrid({ data, loading }: Props) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggleGroup = (index: number) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const thBase = "px-3 py-2 text-xs font-bold text-gray-800 bg-[#dce6f1] border border-gray-400 whitespace-nowrap text-right";
  const tdBase = "px-3 py-1.5 text-gray-900 border border-gray-300 align-middle text-right tabular-nums";

  if (loading) {
    return (
      <div className="bg-white rounded shadow border p-20 text-center">
        <RefreshCw className="animate-spin mx-auto text-blue-600" size={32} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded shadow border p-20 text-center text-gray-500">
        No records found.
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      {data.map((groupRows, groupIdx) => {
        if (!groupRows || groupRows.length === 0) return null;
        const firstRow = groupRows[0];
        const isTotalGroup = firstRow.customer_id === "Total";
        const groupTitle = isTotalGroup 
          ? "Total" 
          : `${firstRow.customer_id} ${firstRow.bill2_name || ""}`;

        const isCollapsed = collapsed[groupIdx];

        return (
          <div key={groupIdx} className="bg-white rounded shadow border overflow-hidden mb-4">
            <div
              onClick={() => toggleGroup(groupIdx)}
              className={`px-3 py-2 flex justify-between items-center cursor-pointer select-none ${
                isTotalGroup ? "bg-[#374151]" : "bg-[#161d2e]"
              }`}
            >
              <h3 className="text-sm font-bold text-white tracking-wide">
                {groupTitle}
                <span className="ml-2 font-normal text-slate-300">({groupRows.length} rows)</span>
              </h3>
              <span className="text-white text-xs">{isCollapsed ? "▼" : "▲"}</span>
            </div>

            {!isCollapsed && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th className={`${thBase} text-center`} style={{ width: 80 }}>Year</th>
                      <th className={thBase}>Jan</th>
                      <th className={thBase}>Feb</th>
                      <th className={thBase}>Mar</th>
                      <th className={thBase}>Apr</th>
                      <th className={thBase}>May</th>
                      <th className={thBase}>Jun</th>
                      <th className={thBase}>Jul</th>
                      <th className={thBase}>Aug</th>
                      <th className={thBase}>Sep</th>
                      <th className={thBase}>Oct</th>
                      <th className={thBase}>Nov</th>
                      <th className={thBase}>Dec</th>
                      <th className={`${thBase} font-bold`}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                        <td className={`${tdBase} text-center font-semibold bg-gray-50`}>{row.year}</td>
                        <td className={tdBase}>{fmtCurrency(row.Jan)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Feb)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Mar)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Apr)}</td>
                        <td className={tdBase}>{fmtCurrency(row.May)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Jun)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Jul)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Aug)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Sep)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Oct)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Nov)}</td>
                        <td className={tdBase}>{fmtCurrency(row.Dec)}</td>
                        <td className={`${tdBase} font-bold bg-gray-50`}>{fmtCurrency(row.TOTAL)}</td>
                      </tr>
                    ))}
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