import axiosInstance from '@/api/Axios.js';

class EmployeeManager {
    /**
     * @return {Promise<unknown>}
     */
    async fetchAll() {
        return await axiosInstance.get('/employees')
            .then(res => res.data.employees)
    }

    /**
     * @return {Promise<unknown>}
     */
    async create(data) {
        return await axiosInstance.post('/employees/create', data)
            .then(res => res.data.employee)
    }


    /**
     * @return {Promise<unknown>}
     */
    async edit(data) {
        return await axiosInstance.patch('/employees/edit', data)
            .then(res => res.data)
    }

    /**
     * @return {Promise<unknown>}
     */
    async getById(id) {
        return await axiosInstance.get(`/employees/get/${id}`)
            .then(res => res.data.employee)
    }

    /**
     * @return {Promise<Number>}
     */
    async removeById(id) {
        return await axiosInstance.delete(`/employees/delete/${id}`)
            .then(res => res.data)
    }
}

export default new EmployeeManager();