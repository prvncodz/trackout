import { create } from "zustand";
import gymhero from "../assets/gym-hero.jpg";

const useAuth = create((set) => ({
    isUserLogged: false,
    user: {
        _id: 1,
        fullname: "Praveen Pradhan",
        email: "prvncodz@gmail.com",
        height: 180,
        weight: 63,
        avatar: gymhero,
        totalWorkouts: 23,
        streak: 30,
        activeDates: Array.from(
            { length: 15 },
            (_, i) => new Date(new Date().getFullYear(), 4, 1 + i)
        )
    },
    userId: 1,
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
    setUserId: (id) => set({ userId: id }),
}));

export { useAuth };
