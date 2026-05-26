import axios from '../lib/axios'

const dashboardService = {
    getStats: () => axios.get('/dashboard/stats'),
}

export default dashboardService
