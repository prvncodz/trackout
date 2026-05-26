import axios from '../lib/axios'

const setService = {
    create: (exerciseId, data) => axios.post(`/set/create/${exerciseId}`, data),
    remove: (setId, exerciseId) => axios.delete(`/set/delete-set/${setId}/${exerciseId}`),
    update: (setId, data) => axios.patch(`/set/update-set/${setId}`, data),
    toggle: (setId) => axios.patch(`/set/toggle-set-completed/${setId}`),
}

export default setService
