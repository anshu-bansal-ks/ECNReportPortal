 // src/lib/auth.ts
 import api from "../services/api";
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
}

export function saveUserSession(user: User, token: string) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function getUser(): User | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function clearUserSession() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("selectedReportId");
  delete api.defaults.headers.common["Authorization"];
}

// Pehle wale functions ke niche ye add karein
export function saveAdminSession(admin: any, token: string) {
  localStorage.setItem("adminUser", JSON.stringify(admin));
  localStorage.setItem("adminToken", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function getAdmin(): any | null {
  const admin = localStorage.getItem("adminUser");
  return admin ? JSON.parse(admin) : null;
}

export function getAdminToken(): string | null {
  return localStorage.getItem("adminToken");
}

export function clearAdminSession() {
  localStorage.removeItem("adminUser");
  localStorage.removeItem("adminToken");
  delete api.defaults.headers.common["Authorization"];
}