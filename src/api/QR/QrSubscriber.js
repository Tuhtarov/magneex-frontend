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
     * @param callbackOnQrUpdate {function}
     */
    startSession = async (callbackOnQrUpdate) => {
        try {
            const config = await centrifugoConnection.fetchConfigForConnection()
            this.init(config)
        } catch (e) {
            console.dir(e)
        }

        this.#centrifuge.connect();
        this.#centrifuge.subscribe(this.channel, event => {
            callbackOnQrUpdate(event.data)
        });
    }

    /**
     * Закрываем соединение с сервером.
     */
    stopSession() {
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