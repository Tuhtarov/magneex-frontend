import axiosInstance from '@/api/Axios.js';

class EmployeeManager {
    /**
     * @return {Promise<unknown>}
     */
    async fetchAll() {
        return await axiosInstance.get('/employees')
            .then(res => Promise.resolve(res.data.employees))
            .catch(err => Promise.reject(err));
    }

    /**
     * @return {Promise<unknown>}
     */
    async create(data) {
        return await axiosInstance.post('/employees/create', data)
            .then(res => Promise.resolve(res.data.employee))
            .catch(err => Promise.resolve(err));
    }


    /**
     * @return {Promise<unknown>}
     */
    async edit(data) {
        return await axiosInstance.post('/employees/edit', data)
            .then(res => Promise.resolve(res.data))
            .catch(err => Promise.resolve(err));
    }

    /**
     * @return {Promise<unknown>}
     */
    async getById(id) {
        await axiosInstance.get(`/employees/get/${id}`)
            .then(res => Promise.resolve(res.data.employee))
            .catch(err => Promise.reject(err));
    }

    /**
     * @return {Promise<Number>}
     */
    async removeById(id) {
        await axiosInstance.delete(`/employees/delete/${id}`)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}

export default new EmployeeManager();