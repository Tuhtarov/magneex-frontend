import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';
import codes from '@/api/ResponseCode.js';

class UserManager {
    responseError = null;

    getUser = async () => {
        let user = null;

        if (token.isEmpty()) return user;

        try {
            const response = await axiosInstance.post('/user');

            if (response.status === codes.HTTP_OK) {
                user = response.data.user;
            }
        } catch (e) {
            this.responseError = e;
        }

        return user;
    }

    hasResponseError = () => {
        return !!this.responseError;
    }

    getResponseError = () => {
        return this.responseError;
    }
}

export default new UserManager;