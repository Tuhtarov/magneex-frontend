import userManager from "@/api/UserManager.js";

let userAlreadyFetched = false;

export default {
    state: {
        user: null,
        errorResponse: null
    },
    getters: {
        getUser: state => state.user,
        getCurrentRole: state => state.user.role,
        userIsReady: state => state.user !== null,
        getErrorResponse: state => state.errorResponse
    },
    mutations: {
        setUser: (state, user) => state.user = user,
        setErrorResponse: (state, error) => state.errorResponse = error
    },
    actions: {
        async getUser({commit}) {
            if (!userAlreadyFetched) {
                userAlreadyFetched = true;

                const user = await userManager.getUser();

                if (user) {
                    commit('setUser', user);
                } else if (userManager.hasResponseError()) {
                    commit('setErrorResponse', userManager.getResponseError())
                }
            }
        }
    },
    namespaced: true
}