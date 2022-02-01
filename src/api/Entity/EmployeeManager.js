import axiosInstance from '@/api/Axios.js';

class EmployeeManager {
    /**
     * @return {Promise<unknown>}
     */
    async fetchAll() {
        try {
            const response = await axiosInstance.get('/employees');
            const employees = response.data.employees;
            // console.dir(employees)
            return Promise.resolve(employees);
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

    /**
     * @return {Promise<unknown>}
     */
    async getById(id) {
        try {
            const response = await axiosInstance.get(`/employees/get/${id}`);
            const employee = this.#extractEmployee(response.data.employee)

            return Promise.resolve(employee);
        } catch (e) {
            return Promise.resolve(e);
        }
    }

    #extractEmployee(employeeFromResponse) {
        const {id, people, role, job_position} = employeeFromResponse;

        return  {
            id: id,
            people: people,
            role: {
                id: role.id,
                name: role.name,
            },
            job_position: {
                id: job_position.id,
                name: job_position.name
            }
        }
    }

    /**
     * @return {Promise<Number>}
     */
    async removeById(id) {
        try {
            const removedId = await axiosInstance.post(`/employees/delete/${id}`);
            return Promise.resolve(removedId);
        } catch (e) {
            return Promise.resolve(e);
        }
    }
}

export default new EmployeeManager();