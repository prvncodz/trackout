import { refreshTokens } from "@/hooks/useUser";
import { useAppStore } from "@/stores/app.store";
import { useAuth } from "@/stores/user.store";
import axios from "axios"
import { toast } from "sonner";

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api/v1",
})

api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;
        const message = error.response ? error.response.data.message : null;
        const originalReq = error.config;

        if (status === 401 && useAuth.getState().isUserLogged) {
            refreshTokens(originalReq)
        } else if (status === 400) {
            if (message && message.includes("refresh token")) {
                useAuth.persist.clearStorage()
                useAppStore.persist.clearStorage()
                window.location.href = "/signin"
            }
            else toast.error("invalid input credentials")
        } else {
            toast.error(message)
        }
        return Promise.reject(error);
    }
)

export default api
