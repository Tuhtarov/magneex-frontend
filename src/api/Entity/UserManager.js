import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';

class UserManager {
    async getCurrent() {
        if (token.isEmpty()) return;

        return await axiosInstance.get('/users/current')
            .then(res => res.data.user)
    }

    async getAll() {
        return await axiosInstance.get('/users')
            .then(res => res.data.users)
    }

    async create(data) {
        return await axiosInstance.post('/users/create', data)
            .then(res => res.data.user)
    }
}

export default new UserManager();