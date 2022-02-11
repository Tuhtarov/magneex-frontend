import manager from "@/api/Entity/UserManager.js";

export default {
    state: {
        currentUser: null,
        users: [],
    },
    getters: {
        getCurrentUser: state => state.currentUser,
        getCurrentRole: state => state.currentUser.role,
        userIsReady: state => state.currentUser !== null,
        getUsers: state => state.users,
    },
    mutations: {
        setCurrentUser: (state, user) => state.currentUser = user,
        setUsers: (state, users) => state.users = users,
        pushToUsers: (state, user) => state.users.push(user)
    },
    actions: {
        async fetchCurrentUser({dispatch}) {
            return await dispatch('request', {
                mutation: 'setCurrentUser', promise: manager.getCurrent()
            })
        },
        async fetchUsers({dispatch}) {
            return await dispatch('request', {
                mutation: 'setUsers', promise: manager.getAll()
            })
        },
        async createUser({dispatch}, user) {
            return await dispatch('request', {
                mutation: 'pushToUsers', promise: manager.create(user)
            })
        },
        async request({commit}, {mutation, promise}) {
            return await promise
                .then(data => {
                    commit(mutation, data)
                    return Promise.resolve(data)
                })
                .catch(err => Promise.reject(err));
        },
    },
    namespaced: true
}
