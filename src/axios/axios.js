import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({baseURL: import.meta.env.VITE_API_URL })

// Add a request interceptor
axiosInstance.interceptors.request.use((req) => {
    // Get the API key from local storage
    const apiKey = localStorage.getItem("apiKey")
    // If the API key exists, add it to the request headers
    if (apiKey) {
        req.headers["api_key"] = apiKey
    }
    return req
})

export default axiosInstance;
