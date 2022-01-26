import roleManager from "@/api/Entity/RoleManager";

export default {
    namespaced: true,
    state: {
        roles: []
    },
    getters: {
        getRoles: state => state.roles
    },
    mutations: {
        setRoles: (state, roles) => state.roles = roles
    },
    actions: {
        async fetchRoles({commit}) {
            return roleManager.fetchAll()
                .then(roles => {
                    commit('setRoles', roles)
                    Promise.reject(roles)
                })
                .catch(error => Promise.reject(error));
        }
    }
}