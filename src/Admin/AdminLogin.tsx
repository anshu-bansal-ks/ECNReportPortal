import { useState } from "react";
import { ShieldCheck } from "lucide-react"; // Admin ke liye different icon
import axios from "axios";
import { buildApiUrl } from "../lib/supabase";
import { saveAdminSession } from "../lib/auth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(buildApiUrl("/api/AdminLogin/Login"), {
        Username: username,
        Password: password,
      });

      if (response.data.token) {
        // localStorage.setItem("adminToken", response.data.token);
        // localStorage.setItem("isAdmin", "true");
        saveAdminSession(response.data, response.data.token);
        window.location.href = "/admin/dashboard"; 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
        
        {/* Admin Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-slate-800 rounded-2xl shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="mt-2 text-sm text-gray-500">Secure access for portal administrators</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
              Admin Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none"
              placeholder="Enter admin ID"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold text-white transition-all bg-slate-800 rounded-lg shadow-lg hover:bg-slate-900 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 text-center border-t border-gray-100">
          <a href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            ← Back to User Login
          </a>
        </div>
      </div>
    </div>
  );
}