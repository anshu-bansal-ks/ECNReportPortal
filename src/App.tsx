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

function ReportRoute({ reports }: { reports: any[] }) {
  const { key } = useParams();
  const report = reports.find((r) => r.key === key);
  if (!report) return <div className="p-10">Report not found</div>;
  return <ReportViewer report={report} onBack={() => window.history.back()} />;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);
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