import axios from "@/api/Axios";

class JobPositionManager {
    async fetch() {
        return await axios.get('/job-positions').then(response => {
            return Promise.resolve(response.data.jobPositions);
        })
    }

    async create(name) {
        return await axios.post('/job-positions/create', {name})
            .then(r => Promise.resolve(r.data.jobPosition))
            .catch(e => Promise.reject(e));
    }
}

export default new JobPositionManager();