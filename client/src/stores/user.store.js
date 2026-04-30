import { create } from 'zustand'
import gymhero from '../assets/gymhero.png';

const useAuth = create(set => ({
    isUserLogged: false,
    user: {
        _id: 1,
        fullname: "Praveen Pradhan",
        email: "prvncodz@gmail.com",
        height: 180,
        weight: 63,
        avatar: gymhero
    },
    userId: 1,
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
    setUserId: (id) => set({ userId: id }),
}))

export { useAuth };
