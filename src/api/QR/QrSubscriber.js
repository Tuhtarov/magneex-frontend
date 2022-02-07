import Centrifuge from 'centrifuge';
import centrifugoConnection from "@/api/Centrifugo/CentrifugoConnection";

class QrSubscriber {
    /**
     * @type {Centrifuge}
     */
    #centrifuge = null

    channel = null

    /**
     * @param object {url, token, channel}
     */
    init({url, token, channel}) {
        this.#centrifuge = new Centrifuge(url);
        this.channel = channel

        // токен, идентифицирующий подписчика
        this.#centrifuge.setToken(token);
    }

    /**
     * Подписываемся на обновления сервера.
     * @param cbUpdate {function}
     * @param cbError {function}
     */
    startSession = async (cbUpdate, cbError) => {
        try {
            const connection = await centrifugoConnection.fetchConnection()
            this.init(connection.config)
            cbUpdate(connection.qr)

        } catch (e) {
            cbError('При попытке соединения с сервером возникла ошибка.')
            console.dir(e)
        }

        this.#centrifuge.connect();
        this.#centrifuge.subscribe(this.channel, ({data}) => {
            cbUpdate(data.qr)
        });
    }

    /**
     * Закрываем соединение с сервером.
     */
    closeSession() {
        if (this.#centrifuge && this.#centrifuge.isConnected()) {
            this.#centrifuge.disconnect();
        }

        // отписываем пользователя
        if (centrifugoConnection) {
            centrifugoConnection.unsubscribeMe();
        }
    }
}

export default new QrSubscriber();