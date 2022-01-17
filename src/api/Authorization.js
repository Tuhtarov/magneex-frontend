import axiosInstance from "@/api/Axios.js";
import codes from '@/api/ResponseCode.js';
import token from '@/api/TokenManager.js';

export async function login(login, password) {
    let response = null;

    try {
        response = await axiosInstance.post('/login_check', {
            login: login,
            password: password
        })

        if (response.status === codes.HTTP_OK) {
            token.save(response.data.token)
        } else {
            response = null;
        }
    } catch (e) {
        token.delete()
    }

    return response;
}

export async function logout() {
    try {
        await axiosInstance.post('/logout')
    } catch (e) {
        console.log(e.message);
    }
    token.delete();
}