import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({baseURL: import.meta.env.VITE_API_URL })

// Add a request interceptor
axiosInstance.interceptors.request.use((req) => {
    const apiKey = localStorage.getItem("apiKey")
    if (apiKey) {
        req.headers["api_key"] = apiKey
    }
    return req
})

export default axiosInstance;
