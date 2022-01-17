import userManager from "@/api/UserManager.js";

let userAlreadyFetched = false;

export default {
    state: {
        user: null
    },
    getters: {
        getUser: state => state.user,
    },
    mutations: {
        setUser: (state, user) => state.user = user,
    },
    actions: {
        async getUser({commit}) {
            if (!userAlreadyFetched) {
                const user = await userManager.getUser();
                if (user) commit('setUser', user);
                userAlreadyFetched = true;
            }
        }
    },
    namespaced: true
}