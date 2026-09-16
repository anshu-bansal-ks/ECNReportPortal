// src/components/CustomerInfo.tsx

import { REPORT_COLUMN_MAP } from "../config/reportColumns";

export interface BasicInfo {
  customer_id?: string;
  name?: string;
  mail_address1?: string;
  mail_address2?: string;
  mail_city?: string;
  mail_state?: string;
  mail_postal_code?: string;
  phys_address1?: string;
  phys_address2?: string;
  phys_city?: string;
  phys_state?: string;
  phys_postal_code?: string;
  central_watts_number?: string;
  central_phone_number?: string;
  central_fax_number?: string;
  email_address?: string;
  url?: string;
  credit_limit?: number;
  credit_status?: string;
  terms_desc?: string;
  salesrep_id?: string;
  salesrep_name?: string; 
  first_name?: string;
  last_name?: string;
  date_acct_opened?: string;
  corp_address_id?: any; 
  note?: string;
  sf_account_id?: string;
}

export interface CustomerApiResponse {
  basic: BasicInfo[];
  groupCode: any[];
  totalDue: any[];
  salesSummary: any[];
  salesDetails: any[];
}

interface CustomerInfoProps { 
  data: CustomerApiResponse | null; 
  compId?: string; 
}

const formatCurrency = (val?: string | number): string => {
  if (val === undefined || val === null || val === "") return "—";
  const num = typeof val === 'string' ? parseFloat(val.replace(/[$,]/g, '')) : val;
  if (isNaN(num)) return "—" ;
  const formatted = Math.abs(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return num < 0 ? `(${formatted})` : formatted;
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr || dateStr === "—") return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', '');
};

const dueLabels: Record<string, string> = {
  CURRENT: "Current",
  OVER30: "31-60",
  OVER60: "61-90",
  OVER90: "Over 90",
  TOTALDUE: "Total Due",
};

const dueColumns = ["CURRENT", "OVER30", "OVER60", "OVER90", "TOTALDUE"];

const columns = REPORT_COLUMN_MAP?.CustomerInfo || [
  { key: "month_invoicedname", label: "Month" },
  { key: "year_invoiced", label: "Year" },
  { key: "invoiced_sales", label: "Invoiced Sales" },
  { key: "amount_paid", label: "Paid" },
  { key: "PmtHist", label: "Pmt Hist" },
];

