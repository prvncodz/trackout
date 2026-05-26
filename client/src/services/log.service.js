import axios from "../lib/axios.js"

const logService = {
    create: (data) => axios.post('/log/create', data),
    getAll: () => axios.get('/log/all-logs'),
    getLogById: (logId) => axios.get(`/log/${logId}`),
    markDone: (logId) => axios.patch(`/log/mark-completed/${logId}`),
    update: (logId, data) => axios.patch(`/log/update-log/${logId}`, data),
    remove: (logId) => axios.delete(`/log/delete-log/${logId}`),
    duplicate: (logId) => axios.post(`/log/duplicate-log/${logId}`),
}

export default logService
