import axios from "axios";
import token from "@/api/TokenManager.js";
import codes from "@/api/ResponseCode.js"

let tokenValue = token.getSaved();

const axiosConfig = {
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
}

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(function (config) {
    if (tokenValue) {
        config.headers['Authorization'] = `Bearer ${tokenValue}`;
    }
    
    return config;
}, function (error) {
    // если интерцептор обнаружил ошибку с 401 кодом (нет авторизации)
    // перезагружаем страницу что бы перенаправить на страницу авторизации
    if (error.code === codes.HTTP_UNAUTHORIZED) {
        token.delere()
        location.reload()
    }

    return Promise.reject(error)
})

export default axiosInstance;