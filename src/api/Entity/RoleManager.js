import axiosInstance from "@/api/Axios";

class RoleManager {
    async fetchAll() {
        return await axiosInstance.get('/roles')
            .then(res => res.data.roles)
    }

    async createRole(name) {
        return await axiosInstance.post('/roles/create', {name})
            .then(res => res.data.role);
    }
}

export default new RoleManager();