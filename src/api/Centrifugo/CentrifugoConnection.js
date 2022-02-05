import axiosInstance from "@/api/Axios";

class CentrifugoConnection {
    SERVER_ROUTE = '/qr-centrifugo/connection';

    /**
     * Получаем данные для соединения с сервером
     * @returns {Promise<AxiosResponse<any>>}
     */
    async fetchConfigForConnection() {
        return await axiosInstance.get(this.SERVER_ROUTE)
            .then(res => {
                const config = this.#extractConfigFromResponse(res);
                return Promise.resolve(config)
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

    /**
     * @private
     */
    #extractConfigFromResponse({data}) {
        return {
            url: data.url,
            token: data.token,
            channel: data.channel
        }
    }

    async mockScan() {
        return await axiosInstance.get('/qr-centrifugo/scan-qr/token')
            .then(res => Promise.resolve(res.data))
            .catch(err => console.dir(err))
    }
}

export default new CentrifugoConnection();