import visitManager from "@/api/Entity/VisitManager"

export default {
    state: {
        todayVisitCurrentEmployee: null,
        visitsCurrentEmployee: [],
        allVisits: []
    },
    getters: {
        getTodayCurrentEmployee: state => state.todayVisitCurrentEmployee,
        getAllCurrentEmployee: state => state.visitsCurrentEmployee,
        getAllVisits: state => state.allVisits,
    },
    mutations: {
        setTodayCurrentEmployee: (state, visit) => state.todayVisitCurrentEmployee = visit,
        setAllCurrentEmployee: (state, visits) => state.visitsCurrentEmployee = visits,
        setAllVisits: (state, visits) => state.allVisits = visits,
    },
    actions: {
        // сегодняшнее посещение текущего сотрудника
        async fetchTodayByCurrentEmployee({commit}) {
            return await visitManager.getTodayByCurrentEmployee().then(visit => {
                commit('setTodayCurrentEmployee', visit);
                return visit;
            });
        },

        // все посещения текущего сотрудника
        async fetchAllByCurrentEmployee({commit, getters}) {
            return await visitManager.getAllByCurrentEmployee().then(visits => {
                commit('setAllCurrentEmployee', visits)
                return getters.getAllCurrentEmployee;
            })
        },

        // сегодняшняя история конкретного сотрудника
        async fetchTodayByEmployeeId(store, id) {
            return await visitManager.getTodayByEmployeeId(id);
        },

        // вся история конкретного сотрудника
        async fetchAllByEmployeeId(store, id) {
            return await visitManager.getAllByEmployeeId(id)
        },

        // вся история
        async fetchAllHistory({commit, getters}) {
            return await visitManager.getAllHistory()
                .then(visits => {
                    commit('setAllVisits', visits)
                    return getters.getAllVisits;
                })
        },

        setTodayVisit({commit}, visit) {
            commit('setTodayCurrentEmployee', visit);
        }
    },
    namespaced: true,
}