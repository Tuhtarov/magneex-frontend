import axiosInstance from "@/api/Axios";

class CentrifugoConnection {
    SERVER_ROUTE = '/qr/connection';

    /**
     * Получаем данные для соединения с сервером
     */
    async fetchConnection() {
        return await axiosInstance.get(this.SERVER_ROUTE)
            .then(({data}) => ({
                    config: data.config,
                    qr: data.qr
                })
            );
    }

    /**
     * Отписаться от соединения с сервером
     */
    async unsubscribeMe() {
        return await axiosInstance.post(`${this.SERVER_ROUTE}/close`)
            .then(res => res.data)
    }
}

export default new CentrifugoConnection();