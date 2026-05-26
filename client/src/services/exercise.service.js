import axios from '../lib/axios'

const exerciseService = {
    add: (logId, data) => axios.post(`/exercise/create/${logId}`, data),
    update: (exerciseId, data) => axios.patch(`/exercise/update-exercise/${exerciseId}`, data),
    remove: (logId, exerciseId) => axios.delete(`/exercise/delete-exercise/${logId}/${exerciseId}`),
}

export default exerciseService
