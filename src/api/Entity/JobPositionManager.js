import axios from "@/api/Axios";

class JobPositionManager {
    async fetch() {
        return await axios.get('/job-positions')
            .then(res => res.data.jobPositions)
    }

    async create(entity) {
        return await axios.post('/job-positions/create', entity)
            .then(res => res.data.jobPosition)
    }
}

export default new JobPositionManager();