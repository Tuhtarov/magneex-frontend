import visitManager from "@/api/Entity/VisitManager"

export default {
    state: {
        todayVisit: null,
        visitsCurrentEmployee: []
    },
    getters: {
        getTodayVisit: state => state.todayVisit,
        getVisitsCurrentEmployee: state => state.visitsCurrentEmployee,
    },
    mutations: {
        setTodayVisit: (state, visit) => state.todayVisit = visit,
        setVisitsCurrentEmployee: (state, visits) => {
            state.visitsCurrentEmployee = visits
        },
    },
    actions: {
        async fetchTodayVisit({commit}) {
            return await visitManager.getTodayVisit().then(visit => {
                commit('setTodayVisit', visit);
                return visit;
            });
        },
        async fetchVisitsCurrentEmployee({commit, getters}) {
            return await visitManager.getAllCurrentEmployee().then(visits => {
                commit('setVisitsCurrentEmployee', visits)
                return getters.getVisitsCurrentEmployee;
            })
        },
        setTodayVisit({commit}, visit) {
            commit('setTodayVisit', visit);
        }
    },
    namespaced: true,
}