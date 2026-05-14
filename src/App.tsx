// // src/App.tsx

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import Login from "./components/Login";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard"; 
import ReportList from "./components/ReportList";
import ReportViewer from "./components/ReportViewer";
import { useAuth } from "./hooks/useAuth";
import { useReports } from "./hooks/useReports";
import { getUser, getAdmin, clearUserSession } from "./lib/auth";
import api from "./services/api"; 
import { REPORT_COLUMN_MAP } from "./config/reportColumns";
import { REPORT_CONFIG } from "./config/reportConfig";

function ReportRoute({ reports }: { reports: any[] }) {
  const { key } = useParams();
  const [extraReport, setExtraReport] = useState<any>(null);
  const [fetching, setFetching] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  // 1. Pehle normal list mein dhoondo
  const report = reports.find((r) => r.key.toLowerCase() === key?.toLowerCase());

  useEffect(() => {
    // 2. Agar report list mein nahi mili (Hidden), toh API se keyword search karo
    if (!report && key && user?.id) {
      setFetching(true);
      // Backend se exact report mangwao keyword use karke
      api.get(`/api/ReportIndex/${user.id}?keyword=${key}`)
        .then((res: any) => {
          const found = res.data.find((r: any) => r.url.toLowerCase().trim() === key.toLowerCase());
          if (found) {
            const reportKey = found.url.toLowerCase().trim();
            const staticConfig = REPORT_CONFIG[reportKey] || {};
            const mapped = {
              id: found.reportId,
              key: found.url.toLowerCase().trim(),
              name: found.reportName,
              api_endpoint: `/api/${found.url}`,
              columns: REPORT_COLUMN_MAP[found.url.toLowerCase().trim()] || [],
              filter_config: staticConfig.filter_config || { filters: [] },
              supports_excel_export: staticConfig.supports_excel_export ?? true,
              enableSchedule: staticConfig.enableSchedule ?? false
            };
            setExtraReport(mapped);
          } else {
            setExtraReport("NOT_FOUND");
          }
        })
        .catch(() => setExtraReport("NOT_FOUND"))
        .finally(() => setFetching(false));
    }
  }, [key, report, user?.id]);

  // Loading state
  if (fetching) return <div className="p-20 text-center">Checking hidden report settings...</div>;
  
  // Final decision logic
  const finalReport = report || (extraReport !== "NOT_FOUND" ? extraReport : null);

  if (!finalReport && !fetching) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-red-500 font-bold text-xl mb-4">Report Not Found</h2>
        <p className="text-gray-600 mb-6">This report is either hidden or you don't have access.</p>
        <button 
          onClick={() => navigate("/")} 
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Back to Portal
        </button>
      </div>
    );
  }

  return <ReportViewer report={finalReport} onBack={() => window.history.back()} />;
}

function App() {
  // const [user, setUser] = useState<any>(null);
  // const [admin, setAdmin] = useState<any>(null);
  const [user, setUser] = useState<any>(() => getUser());
  const [admin, setAdmin] = useState<any>(() => getAdmin());
  const { signIn } = useAuth();
  const { reports, loading, error } = useReports(user?.id || null);
  const navigate = useNavigate();

  // 1. Session Restore (Hard Refresh Fix)
  useEffect(() => {
    const storedUser = getUser();
    const storedAdmin = getAdmin();
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (storedAdmin && adminToken) {
      setAdmin(storedAdmin);
    }
    
    if (storedUser && userToken) {
      setUser(storedUser);
      // 🔥 Headers ko restore karein refresh ke baad
      api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    }
  }, []);

  const handleUserLogin = async (username: string, password: string) => {
    const res = await signIn(username, password);
    if (res.success) {
      setUser(res);
      // navigate call ki zaroorat nahi hai agar logic niche Navigate component me hai, 
      // but double safety ke liye:
      navigate("/", { replace: true });
    } else {
      alert(res.message);
    }
  };

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    setAdmin(null);
    navigate("/login", { replace: true });
  };

  // Loading screen sirf tab jab user logged in ho aur reports load ho rahi hon
  if (loading && user) return <div className="p-10 text-center">Loading reports...</div>;

  return (
    <Routes>
      {/* 🔹 PUBLIC ROUTES */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login onLogin={handleUserLogin} />} 
      />
      <Route 
        path="/admin/login" 
        element={admin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} 
      />

      {/* 🔹 ADMIN AREA (Protected) */}
      <Route 
        path="/admin/dashboard/*" 
        element={admin ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin/login" replace />} 
      />

      {/* 🔹 USER AREA (Protected) */}
      <Route
        path="/"
        element={
          user ? (
            <ReportList
              reports={reports}
              loading={loading}
              error={error}
              onSelectReport={(reportKey) => navigate(`/report/${reportKey}`)}
              onLogout={handleLogout}
              userEmail={user.name || user.username}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/report/:key"
        element={user ? <ReportRoute reports={reports} /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;