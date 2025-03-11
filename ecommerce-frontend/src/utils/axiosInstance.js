import axios from "axios";

// Create Axios instance👇
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: import.meta.env.VITE_APP_API_URL,

  headers: {
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
  // withCredentials: true, // sending cookies with requests from Backend.
});

// Request Interceptor - Attach token before request👇
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Cookies or localStorage👇
    // const token = Cookies.get("token") || localStorage.getItem("token");
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Unauthorized (401) errors👇
axiosInstance.interceptors.response.use(
  (response) => {
    // Agar response me token mile to localStorage me set karo
    const newToken = response.data?.token; // Backend se token response me mile to
    if (newToken) {
      localStorage.setItem("token", newToken);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");

      // Remove token from storage
      // Cookies.remove("token");
      localStorage.removeItem("token");
      sessionStorage.clear();
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
