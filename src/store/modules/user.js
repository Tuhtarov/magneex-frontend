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
                userAlreadyFetched = true;
                const user = await userManager.getUser();
                if (user) commit('setUser', user);
            }
        }
    },
    namespaced: true
}