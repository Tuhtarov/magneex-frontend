import token from '@/api/TokenManager.js'
import axiosInstance from '@/api/Axios.js';
import codes from '@/api/ResponseCode.js';

class UserManager {
    getUser = async () => {
        let user = null;

        if (token.isEmpty()) return user;

        try {
            const response = await axiosInstance.post('/user');

            if (response.status === codes.HTTP_OK) {
                user = response.data.user;
            }
        } catch (e) {
            console.log(e);
        }

        return user;
    }
}

export default new UserManager;