export default function CustomerInfo({ data, compId }: CustomerInfoProps) {
  if (!data) return <div className="text-center py-10 text-gray-400">No data received from API</div>;

  const basic = data.basic?.[0] || {};
  const group = data.groupCode?.[0]?.groupcode || "";
  const due = data.totalDue?.[0] || {};
  const summary = data.salesSummary?.[0] || {};
  const details = data.salesDetails || [];

  const comp_id = compId?.toString() || "";

  const showPage = (id: number) => {
    const customerid = basic.customer_id || ""; 
    if (!comp_id) {
      alert("Company ID not found!");
      return;
    }

    let reportKey = "";
    switch (id) {
        case 1: reportKey = "collectioncallnotes"; break;
        case 2: reportKey = "salesnotes"; break;
        case 3: reportKey = "customerpayments"; break;
        case 4: reportKey = "ECNstatementshipto"; break;
        case 5: reportKey = "creditamountrma"; break;
        default: return;
    }
    const url = `/report/${reportKey}?comp_id=${comp_id}&custId=${customerid}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4 p-4 bg-[#111827] text-gray-200 text-xs font-sans min-h-screen">

      {/* HEADER */}
      <div className="text-center font-semibold text-sm text-white">
        <div>{basic.customer_id}</div>
        <div>
          {basic.customer_id} - {basic.sf_account_id ? (
            <a 
              href={`https://eastcoastnews.lightning.force.com/lightning/r/Account/${basic.sf_account_id}/view`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              {basic.name}
            </a>
          ) : (
            basic.name || "—"
          )}
        </div>
      </div>

      {/* SALES REP */}
      <div className="border border-gray-700 bg-[#1F2937]">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="w-[20%] font-semibold py-2 px-3 text-gray-300">Sales Rep:</td>
              <td className="py-2 px-3 text-gray-200">
                {basic.salesrep_name || `${basic.first_name ?? ""} ${basic.last_name ?? ""}`.trim() || "—"}
              </td>
            </tr>
            <tr className="border-b border-gray-700/50">
              <td className="font-semibold py-2 px-3 text-gray-300">Group Code:</td>
              <td className="py-2 px-3">
                {group ? (
                  <a
                    href={`/repot/groupcodes?groupcode=${group}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {group}
                  </a>
                ) : "—"}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2 px-3 text-gray-300">Note:</td>
              <td className="py-2 px-3 text-gray-200">{basic.note || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ADDRESS */}
      <div className="border border-gray-700 bg-[#1F2937]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#111827] border-b border-gray-700 text-gray-300">
              <th className="text-left font-semibold py-2 px-3">Physical Address</th>
              <th className="text-left border-l border-gray-700 py-2 px-3 font-semibold">Mailing Address</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/40">
              <td className="py-1.5 px-3 text-gray-200">{basic.customer_id}</td>
              <td className="border-l border-gray-700 py-1.5 px-3 text-gray-200">{basic.customer_id}</td>
            </tr>
            <tr className="border-b border-gray-700/40">
              <td className="py-1.5 px-3 text-gray-200">{basic.name}</td>
              <td className="border-l border-gray-700 py-1.5 px-3 text-gray-200">{basic.name}</td>
            </tr>
            <tr className="border-b border-gray-700/40">
              <td className="py-1.5 px-3 text-gray-200">{basic.phys_address1}</td>
              <td className="border-l border-gray-700 py-1.5 px-3 text-gray-200">{basic.mail_address1}</td>
            </tr>
            <tr className="border-b border-gray-700/40">
              <td className="py-1.5 px-3 text-gray-200">{basic.phys_address2}</td>
              <td className="border-l border-gray-700 py-1.5 px-3 text-gray-200">{basic.mail_address2}</td>
            </tr>
            <tr>
              <td className="py-1.5 px-3 text-gray-200">
                {[basic.phys_city, basic.phys_state].filter(Boolean).join(", ")}{" "}
                {basic.phys_postal_code}
              </td>
              <td className="border-l border-gray-700 py-1.5 px-3 text-gray-200">
                {[basic.mail_city, basic.mail_state].filter(Boolean).join(", ")}{" "}
                {basic.mail_postal_code}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AGING */}
      <div className="border border-gray-700 bg-[#1F2937]">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-[#111827] border-b border-gray-700 text-gray-300">
              {dueColumns.map((k) => (
                <th key={k} className="font-semibold py-2 px-2">{dueLabels[k]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {dueColumns.map(k =>
                k === "TOTALDUE" && due[k] ? (
                  <td key={k} className="py-2.5 px-2">
                    <a
                      href={`/report/ecnstatement?comp_id=${comp_id}&customerid=${basic.customer_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300 font-medium"
                    >
                      {formatCurrency(due[k])}
                    </a>
                  </td>
                ) : (
                  <td key={k} className="py-2.5 px-2 text-gray-200">{formatCurrency(due[k] || 0)}</td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* SALES DETAILS TABLE */}
      {details.length > 0 && (
        <div className="border border-gray-700 overflow-hidden bg-[#1F2937]">
          <table className="w-full text-xs">
            <thead className="bg-[#111827] border-b border-gray-700 text-gray-300">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="p-2 border-r border-gray-700 last:border-r-0 text-center font-semibold">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {details.map((row: any, i: number) => {
                const pmtLessSls = parseFloat(row.PmtHist || 0);
                return (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-[#1F2937]' : 'bg-[#17202E]'} border-b border-gray-700/50 text-gray-200`}>
                    <td className="p-2 border-r border-gray-700 text-center">{row.month_invoicedname}</td>
                    <td className="p-2 border-r border-gray-700 text-center">{row.year_invoiced}</td>
                    <td className="p-2 border-r border-gray-700 text-right">{formatCurrency(row.invoiced_sales)}</td>
                    <td className="p-2 border-r border-gray-700 text-right">{formatCurrency(row.amount_paid)}</td>
                    <td className="p-2 text-right font-medium text-gray-200">
                      {pmtLessSls < 0 
                        ? `(${formatCurrency(Math.abs(pmtLessSls))})` 
                        : formatCurrency(pmtLessSls)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-[#111827] font-bold border-t border-gray-700 text-gray-200">
              <tr>
                <td className="p-2 text-center border-r border-gray-700"></td>
                <td className="p-2 text-right border-r border-gray-700 pr-4 italic">Total:</td>
                <td className="p-2 text-right border-r border-gray-700">
                  {formatCurrency(details.reduce((s: number, r: any) => s + parseFloat(r.invoiced_sales || 0), 0))}
                </td>
                <td className="p-2 text-right border-r border-gray-700">
                  {formatCurrency(details.reduce((s: number, r: any) => s + parseFloat(r.amount_paid || 0), 0))}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(details.reduce((s: number, r: any) => s + parseFloat(r.PmtHist || 0), 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* SALES SUMMARY */}
      <div className="border border-gray-700 bg-[#1F2937]">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="py-2 px-3 font-semibold text-gray-300 w-[20%]">First Sale</td>
              <td className="py-2 px-3 text-gray-200 w-[30%]">{formatDate(summary.FirstSl)}</td>
              <td className="py-2 px-3 font-semibold text-gray-300 w-[20%]">Last Sale</td>
              <td className="py-2 px-3 text-gray-200 w-[30%]">{formatDate(summary.LastSl)}</td>
            </tr>
            <tr className="border-b border-gray-700/50">
              <td className="py-2 px-3 font-semibold text-gray-300">Avg Sale</td>
              <td className="py-2 px-3 text-gray-200">{formatCurrency(summary.AvgSl)}</td>
              <td className="py-2 px-3 font-semibold text-gray-300">Number of Sales</td>
              <td className="py-2 px-3 text-gray-200">{summary.CountSls || 0}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-gray-300">YTD Sales</td>
              <td className="py-2 px-3">
                {summary.ytd_sales ? (
                  <a
                    href={`/report/saleshistoryytd?comp_id=${comp_id}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {formatCurrency(summary.ytd_sales)}
                  </a>
                ) : "—"}
              </td>
              <td className="py-2 px-3 font-semibold text-gray-300">Last Year Sales</td>
              <td className="py-2 px-3">
                {summary.ly_sales ? (
                  <a
                    href={`/report/saleshistorylastyear?comp_id=${comp_id}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {formatCurrency(summary.ly_sales)}
                  </a>
                ) : "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="border border-gray-700 bg-[#1F2937]">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300 w-[20%]">Contact:</td><td className="py-1.5 px-3 text-gray-200">{basic.central_watts_number || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Phone:</td><td className="py-1.5 px-3 text-gray-200">{basic.central_phone_number || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Fax:</td><td className="py-1.5 px-3 text-gray-200">{basic.central_fax_number || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Email:</td><td className="py-1.5 px-3 text-gray-200">{basic.email_address || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Other:</td><td className="py-1.5 px-3 text-gray-200">{basic.url || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Terms:</td><td className="py-1.5 px-3 text-gray-200">{basic.terms_desc || "—"}</td></tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Status:</td><td className="py-1.5 px-3 text-gray-200">{basic.credit_status || "—"}</td></tr>
            <tr className="border-b border-gray-700/40">
              <td className="py-1.5 px-3 font-semibold text-gray-300">Credit Limit:</td>
              <td className="py-1.5 px-3">
                {basic.credit_limit ? (
                  <a
                    href={`/report/creditlimithistoryforcustomer?comp_id=${comp_id}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {formatCurrency(basic.credit_limit)}
                  </a>
                ) : "—"}
              </td>
            </tr>
            <tr className="border-b border-gray-700/40"><td className="py-1.5 px-3 font-semibold text-gray-300">Date Opened:</td><td className="py-1.5 px-3 text-gray-200">{formatDate(basic.date_acct_opened)}</td></tr>
            <tr><td className="py-1.5 px-3 font-semibold text-gray-300">Corporate:</td><td className="py-1.5 px-3 text-gray-200">{basic.corp_address_id || "—"}</td></tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER LINKS */}
      <div className="border-t border-gray-700 pt-3 flex flex-wrap gap-4 text-blue-400 text-xs">
        <button onClick={() => showPage(1)} className="underline hover:text-blue-300">AR Notes</button>
        <button onClick={() => showPage(2)} className="underline hover:text-blue-300">Sales Notes</button>
        <button onClick={() => showPage(3)} className="underline hover:text-blue-300">Payments</button>
        <button onClick={() => showPage(4)} className="underline hover:text-blue-300">Statement By Ship To</button>
        <button onClick={() => showPage(5)} className="underline hover:text-blue-300">RMA's</button>
      </div>

    </div>
  );
}