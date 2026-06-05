import { create } from "zustand"

const useAuth = create((set) => ({
    isUserLogged: false,
    user: {},
    errors: null,
    isLoading: false,
    activeDates: [],
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
    setActiveDates: (dates) => set({ activeDates: dates }),
}))

const useStats = create((set) => ({
    stats: {},
    setStats: (stats) => set({ stats: stats }),
}))

export { useAuth, useStats }
