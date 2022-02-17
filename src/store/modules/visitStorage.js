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
        async fetchTodayVisit({ commit }) {
            return await visitManager.getTodayVisit().then(visit => {
                commit('setTodayVisit', visit);
                return visit;
            });
        },
        async fetchVisitsCurrentEmployee({ commit, getters }) {
            return await visitManager.getAllCurrentEmployee().then(visits => {
                commit('setVisitsCurrentEmployee', prepareVisits(visits))
                return getters.getVisitsCurrentEmployee;
            })
        },
        setTodayVisit({ commit }, visit) {
            commit('setTodayVisit', visit);
        }
    },
    namespaced: true,
}