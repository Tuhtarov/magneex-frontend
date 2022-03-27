import axiosInstance from '@/api/Axios.js';
import {getHoursFromDatePeriod} from "@/features/HoursManager";


export function getJobHours({jobPosition}) {
    const begin = new Date(`1970-01-01 ${jobPosition.beginWorkTime}`)
    const end = new Date(`1970-01-01 ${jobPosition.endWorkTime}`)

    return getHoursFromDatePeriod(begin, end)
}

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
    async edit(id, data) {
        return await axiosInstance.post(`/employees/edit/${id}`, {employee: data})
            .then(res => res.data.employee)
    }

    /**
     * @return {Promise<unknown>}
     */
    async getById(id) {
        return await axiosInstance.get(`/employees/${id}`)
            .then(res => res.data.employee)
    }

    /**
     * @return {Promise<Number>}
     */
    async removeById(id) {
        return await axiosInstance.delete(`/employees/delete/${id}`)
            .then(res => res.data)
    }

    async fetchAllInOnline() {
        return await axiosInstance.get(`/employees/online`)
            .then(res => res.data.employees)
    }
}

export default new EmployeeManager();