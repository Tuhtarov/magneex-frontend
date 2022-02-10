import {BASE_API_URL} from "@/api/Axios";
import axiosInstance from "@/api/Axios";

class QrUrlManager {
    async scanTest(scanUrl) {
        return await axiosInstance.get(scanUrl)
            .then(res => Promise.resolve(res.data))
    }

    getScanUrl(token, id) {
        if (!token) {
            console.error('token is undefined (QrScanner)');
            return;
        }

        return `${BASE_API_URL}/qr/scan/${token}${id ? `/${id}` : ''}`
    }
}

export default new QrUrlManager();
