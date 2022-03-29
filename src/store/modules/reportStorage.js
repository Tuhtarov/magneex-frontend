import axiosInstance from "@/api/Axios";

export default {
    state: {
        allTardies: [],
        allOverworks: [],

        tardiesLoading: null,
        overworksLoading: null,
    },
    getters: {
        getAllOverworks: state => state.allOverworks,
        getAllTardies: state => state.allTardies,

        tardiesIsLoading: state => state.tardiesLoading,
        overworksIsLoading: state => state.overworksLoading,
    },
    mutations: {
        setAllOverworks: (state, overworks) => {
            state.allOverworks = overworks
            state.overworksLoading = false
        },
        setAllTardies: (state, tardies) => {
            state.allTardies = tardies
            state.tardiesLoading = false
        },

        setTardiesLoading: (state, val) => state.tardiesLoading = val,
        setOverworksLoading: (state, val) => state.overworksLoading = val,
    },
    actions: {
        // опоздание конкретного сотрудника
        async fetchTardiesByEmployeeId(st, id) {
            return await axiosInstance.get(`/report/tardies/${id}`)
                .then(res => res.data.tardies);
        },

        // переработки конкретного сотрудника
        async fetchAllOverworksByEmployeeId(st, id) {
            return await axiosInstance.get(`/report/overworks/${id}`)
                .then(res => res.data.overworks);
        },

        // все опоздания
        async fetchAllTardies({commit}) {
            commit('setTardiesLoading', true);

            return await axiosInstance.get(`/report/tardies`)
                .then(res => {
                    console.dir(res.data.tardies)
                    commit('setAllTardies', res.data.tardies)
                });
        },

        // все переработки
        async fetchAllOverworks({commit}) {
            commit('setOverworksLoading', true);

            return await axiosInstance.get(`/report/overworks`)
                .then(res => {
                    console.dir(res.data.overworks)
                    commit('setAllOverworks', res.data.overworks)
                });
        },
    },
    namespaced: true,
}