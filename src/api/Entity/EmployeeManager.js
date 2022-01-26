import axiosInstance from '@/api/Axios.js';

class EmployeeManager {
    /**
     * @return {Promise<unknown>}
     */
    async fetchAll() {
        try {
            const response = await axiosInstance.get('/employees');
            return Promise.resolve(response.data.employees);
        } catch (e) {
            return Promise.reject(e)
        }
    }

    /**
     * @return {Promise<unknown>}
     */
    async create(data) {
        try {
            const result = await axiosInstance.post('/employees/create', data);
            return Promise.resolve(result.data);
        } catch (e) {
            return Promise.resolve(e);
        }
    }
}

export default new EmployeeManager();