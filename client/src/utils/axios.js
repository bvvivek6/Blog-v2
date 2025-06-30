import axios from "axios";
import { BASE_URL } from "./apiPath";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a response interceptor to handle errors globally
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/";
      } else if (error.response && error.response.status === 500) {
        console.error("Server error", error);
      }
    } else {
      console.error("Network error or request timeout", error);
    }
    return Promise.reject(error);
  }
);

export default api;
