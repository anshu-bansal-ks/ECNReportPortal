// components/ReportList.tsx
import { FileText, Search, LogOut, User, AlertCircle, LayoutGrid, List, ChevronRight } from "lucide-react";
import { Report } from "../lib/supabase";
import { useState, useMemo } from "react";
import { REPORT_CONFIG } from "../config/reportConfig";

interface ReportListProps {
  reports: Report[];
  loading?: boolean;
  error?: string | null;
  onSelectReport: (reportKey: string) => void;
  onLogout: () => void;
  userEmail: string;
}

type ViewMode = "list" | "grid";

export default function ReportList({
  reports,
  loading = false,
  error = null,
  onSelectReport,
  onLogout,
  userEmail,
}: ReportListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [view, setView] = useState<ViewMode>("list");

  const allowedReportKeys = useMemo(
    () => new Set(Object.keys(REPORT_CONFIG)),
    []
  );

  const validReports = useMemo(
    () =>
      reports.filter(
        (report) => report.key && allowedReportKeys.has(report.key)
      ),
    [reports, allowedReportKeys]
  );

  const categories = useMemo(
    () => Array.from(new Set(validReports.map((r) => r.category))),
    [validReports]
  );

  const filteredReports = useMemo(() => {
    return validReports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        report.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [validReports, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#26304a] border-t-[#4f8bff] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-300">Loading your reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-6">
        <div className="bg-[#161d2e] border border-[#26304a] rounded-2xl shadow-2xl shadow-black/50 p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-[#f87171] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-100 mb-2">Error Loading Reports</h3>
          <p className="text-slate-400 mb-6">{error}</p>
          <button onClick={onLogout} className="px-6 py-3 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors">
            Logout & Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19]">
      {/* Header — slim, single row: brand · stats · user */}
      <header className="bg-[#111827]/95 backdrop-blur border-b border-[#26304a] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-[#4f8bff] to-[#3562d6] rounded-lg flex items-center justify-center shadow-lg shadow-[#4f8bff]/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base font-bold text-slate-100 tracking-tight leading-none">Reporting Portal</h1>
          </div>

          {/* Compact stats — dashboard feel, hidden on small screens */}
          <div className="hidden md:flex items-center divide-x divide-[#26304a] border-l border-r border-[#26304a] px-6">
            <div className="px-6 text-center">
              <p className="text-lg font-bold text-slate-100 leading-none">{validReports.length}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mt-1">Reports</p>
            </div>
            <div className="px-6 text-center">
              <p className="text-lg font-bold text-slate-100 leading-none">{categories.length}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mt-1">Categories</p>
            </div>
            <div className="px-6 text-center">
              <p className="text-lg font-bold text-[#4f8bff] leading-none">{filteredReports.length}</p>
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mt-1">Showing</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="hidden sm:flex items-center space-x-2 bg-[#1e2739] border border-[#26304a] px-3 py-1.5 rounded-lg">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-200">{userEmail}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-1.5 text-slate-300 hover:bg-[#1e2739] hover:text-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls: search + category + view toggle, single bar */}
        <div className="bg-[#161d2e] border border-[#26304a] rounded-2xl shadow-xl shadow-black/30 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search reports by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#1e2739] border border-[#323e5c] rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 bg-[#1e2739] border border-[#323e5c] rounded-lg text-sm text-slate-100 focus:ring-2 focus:ring-[#4f8bff] focus:border-transparent outline-none"
              >
                <option value="all" className="bg-[#1e2739] text-slate-100">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#1e2739] text-slate-100">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-[#1e2739] border border-[#323e5c] rounded-lg p-1 shrink-0">
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={`p-1.5 rounded-md transition-colors ${
                  view === "list" ? "bg-[#4f8bff] text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`p-1.5 rounded-md transition-colors ${
                  view === "grid" ? "bg-[#4f8bff] text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DENSE LIST VIEW */}
        {view === "list" && (
          <div className="bg-[#161d2e] border border-[#26304a] rounded-2xl shadow-xl shadow-black/30 overflow-hidden divide-y divide-[#20293e]">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => report.key && onSelectReport(report.key)}
                className="flex items-center gap-4 px-5 py-3.5 cursor-pointer bg-[#161d2e] hover:bg-[#1c2739] transition-colors group"
              >
                <div className="w-9 h-9 shrink-0 bg-[#1c2b4d] rounded-lg flex items-center justify-center group-hover:bg-[#4f8bff] transition-colors">
                  <FileText className="w-4.5 h-4.5 text-[#4f8bff] group-hover:text-white transition-colors" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100 group-hover:text-[#6b9dff] transition-colors truncate">
                      {report.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{report.description}</p>
                </div>

                <span className="hidden sm:inline-block shrink-0 px-2.5 py-1 bg-[#1e2739] text-slate-400 text-[11px] font-medium rounded-full border border-[#26304a]">
                  {report.category}
                </span>

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#4f8bff] shrink-0 transition-colors" />
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-16">
                <div className="w-14 h-14 bg-[#1e2739] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-slate-500" />
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-1">No reports found</h3>
                <p className="text-sm text-slate-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* GRID VIEW (kept as an alternative) */}
        {view === "grid" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => report.key && onSelectReport(report.key)}
                  className="flex flex-col bg-[#161d2e] rounded-xl shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-[#4f8bff]/10 transition-all duration-300 cursor-pointer border border-[#26304a] hover:border-[#4f8bff] group"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-[#1c2b4d] rounded-lg flex items-center justify-center group-hover:bg-[#4f8bff] transition-colors">
                        <FileText className="w-6 h-6 text-[#4f8bff] group-hover:text-white transition-colors" />
                      </div>
                      <span className="px-3 py-1 bg-[#1e2739] text-slate-300 text-xs font-medium rounded-full border border-[#26304a]">
                        {report.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-[#6b9dff] transition-colors">
                      {report.name}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{report.description}</p>
                  </div>

                  <div className="px-6 py-4 bg-[#111827] border-t border-[#26304a] rounded-b-xl">
                    <span className="text-sm font-medium text-[#4f8bff] group-hover:underline">
                      View Report →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#1e2739] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">No reports found</h3>
                <p className="text-slate-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}