import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';
import codes from '@/api/ResponseCode.js';
import responseMessages from "@/api/ResponseMessages";

class UserManager {
    getUser = async (callbackOnError = () => {}) => {
        let user = null;

        if (token.isEmpty()) return user;

        try {
            const response = await axiosInstance.post('/user');

            if (response.status === codes.HTTP_OK) {
                user = response.data.user;
            }
        } catch (e) {
            if (e.message === responseMessages.NETWORK_ERROR_RESPONSE) {
                callbackOnError('Отсутствует соединение с сервером.')
            }
        }

        return user;
    }
}

export default new UserManager;