import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({baseURL: import.meta.env.VITE_API_URL })

// Add a request interceptor
axiosInstance.interceptors.request.use((req) => {
    const token = window.localStorage.getItem("apiKey");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default axiosInstance;
