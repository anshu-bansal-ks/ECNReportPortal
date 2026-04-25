import axios from "axios";
import { 
    getToken, 
    getAdminToken, 
    clearUserSession, 
    clearAdminSession 
} from "../lib/auth"; 

const API_BASE_URL = "http://localhost:5278";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. 🔥 REQUEST INTERCEPTOR: Sahi request ko sahi chabi (Token) dena
api.interceptors.request.use((config) => {
  const userToken = getToken();
  const adminToken = getAdminToken();

  // URL check: Kya ye request Admin portal ki hai?
  const isAdminRequest = config.url?.toLowerCase().includes("admin");

  if (isAdminRequest && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } 
  else if (userToken) {
    // Normal users ya reports ke liye user token
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

// 2. 🛡️ RESPONSE INTERCEPTOR: 401 aane par session saaf karna
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Check karo ki user admin side par fail hua ya normal side par
      const isAdminPath = window.location.pathname.toLowerCase().includes("/admin");

      if (isAdminPath) {
        // ✅ Admin session clear karo aur admin login par bhejo
        clearAdminSession(); 
        window.location.href = "/admin/login";
      } else {
        // ✅ User session clear karo aur normal login par bhejo
        clearUserSession(); 
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;