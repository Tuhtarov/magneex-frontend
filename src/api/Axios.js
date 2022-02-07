import axios from "axios";
import token from "@/api/TokenManager.js";
import codes from "@/api/ResponseCode.js"
import messages from "@/api/ResponseMessages.js"

let tokenValue = token.getSaved();

export const BASE_API_URL = 'http://127.0.0.1:8000/api';

export const axiosConfig = {
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}

export const axiosInstance = axios.create(axiosConfig);

export const loginInstance = axios.create(axiosConfig);


/** Ставим токен авторизации в каждый запрос на сервер */
axiosInstance.interceptors.request.use(config => {
    if (tokenValue) {
        config.headers['Authorization'] = `Bearer ${tokenValue}`;
    }

    return config;
}, error => Promise.reject(error))


/** Проверяем каждый ответ сервера на валидность авторизации */
axiosInstance.interceptors.response.use(config => config,
    error => {
        if (error?.message === messages.NETWORK_ERROR_RESPONSE && error.response === undefined) {
            console.error('Ошибка сети');
            console.dir(error);
        }

        if (error.response?.status === codes.HTTP_UNAUTHORIZED) {
            clearToken();
            location.reload();
        }

        return Promise.reject(error)
    }
)


export default axiosInstance;

function clearToken() {
    token.delete()
}