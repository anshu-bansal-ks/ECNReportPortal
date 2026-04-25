// // src/components/CustomerInfo.tsx

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
  corp_address_id?: any; // Changed to any for safety
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

  // Exact Format: 10/11/2006 12:00:00 AM
  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', ''); // Comma hatane ke liye
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
  if (!data) return <div className="text-center py-10 text-gray-500">No data received from API</div>;

  const basic = data.basic?.[0] || {};
  const group = data.groupCode?.[0]?.groupcode || "";
  const due = data.totalDue?.[0] || {};
  const summary = data.salesSummary?.[0] || {};
  const details = data.salesDetails || [];

  // 🔥 SAFE UPPERCASE FIX (Error solved here)
  const getSafeUpper = (val: any) => val ? String(val).toUpperCase() : "";
  const Comp_id_upper = compId ? compId.toUpperCase() : getSafeUpper(basic.corp_address_id);

  const showPage = (id: number) => {
    const customerid = basic.customer_id || ""; 
    const Comp_id = Comp_id_upper;

    let url = "";
    switch (id) {
      case 1: url = `/Home/collectioncallnotes?id=Collection Call Notes&Comp_id=${Comp_id}&customerid=${customerid}`; break;
      case 2: url = `/Home/salesnotes?id=Sales Notes&Comp_id=${Comp_id}&customerid=${customerid}`; break;
      case 3: url = `/Home/customerpayments?id=Customer Payments&Comp_id=${Comp_id}&customerid=${customerid}`; break;
      case 4: url = `/Home/ECNstatementshipto?id=Statement of Account by Ship To&Comp_id=${Comp_id}&customerid=${customerid}`; break;
      case 5: url = `/Home/creditamountrma?id=Credit Amount RMA&Comp_id=${Comp_id}&customerid=${customerid}`; break;
      default: return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 p-6 bg-white text-sm ">

      {/* HEADER */}
      <div className="text-center text-lg">
        <div>{basic.customer_id}</div>
        <div>
          {basic.customer_id} - {basic.sf_account_id ? (
            <a 
              href={`https://eastcoastnews.lightning.force.com/lightning/r/Account/${basic.sf_account_id}/view`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {basic.name}
            </a>
          ) : (
            basic.name || "—"
          )}
        </div>
      </div>

      {/* SALES REP */}
      <div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-[20%] ">Sales Rep:</td>
              <td>
                {basic.salesrep_name || `${basic.first_name ?? ""} ${basic.last_name ?? ""}`.trim() || "—"}
              </td>
            </tr>
            <tr>
              <td>Group Code:</td>
              <td>
                {group ? (
                  <a
                    href={`/Home/groupcodes?id=Group Code Report&groupcode=${group}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {group}
                  </a>
                ) : "—"}
              </td>
            </tr>
            <tr>
              <td className="">Note:</td>
              <td>{basic.note || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ADDRESS */}
      <div className="border p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Physical Address</th>
              <th className="text-left border-l pl-4">Mailing Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{basic.customer_id}</td>
              <td className="border-l pl-4">{basic.customer_id}</td>
            </tr>
            <tr>
              <td>{basic.name}</td>
              <td className="border-l pl-4">{basic.name}</td>
            </tr>
            <tr>
              <td>{basic.phys_address1}</td>
              <td className="border-l pl-4">{basic.mail_address1}</td>
            </tr>
            <tr>
              <td>{basic.phys_address2}</td>
              <td className="border-l pl-4">{basic.mail_address2}</td>
            </tr>
            <tr>
              <td>
                {[basic.phys_city, basic.phys_state].filter(Boolean).join(", ")}{" "}
                {basic.phys_postal_code}
              </td>
              <td className="border-l pl-4">
                {[basic.mail_city, basic.mail_state].filter(Boolean).join(", ")}{" "}
                {basic.mail_postal_code}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AGING */}
      <div className="border p-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              {dueColumns.map((k) => (
                <th key={k}>{dueLabels[k]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          <tr>
              {dueColumns.map(k =>
                k === "totalDue" && due[k] ? (
                  <td key={k}>
                    <a
                      href={`/Home/ECNstatement?id=STATEMENT OF ACCOUNT&Comp_id=${Comp_id_upper}&customerid=${basic.customer_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {formatCurrency(due[k])}
                    </a>
                  </td>
                ) : (
                  <td key={k}>{formatCurrency(due[k] || 0)}</td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* SALES DETAILS TABLE */}
      {details.length > 0 && (
        <div>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="p-2 border">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
        {details.map((row: any, i: number) => {
          const pmtLessSls = parseFloat(row.PmtHist || 0);
          return (
            <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F2F2F2]'} border-b border-gray-200`}>
              <td className="p-2 border-r border-gray-300 text-center">{row.month_invoicedname}</td>
              <td className="p-2 border-r border-gray-300 text-center">{row.year_invoiced}</td>
              <td className="p-2 border-r border-gray-300 text-right">{formatCurrency(row.invoiced_sales)}</td>
              <td className="p-2 border-r border-gray-300 text-right">{formatCurrency(row.amount_paid)}</td>
              <td className={`p-2 text-right font-medium ${pmtLessSls < 0 ? 'text-black' : 'text-black'}`}>
                {/* Image logic: Negative values in brackets () */}
                {pmtLessSls < 0 
                  ? `(${formatCurrency(Math.abs(pmtLessSls))})` 
                  : formatCurrency(pmtLessSls)}
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* TOTAL ROW - Matches Image */}
      <tfoot className="bg-white font-bold border-t border-gray-400">
        <tr>
          <td className="p-2 text-center border-r border-gray-300"></td>
          <td className="p-2 text-right border-r border-gray-300 pr-4 italic">Total:</td>
          <td className="p-2 text-right border-r border-gray-300">
            {formatCurrency(details.reduce((s: number, r: any) => s + parseFloat(r.invoiced_sales || 0), 0))}
          </td>
          <td className="p-2 text-right border-r border-gray-300">
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
      <div className="border p-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td><b>First Sale</b></td>
              <td>{formatDate(summary.FirstSl)}</td>
              <td><b>Last Sale</b></td>
              <td>{formatDate(summary.LastSl)}</td>
            </tr>
            <tr>
              <td><b>Avg Sale</b></td>
              <td>{formatCurrency(summary.AvgSl)}</td>
              <td><b>Number of Sales</b></td>
              <td>{summary.CountSls || 0}</td>
            </tr>
            <tr>
              <td><b>YTD Sales</b></td>
              <td>
                {summary.ytd_sales ? (
                  <a
                    href={`/Home/saleshistoryytd?id=Sales History Year Till Date&Comp_id=${Comp_id_upper}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {formatCurrency(summary.ytd_sales)}
                  </a>
                ) : "—"}
              </td>
              <td><b>Last Year Sales</b></td>
              <td>
                {summary.ly_sales ? (
                  <a
                    href={`/Home/saleshistorylastyear?id=Sales History Last Year&Comp_id=${Comp_id_upper}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
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
      <div className="border p-4">
        <table className="w-full">
          <tbody>
            <tr><td>Contact:</td><td>{basic.central_watts_number || "—"}</td></tr>
            <tr><td>Phone:</td><td>{basic.central_phone_number || "—"}</td></tr>
            <tr><td>Fax:</td><td>{basic.central_fax_number || "—"}</td></tr>
            <tr><td>Email:</td><td>{basic.email_address || "—"}</td></tr>
            <tr><td>Other:</td><td>{basic.url || "—"}</td></tr>
            <tr><td>Terms:</td><td>{basic.terms_desc || "—"}</td></tr>
            <tr><td>Status:</td><td>{basic.credit_status || "—"}</td></tr>
            <tr>
              <td>Credit Limit:</td>
              <td>
                {basic.credit_limit ? (
                  <a
                    href={`/Home/creditlimithistoryforcustomer?id=Credit Limit History for Customer&Comp_id=${Comp_id_upper}&customerid=${basic.customer_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {formatCurrency(basic.credit_limit)}
                  </a>
                ) : "—"}
              </td>
            </tr>
            <tr><td>Date Opened:</td><td>{formatDate(basic.date_acct_opened)}</td></tr>
            <tr><td>Corporate:</td><td>{basic.corp_address_id || "—"}</td></tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER LINKS */}
      <div className="border-t pt-4 flex flex-wrap gap-4 text-blue-600 underline">
        <button onClick={() => showPage(1)}>AR Notes</button>
        <button onClick={() => showPage(2)}>Sales Notes</button>
        <button onClick={() => showPage(3)}>Payments</button>
        <button onClick={() => showPage(4)}>Statement By Ship To</button>
        <button onClick={() => showPage(5)}>RMA's</button>
      </div>

    </div>
  );
}