import axios from "../lib/axios.js"

const userService = {
    signUp: (data) => axios.post("/user/signup", data),
    signIn: (data) => axios.post("/user/signin", data),
    getCurrentUser: () => axios.get("/user/current-user"),
    updateAccessAndRefreshTokens: () => axios.get("/user/refresh-tokens"),
    logOut: () => axios.post("/user/logout"),
    getProfile: () => axios.get("/user/profile"),
    deleteUser: () => axios.delete("/user/delete-user"),
    updateUserAvatar: (file) => axios.put("/user/update-avatar", file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    updateUserInfo: (data) => axios.patch("/user/update-info", data),
}

export default userService
