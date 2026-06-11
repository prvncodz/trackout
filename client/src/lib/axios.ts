import { refreshTokens } from "@/hooks/useUser";
import { useAuth } from "@/stores/user.store";
import axios from "axios"
import { toast } from "sonner";

const api = axios.create({
    withCredentials: true,
    baseURL: "/api/v1",
})

api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;
        const message = error.response ? error.response.data.message : null;
        const originalReq = error.config;

        if (status === 401 && useAuth.getState().isUserLogged) {
            return refreshTokens(originalReq)
        } else if (status === 400) {
            toast.error("invalid input credentials")
        } else {
            toast.error(message ?? "something went wrong")
        }
        return Promise.reject(error);
    }
)

export default api
