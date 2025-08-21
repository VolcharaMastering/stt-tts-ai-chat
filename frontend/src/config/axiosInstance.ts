import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",
});

export default axiosInstance;
