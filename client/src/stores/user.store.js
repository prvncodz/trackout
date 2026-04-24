import { create } from 'zustand'

const useAuth = create(set => ({
    isUserLogged: false,
    setIsUserLogged: (bool) => set({ isUserLogged: bool })
}))

export { useAuth };
