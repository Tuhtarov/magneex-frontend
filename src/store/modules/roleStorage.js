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
        setRoles: (state, roles) => state.roles = roles,
        pushRole: (state, role) => state.roles.push(role)
    },
    actions: {
        async fetchRoles({commit}) {
            return roleManager.fetchAll()
                .then(roles => {
                    commit('setRoles', roles);
                    return roles
                })
        },

        async createRole({commit}, name) {
            return roleManager.createRole(name)
                .then(role => {
                    commit('pushRole', role);
                    return role
                })
        }
    }
}
