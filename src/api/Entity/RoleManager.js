import axios from "@/api/Axios";

class RoleManager {
    async fetchAll() {
        try {
            const response = await axios.get('/roles');
            return Promise.resolve(response.data.roles);
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async createRole(name) {
        try {
            const response = await axios.post('/roles/create', {name});
            return Promise.resolve(response.data.role);
        } catch (e) {
            return Promise.reject(e)
        }
    }
}

export default new RoleManager();