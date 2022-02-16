import axiosInstance from "@/api/Axios"

class VisitManager {
    async getTodayVisit() {
        return await axiosInstance.get('/visit/today-history')
            .then(res => res.data.visit);
    }

    async getAllCurrentEmployee() {
        return await axiosInstance.get('/visit/my-all-history')
            .then(res => res.data.visits);
    }
}

export default new VisitManager();