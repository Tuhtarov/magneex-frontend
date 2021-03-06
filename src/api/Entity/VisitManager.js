import axiosInstance from "@/api/Axios"

class VisitManager {
    async getTodayByCurrentEmployee() {
        return await axiosInstance.get('/visits/today-history')
            .then(res => res.data.visit);
    }

    async getTodayByEmployeeId(id) {
        return await axiosInstance.get(`/visits/today-history/${id}`)
            .then(res => res.data.visit);
    }

    async getAllByCurrentEmployee() {
        return await axiosInstance.get('/visits/my-all-history')
            .then(res => res.data.visits);
    }

    async getAllByEmployeeId(id) {
        return await axiosInstance.get(`/visits/${id}`)
            .then(res => res.data.visits);
    }

    async getAllHistory() {
        return await axiosInstance.get(`/visits/`)
            .then(res => res.data.visits);
    }

}

export default new VisitManager();