import jobPositionManager from "@/api/JobPositionManager";

export default {
    namespaced: true,
    state: {
        jobPositions: []
    },
    getters: {
        getJobPositions: state => state.jobPositions,
    },
    mutations: {
        setJobPositions: (state, positions) => state.jobPositions = positions,
        pushJobPosition: (state, position) => state.jobPositions.push(position)
    },
    actions: {
        async fetchJobPositions({commit}) {
            return await jobPositionManager.fetch().then(positions => {
                commit('setJobPositions', positions)
                return Promise.resolve(positions);
            })
        },

        async createJobPosition({commit}, position) {
            return await jobPositionManager.create(position).then(newPosition => {
                commit('pushJobPosition', newPosition)
                return Promise.resolve(newPosition)
            })
        },
    },
}