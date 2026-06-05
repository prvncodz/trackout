import axios from "axios"

export default axios.create({
    withCredentials: true,
    baseURL: "/api/v1",
})
