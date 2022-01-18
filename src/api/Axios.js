import axios from "axios";
import token from "@/api/TokenManager.js";
import codes from "@/api/ResponseCode.js"
import messages from "@/api/ResponseMessages.js"


let tokenValue = token.getSaved();

const axiosConfig = {
    baseURL: 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
}

const axiosInstance = axios.create(axiosConfig);

export const loginInstance = axios.create(axiosConfig);


/** Ставим в каждый запрос на сервак токен авторизации */
axiosInstance.interceptors.request.use(config => {
    if (tokenValue) {
        config.headers['Authorization'] = `Bearer ${tokenValue}`;
    }

    return config;
}, error => Promise.reject(error))


/** Обработка ошибок во время получения ответа */
axiosInstance.interceptors.response.use(config => config,
    error => {
        if (error?.message === messages.NETWORK_ERROR_RESPONSE || error.response === undefined) {
            console.error('Ошибка сети');
            console.dir(error)
        }

        if (error.response?.status === codes.HTTP_UNAUTHORIZED) {
            clearToken();
        }

        return Promise.reject(error)
    }
)


export default axiosInstance;

function clearToken() {
    token.delete()
}