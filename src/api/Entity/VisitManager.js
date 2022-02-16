import axiosInstance from "@/api/Axios"

class VisitManager {
    async getTodayVisit() {
        return await axiosInstance.get('/visit/today-history')
            .then(res => res.data.visit)
    }
}

export default new VisitManager();