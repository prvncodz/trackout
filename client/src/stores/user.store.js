import { create } from 'zustand'

const useAuth = create(set => ({
    isUserLogged: false,
    user: {},
    userId: 1,
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
    setUserId : (id) => set({ userId: id }),
}))

export { useAuth };
