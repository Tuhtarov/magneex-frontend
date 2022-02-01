class TokenManager {
    tokenKey = 'token'

    /**
     * Сохранить токен.
     * @param token : string
     */
    save(token) {
        localStorage.setItem(this.tokenKey, token)
    }

    /**
     * Получить сохраненный токен.
     * @return string|null
     */
    getSaved() {
        return localStorage.getItem(this.tokenKey) ?? null;
    }

    /**
     * Существует ли сохранённый токен.
     * @return boolean
     */
    isEmpty() {
        return this.getSaved() === null;
    }

    /**
     * Стереть токен с LocalStorage
     */
    delete() {
        localStorage.removeItem(this.tokenKey);
    }
}

export default new TokenManager;