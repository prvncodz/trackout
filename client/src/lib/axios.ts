import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api/v1",
})

api.interceptors.response.use(
    res => res,
    async (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            await api.get("/user/refresh-tokens")
        }

        return Promise.reject(error);
    }
);

export default api
