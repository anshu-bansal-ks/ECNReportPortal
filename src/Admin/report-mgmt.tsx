import { useState } from 'react';
import { Pencil, Trash2, ShieldCheck, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import DataTableHeader from '../Admin/DataTableHeader';

const AdminReportList = () => {
  const [displayCount, setDisplayCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [reports] = useState([
    { id: 71, name: "Ecn Bucks Customer", url: "ecnbuckscustomer", subtitle: "-", keywords: "-", desc: "-", parent: "-" },
    { id: 72, name: "Ecn Bucks Supplier", url: "ecnbucks", subtitle: "-", keywords: "-", desc: "-", parent: "-" },
    { id: 73, name: "ECN Virtual Show 2021 Customer Totals", url: "customertotals", subtitle: "-", keywords: "-", desc: "-", parent: "-" },
    { id: 74, name: "Event Invoices - for Event Suppliers", url: "showreportinvoices", subtitle: "-", keywords: "specific suppliers", desc: "Event Invoices for Suppliers", parent: "-" },
    { id: 75, name: "Event Report Invoiced Sales", url: "sales_history", subtitle: "-", keywords: "REGIONALS", desc: "Invoiced Sales by Customer", parent: "-" },
  ]);

  return (
    <div className="w-full bg-white overflow-hidden border border-gray-300">
      
      {/* Header */}
      <DataTableHeader 
        displayCount={displayCount} 
        setDisplayCount={setDisplayCount} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* 🔹 TABLE: table-fixed aur w-full se scroll bar hat jayega */}
      <div className="w-full overflow-x-hidden"> 
        <table className="w-full table-fixed text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#f2f2f2] text-[#707070] text-[11px] uppercase font-bold border-b border-gray-300">
              <th className="px-2 py-2 border-r border-gray-300 w-[18%]">Reports</th>
              <th className="px-2 py-2 border-r border-gray-300 w-[22%]">URL</th>
              <th className="px-2 py-2 border-r border-gray-300 w-[10%] text-center">Subtitles</th>
              <th className="px-2 py-2 border-r border-gray-300 w-[12%] text-center">Keywords</th>
              <th className="px-2 py-2 border-r border-gray-300 w-[20%]">Description</th>
              <th className="px-2 py-2 border-r border-gray-300 w-[8%] text-center">Parent</th>
              <th className="px-2 py-2 w-[10%] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-[11px] text-[#393939]">
            {reports.map((item, idx) => (
              <tr key={item.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} border-b border-gray-200 hover:bg-[#f1f5fb]`}>
                
                {/* Name: Truncate lagaya taki width na badhe */}
                <td className="px-2 py-1.5 border-r border-gray-200 font-medium truncate" title={item.name}>
                  {item.name}
                </td>

                {/* URL: Link ko chota rakha */}
                <td className="px-2 py-1.5 border-r border-gray-200 truncate text-[#337ab7]">
                  <a href="#" className="hover:underline flex items-center gap-1">
                    <span className="truncate">/Home/{item.url}</span>
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                </td>

                <td className="px-2 py-1.5 border-r border-gray-200 text-center text-gray-400">{item.subtitle}</td>
                
                {/* Keywords: wrap hone ke liye line-clamp */}
                <td className="px-2 py-1.5 border-r border-gray-200 text-center italic text-gray-400 truncate">
                  {item.keywords}
                </td>

                {/* Description: 1 line mein truncate kiya */}
                <td className="px-2 py-1.5 border-r border-gray-200 text-gray-500 truncate" title={item.desc}>
                  {item.desc}
                </td>

                <td className="px-2 py-1.5 border-r border-gray-200 text-center font-bold text-gray-300">{item.parent}</td>

                {/* Action: Icons compact kiye */}
                <td className="px-2 py-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="text-gray-300 hover:text-purple-600 cursor-pointer" />
                    <Pencil size={14} className="text-[#69aa46] hover:text-green-800 cursor-pointer" />
                    <Trash2 size={14} className="text-[#dd5a43] hover:text-red-800 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center p-2 bg-[#eff3f8] border-t border-gray-300">
        <div className="text-[11px] text-[#393939]">
          Showing 1 to {reports.length} of 357 entries
        </div>
        <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden shadow-sm">
          <button className="px-2 py-1 border-r border-gray-300 hover:bg-gray-50"><ChevronLeft size={12}/></button>
          <button className="px-3 py-1 border-r border-gray-300 bg-[#6faed9] text-white font-bold text-[11px]">8</button>
          <button className="px-2 py-1 hover:bg-gray-50"><ChevronRight size={12}/></button>
        </div>
      </div>
    </div>
  );
};

export default AdminReportList;