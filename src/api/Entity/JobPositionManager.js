import axios from "@/api/Axios";

class JobPositionManager {
    async fetch() {
        return await axios.get('/job-positions')
            .then(res => res.data.jobPositions)
    }

    async create(name) {
        return await axios.post('/job-positions/create', {name})
            .then(res => res.data.jobPosition)
    }
}

export default new JobPositionManager();