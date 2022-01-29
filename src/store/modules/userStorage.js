import userManager from "@/api/UserManager.js";

let userAlreadyFetched = false;

export default {
    state: {
        user: null,
        users: [],
        errorResponse: null
    },
    getters: {
        getUser: state => state.user,
        getUsers: state => state.users,
        getCurrentRole: state => state.user.role,
        userIsReady: state => state.user !== null,
        getErrorResponse: state => state.errorResponse
    },
    mutations: {
        setUser: (state, user) => state.user = user,
        setUsers: (state, users) => state.users = users,
        setErrorResponse: (state, error) => state.errorResponse = error,
        pushToUsers: (state, user) => state.users.push(user)
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
        },
        async fetchUsers({commit}) {
            return await userManager.getUsers()
                .then(users => {
                    commit('setUsers', users);
                    return Promise.resolve(users);
                })
                .catch(e => Promise.reject(e));
        },
        async createUser({commit}, user) {
            return await userManager.create(user)
                .then(createdUser => {
                    commit('pushToUsers', createdUser)
                    return Promise.resolve(createdUser)
                })
                .catch(err => Promise.reject(err));
        }
    },
    namespaced: true
}