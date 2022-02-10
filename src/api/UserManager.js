import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';

class UserManager {
    async getCurrent() {
        if (token.isEmpty()) return;

        return await axiosInstance.get('/user/current')
            .then(res => Promise.resolve(res.data.user))
            .catch(err => Promise.reject(err));
    }

    async getAll() {
        return await axiosInstance.get('/user/all')
            .then(response => Promise.resolve(response.data.users))
            .catch(err => Promise.reject(err));
    }

    async create(user) {
        return await axiosInstance.post('/user/create', {user: user})
            .then(response => Promise.resolve(response.data.user))
            .catch(error => Promise.reject(error))
    }
}

export default new UserManager();