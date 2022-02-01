import {loginInstance} from "@/api/Axios.js";
import codes from '@/api/ResponseCode.js';
import token from '@/api/TokenManager.js';
import messages from "@/api/ResponseMessages.js"


/**
 * 
 * @param string login 
 * @param string password 
 * @param callback onSuccess
 * @param callback onError 
 */
export async function login(login, password, onSuccess = null, onError = null) {
    try {
        const response = await loginInstance.post('/login_check', {
            login: login,
            password: password
        })

        if (response.status === codes.HTTP_OK) {
            token.save(response.data.token)
            onSuccess();
        }

    } catch (e) {
        if (e?.message === messages.NETWORK_ERROR_RESPONSE) {
            onError("Ошибка подключения к серверу")
        }

        if (e?.response?.status === codes.HTTP_UNAUTHORIZED) {
            onError("Неверный логин или пароль")
        }
    }
}

export async function logout() {
    try {
        await loginInstance.post('/logout')
    } catch (e) {
        console.error(e.message);
    }

    token.delete();
}