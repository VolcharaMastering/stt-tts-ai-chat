import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

export default axiosInstance;
