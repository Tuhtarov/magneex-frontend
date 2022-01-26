import axios from "@/api/Axios";

class JobPositionManager {
    async fetch() {
        return await axios.get('/job-positions').then(response => {
            return Promise.resolve(response.data.jobPositions);
        })
    }

    async create(data) {
        return await axios.post('/job-positions/create', data)
    }
}

export default new JobPositionManager();