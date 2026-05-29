import axios from "axios"

export default axios.create({
    withCredentials: true,
    baseURL: "https://trackout-production.up.railway.app/api/v1",
})
