// import { BASE_API_URL } from "@/api/Axios";
import axiosInstance from "@/api/Axios";

class QrUrlManager {
    async scan(token) {
        return await axiosInstance.get(`/qr/scan/${token}`)
            .then(res => res.data.visit)
    }

    getScanUrl(token) {
        // return `${BASE_API_URL}/qr-scan/${token}${id ? `/${id}` : ''}`
        return `http:/localhost:8080/qr-scan/${token}`
    }
}

export default new QrUrlManager();
