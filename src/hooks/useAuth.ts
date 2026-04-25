//hooks/useAuth
import api from "../services/api";
import { saveUserSession,saveAdminSession } from "../lib/auth";

export function useAuth() {
  async function signIn(username: string, password: string) {
    try {
      const res = await api.post("/api/Auth/login", {
        username,
        password,
      });

      const data = res.data;

      if (!data.token) {
        return { success: false, message: "Invalid login" };
      }

      const user = {
        id: Number(data.userId),
        username: data.username,
        email: data.email,
        name: data.name,
      };

      // 🔥 Save session here ONLY
      saveUserSession(user, data.token);

      return {
        success: true,
        ...user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }
  }

  async function adminSignIn(username: string, password: string) {
    try {
      const res = await api.post("/api/AdminLogin/Login", { username, password });
      const data = res.data;

      if (!data.token) return { success: false, message: "Invalid Admin login" };

      const admin = { username: data.username, role: 'admin' };
      saveAdminSession(admin, data.token); // Admin session save kiya

      return { success: true, ...admin };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Admin Server error" };
    }
  }

  return { signIn, adminSignIn };
}