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
}

export default new RoleManager();