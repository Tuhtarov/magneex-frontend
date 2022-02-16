import manager from "@/api/Entity/UserManager.js";

export default {
    state: {
        currentUser: null,
        currentPeople: null,
        currentEmployee: null,
        users: [],
    },
    getters: {
        getCurrentUser: state => state.currentUser,
        getCurrentRole: state => state.currentUser.employee.role.name,
        getCurrentEmployee: state => state.currentUser.employee,
        getFullName: ({currentPeople}) => {
            return currentPeople ?
                `${currentPeople.family} ${currentPeople.name} ${currentPeople.patronymic}` : null;
        },
        getFamilyAndName: ({currentPeople}) => {
            return currentPeople ?
                `${currentPeople.family} ${currentPeople.name}` : null;
        },
        userIsReady: state => state.currentUser !== null,
        getUsers: state => state.users,
    },
    mutations: {
        setCurrentUser: (state, user) => {
            state.currentUser = user
            state.currentPeople = user?.employee?.people
            state.currentEmployee = user?.employee;
        },
        setUsers: (state, users) => state.users = users,
        pushToUsers: (state, user) => state.users.push(user)
    },
    actions: {
        async fetchCurrentUser({commit}) {
            return await manager.getCurrent().then(user => {
                commit('setCurrentUser', user)
                return user
            })
        },
        async fetchUsers({commit}) {
            return await manager.getAll().then(users => {
                commit('setUsers', users)
                return users
            })
        },
        async createUser({commit}, user) {
            return await manager.create(user).then(newUser => {
                commit('pushToUsers', newUser)
                return newUser
            })
        },
    },
    namespaced: true
}
