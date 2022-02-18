import visitManager from "@/api/Entity/VisitManager"

/**
 * @param {array} visits
 * @returns {array}
 */
const prepareVisits = visits => {
    const now = new Date()

    // преобразовать дату в формате: 14.02.2022
    const toDate = (dt) => {
        if (dt === null) return null;
        const date = new Date(dt).toLocaleDateString("ru");
        const isCurrentDay = date === now.toLocaleDateString("ru");

        return isCurrentDay ? "сегодня" : date;
    }

    // преобразовать время в формате: 12:40:21
    const toTime = dt => dt ? new Date(dt).toLocaleTimeString("ru") : null;

    return visits.map(v => {
        v.workDate = toDate(v.beginWorkTime);
        v.beginWorkTime = toTime(v.beginWorkTime);
        v.endWorkTime = toTime(v.endWorkTime);

        return v;
    });
}

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
                commit('setAllCurrentEmployee', prepareVisits(visits))
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
                .then(visits => prepareVisits(visits))
        },

        // вся история
        async fetchAllHistory({commit, getters}) {
            return await visitManager.getAllHistory().then(visits => {
                commit('setAllVisits', prepareVisits(visits))
                return getters.getAllVisits;
            })
        },

        setTodayVisit({commit}, visit) {
            commit('setTodayCurrentEmployee', visit);
        }
    },
    namespaced: true,
}