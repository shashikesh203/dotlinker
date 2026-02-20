import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

// Base URL from env
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000, // 10 sec timeout
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get auth token from localStorage
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestConfig['headers'];
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Handle FormData (file upload)
    if (config.data instanceof FormData) {
      // Let browser automatically set correct Content-Type with boundary
      delete config.headers['Content-Type'];
    } else {
      // For normal JSON requests
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (error.response) {
      console.log("Error Response:", error.response);
     toast.error(error.response?.data.error || "Something went wrong");
    } else {
     toast.error(error.message|| "Something went wrong" );
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
