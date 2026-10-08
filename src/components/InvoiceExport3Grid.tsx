import { RefreshCw } from "lucide-react";

interface InvoiceExport3GridProps {
  data: any[];
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

const fmtPercent = (value: any) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "0.0%";
  return `${num.toFixed(1)} %`;
};

const fmtDate = (value: any) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2); 
  
    return `${month}-${day}-${year}`;
  };

export default function InvoiceExport3Grid({ data, loading }: InvoiceExport3GridProps) {
  const thBase = "px-3 py-2.5 text-xs font-bold text-slate-200 bg-[#161d2e] border border-[#26304a] whitespace-nowrap";
  const tdBase = "px-3 py-2 text-xs text-slate-200 border border-[#26304a] align-middle";

  if (loading) {
    return (
      <div className="bg-[#1e2739] rounded-xl shadow border border-[#26304a] p-20 text-center">
        <RefreshCw className="animate-spin mx-auto text-[#4f8bff]" size={32} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#1e2739] rounded-xl shadow border border-[#26304a] p-20 text-center text-slate-400">
        No invoice details found. Please search with a valid Invoice Number.
      </div>
    );
  }

  const header = data[0];
  const subTotal = data.reduce((sum, r) => sum + (parseFloat(r.extended_price || r.EXTENDED_PRICE) || 0), 0);
  const freight = parseFloat(header.freight || header.FREIGHT) || 0;
  const invoiceTotal = subTotal + freight;

  return (
    <div className="bg-[#1e2739] rounded-xl shadow-xl shadow-black/30 border border-[#26304a] p-6 space-y-6 pb-16 text-slate-200">
      <div className="flex justify-between items-start text-xs border-b border-[#26304a] pb-4">
        <div>
          <h2 className="font-bold text-sm text-slate-100" id="customerDetail">
            {header.customer_name || header.CUSTOMER_NAME} - {header.customer_id || header.CUSTOMER_ID}
          </h2>
        </div>
        <div className="text-right space-y-1">
          <div><span className="font-semibold text-slate-400">Invoice #:</span> <span className="font-bold text-slate-100">{header.invoice_no || header.INVOICE_NO}</span></div>
          <div><span className="font-semibold text-slate-400">PO #:</span> <span className="text-slate-200">{header.po_no || header.PO_NO || "—"}</span></div>
          <div><span className="font-semibold text-slate-400">Company:</span> <span className="text-slate-200">ECN</span></div>
          <div><span className="font-semibold text-slate-400">Invoice Date:</span> <span className="text-slate-200">{fmtDate(header.invoice_date || header.INVOICE_DATE)}</span></div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th className={`${thBase} text-center`} style={{ width: 150 }}>Invoice No</th>
              <th className={`${thBase} text-left`} style={{ width: 230 }}>Item ID</th>
              <th className={`${thBase} text-left`} style={{ width: 230 }}>Item Description</th>
              <th className={`${thBase} text-center`} style={{ width: 135 }}>UPC</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Ordered</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Shipped</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Whlsl. Price</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Disc. Price</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Disc. Pct</th>
              <th className={`${thBase} text-right`} style={{ width: 100 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-[#26304a]/40 transition-colors">
                <td className={`${tdBase} text-center font-medium`}>{row.invoice_no || row.INVOICE_NO}</td>
                <td className={`${tdBase} text-left font-semibold`}>{row.item_id || row.ITEM_ID}</td>
                <td className={`${tdBase} text-left`}>{row.item_desc || row.ITEM_DESC}</td>
                <td className={`${tdBase} text-center`}>{row.upc || row.UPC}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{row.qty_requested || row.QTY_REQUESTED}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{row.qty_shipped || row.QTY_SHIPPED}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.price1 || row.PRICE1)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.unit_price || row.UNIT_PRICE)}</td>
                <td className={`${tdBase} text-right tabular-nums`}>{fmtPercent(row.DiscPct || row.DISCPCT)}</td>
                <td className={`${tdBase} text-right tabular-nums font-bold`}>{fmtCurrency(row.extended_price || row.EXTENDED_PRICE)}</td>
              </tr>
            ))}

            <tr className="bg-[#161d2e] font-bold border-t border-[#26304a]">
              <td colSpan={3} className="border border-[#26304a]"></td>
              <td className={`${tdBase} text-center font-bold text-slate-300 bg-[#161d2e]`}>Sub Total:</td>
              <td colSpan={5} className="border border-[#26304a] bg-[#161d2e]"></td>
              <td className={`${tdBase} text-right tabular-nums bg-[#161d2e] font-bold text-slate-100`}>{fmtCurrency(subTotal)}</td>
            </tr>

            <tr className="bg-[#161d2e] font-bold">
              <td colSpan={3} className="border border-[#26304a]"></td>
              <td className={`${tdBase} text-center font-bold text-slate-300 bg-[#161d2e]`}>Freight:</td>
              <td colSpan={5} className="border border-[#26304a] bg-[#161d2e]"></td>
              <td className={`${tdBase} text-right tabular-nums bg-[#161d2e] font-bold text-slate-100`}>{fmtCurrency(freight)}</td>
            </tr>

            <tr className="bg-[#20293e] font-bold border-b border-[#26304a]">
              <td colSpan={3} className="border border-[#26304a]"></td>
              <td className={`${tdBase} text-center font-bold text-slate-100 bg-[#20293e]`}>Invoice Total:</td>
              <td colSpan={5} className="border border-[#26304a] bg-[#20293e]"></td>
              <td className={`${tdBase} text-right tabular-nums bg-[#20293e] font-bold text-slate-100`}>{fmtCurrency(invoiceTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}