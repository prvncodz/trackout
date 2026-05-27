import { create } from "zustand";

const useAuth = create((set) => ({
    isUserLogged: false,
    user: {},
    errors: null,
    isLoading: false,
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
}));

export { useAuth };

