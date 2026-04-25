// components/ReportList.tsx
import { FileText, Search, Filter, LogOut, User, AlertCircle } from "lucide-react";
import { Report } from "../lib/supabase";
import { useState,useMemo } from "react";
import { REPORT_CONFIG } from "../config/reportConfig";

interface ReportListProps {
  reports: Report[];
  loading?: boolean;
  error?: string | null;
  // onSelectReport: (reportId: string) => void;
  onSelectReport: (reportKey: string) => void; // ✅ FIX
  onLogout: () => void;
  userEmail: string;
}

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
  
  // ✅ Allowed report keys from config
  const allowedReportKeys = useMemo(
    () => new Set(Object.keys(REPORT_CONFIG)),
    []
  );

  // ✅ Filter only configured reports (MAIN LOGIC)
  const validReports = useMemo(
    () =>
      reports.filter(
        (report) => report.key && allowedReportKeys.has(report.key)
      ),
    [reports, allowedReportKeys]
  );

  // ✅ Categories only from valid reports
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(validReports.map((r) => r.category)))],
    [validReports]
  );

  // ✅ Final filtered reports (search + category)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading your reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Reports</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={onLogout} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Logout & Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reporting Portal</h1>
              <p className="text-sm text-gray-600">Secure access to your business reports</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{userEmail}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Reports</h2>
          <p className="text-gray-600">You have access to {validReports.length} reports</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              // onClick={() => onSelectReport(report.id)}
              onClick={() => report.key && onSelectReport(report.key)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {report.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                <span className="text-sm font-medium text-blue-600 group-hover:underline">
                  View Report →
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
