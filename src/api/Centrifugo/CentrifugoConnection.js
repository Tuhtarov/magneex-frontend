import axiosInstance from "@/api/Axios";

class CentrifugoConnection {
    SERVER_ROUTE = '/qr/connection';

    /**
     * Получаем данные для соединения с сервером
     * @returns {Promise<AxiosResponse<any>>}
     */
    async fetchConnection() {
        return await axiosInstance.get(this.SERVER_ROUTE)
            .then(({data}) => {
                return Promise.resolve({
                    config: data.config,
                    qr: data.qr
                })
            });
    }

    /**
     * Отписаться от соединения с сервером
     * @returns {Promise<AxiosResponse<any>>}
     */
    async unsubscribeMe() {
        return await axiosInstance.post(`${this.SERVER_ROUTE}/close`)
            .then(res => Promise.resolve(res.data))
            .catch(err => console.dir(err));
    }
}

export default new CentrifugoConnection();