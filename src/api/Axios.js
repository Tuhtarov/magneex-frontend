import axios from "axios";
import token from "@/api/TokenManager.js";

let tokenValue = token.getSaved();

const axiosConfig = {
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenValue}`
    }
}

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;