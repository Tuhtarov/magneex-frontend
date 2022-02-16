import visitManager from "@/api/Entity/VisitManager"

export default {
    state: {
        todayVisit: null
    },
    getters: {
        getTodayVisit: state => state.todayVisit,
    },
    mutations: {
        setTodayVisit: (state, visit) => state.todayVisit = visit,
    },
    actions: {
        async fetchTodayVisit({ commit }) {
            return await visitManager.getTodayVisit().then(visit => {
                commit('setTodayVisit', visit);
                return visit;
            });
        },
        setTodayVisit({ commit }, visit) {
            commit('setTodayVisit', visit);
        }
    },
    namespaced: true,
}