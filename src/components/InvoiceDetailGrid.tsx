import { RefreshCw } from "lucide-react";

interface InvoiceRow {
  invoice_date: string;
  invoice_no: string | number;
  customer_id: string | number;
  bill2_name: string;
  po_no: string;
  total_amount: number | string;
  item_id: string;
  item_desc: string;
  unit_price: number | string;
  qty_shipped: number | string;
  extended_price: number | string;
  line_no: number | string;
  name: string;
  tracking_no: string;
}

interface InvoiceDetailGridProps {
  data: InvoiceRow[];
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

const fmtDate = (value: any) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export default function InvoiceDetailGrid({ data, loading }: InvoiceDetailGridProps) {
  const thBase = "px-3 py-2 text-xs font-bold text-gray-800 bg-[#dce6f1] border border-gray-400 whitespace-nowrap";
  const tdBase = "px-3 py-1.5 text-gray-900 border border-gray-300 align-middle";

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
        No invoice details found. Please search with a valid Invoice Number.
      </div>
    );
  }

  const headerInfo = data[0];

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-white rounded shadow border p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Invoice No</span>
          <span className="text-sm font-bold text-gray-900">{headerInfo.invoice_no}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Invoice Date</span>
          <span className="text-sm font-medium text-gray-900">{fmtDate(headerInfo.invoice_date)}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Customer ID & Name</span>
          <span className="text-sm font-medium text-gray-900">{headerInfo.customer_id} - {headerInfo.bill2_name}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">PO Number</span>
          <span className="text-sm font-medium text-gray-900">{headerInfo.po_no || "—"}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Carrier</span>
          <span className="text-sm font-medium text-gray-900">{headerInfo.name || "—"}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Tracking No</span>
          <span className="text-sm font-medium text-blue-600 underline">{headerInfo.tracking_no || "—"}</span>
        </div>
        <div>
          <span className="text-gray-500 block font-semibold uppercase">Total Amount</span>
          <span className="text-sm font-bold text-gray-900">{fmtCurrency(headerInfo.total_amount)}</span>
        </div>
      </div>

      <div className="bg-white rounded shadow border overflow-hidden">
        <div className="px-3 py-2 bg-[#161d2e]">
          <h3 className="text-sm font-bold text-white tracking-wide">Invoice Line Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className={`${thBase} text-center`} style={{ width: 70 }}>Line</th>
                <th className={`${thBase} text-left`} style={{ width: 130 }}>Item ID</th>
                <th className={`${thBase} text-left`} style={{ width: 320 }}>Description</th>
                <th className={`${thBase} text-right`} style={{ width: 90 }}>Qty Shipped</th>
                <th className={`${thBase} text-right`} style={{ width: 110 }}>Unit Price</th>
                <th className={`${thBase} text-right`} style={{ width: 120 }}>Ext Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className={`${tdBase} text-center font-medium`}>{row.line_no}</td>
                  <td className={`${tdBase} text-left font-semibold`}>{row.item_id}</td>
                  <td className={`${tdBase} text-left`}>{row.item_desc}</td>
                  <td className={`${tdBase} text-right tabular-nums`}>{row.qty_shipped}</td>
                  <td className={`${tdBase} text-right tabular-nums`}>{fmtCurrency(row.unit_price)}</td>
                  <td className={`${tdBase} text-right tabular-nums font-bold`}>{fmtCurrency(row.extended_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}