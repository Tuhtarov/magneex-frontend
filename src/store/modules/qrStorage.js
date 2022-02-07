export default {
    namespaced: true,
    state: {
        QR: null
    },
    getters: {
        getQR: state => state.QR
    },
    mutations: {
        setQR: (state, QR) => state.QR = QR,
    },
    actions: {
    }
}