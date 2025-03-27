import axios from "axios";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/CustomToastify";

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
let notificationShown = false;

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
      console.log("Unauthorized! Logging out...");

      if (error.response?.data?.tokenExpired === true && !notificationShown) {
        // Show a notification
        toast.error(`Your session has expired. You will be logged out.`, {
          onOpen: playErrorSound,
        });

        // Set the flag to true to avoid showing the notification again
        notificationShown = true;
      }

      // Remove token from storage
      // Cookies.remove("token");
      localStorage.removeItem("token");
      sessionStorage.clear();
      localStorage.clear();

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
