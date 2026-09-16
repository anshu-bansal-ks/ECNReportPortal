import axios from "axios";
import { 
    getToken, 
    getAdminToken, 
    clearUserSession, 
    clearAdminSession 
} from "../lib/auth"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userToken = getToken();
  const adminToken = getAdminToken();

  const isAdminRequest = config.url?.toLowerCase().includes("admin");

  if (isAdminRequest && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } 
  else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminPath = window.location.pathname.toLowerCase().includes("/admin");

      if (isAdminPath) {
        clearAdminSession(); 
        window.location.href = "/admin/login";
      } else {
        clearUserSession(); 
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;