import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000, 
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestConfig['headers'];
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (error.response) {
       const status = error.response.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
     console.log("Error Response:", error.response);
     toast.error(error.response?.data.error || "Something went wrong");
    } else {
     toast.error(error.message|| "Something went wrong" );
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
