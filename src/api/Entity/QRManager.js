import axiosInstance from '@/api/Axios.js';

class QRManager {
    /**
     * @return {Promise<unknown>}
     */
    async fetch() {
        return await axiosInstance.get('/employees')
            .then(res => Promise.resolve(res.qr))
            .catch(err => Promise.reject(err))
    }
}

export default new QRManager();