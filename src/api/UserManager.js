import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';
import codes from '@/api/ResponseCode.js';

class UserManager {
    responseError = null;

    getUser = async () => {
        let user = null;

        if (token.isEmpty()) return user;

        try {
            const response = await axiosInstance.get('/user/current');

            if (response.status === codes.HTTP_OK) {
                user = response.data.user;
            }
        } catch (e) {
            this.responseError = e;
        }

        return user;
    }

    getUsers = async () => {
        try {
            const response = await axiosInstance.get('/user/all');
            return Promise.resolve(response.data.users);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    create = async (user) => {
        return await axiosInstance.post('/user/create', {user: user})
            .then(response => Promise.resolve(response.data.user))
            .catch(error => Promise.reject(error))
    }

    hasResponseError = () => {
        return !!this.responseError;
    }

    getResponseError = () => {
        return this.responseError;
    }
}

export default new UserManager;