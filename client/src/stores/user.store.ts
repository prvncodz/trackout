import { create } from "zustand"

export interface User {
    _id: string;
    avatar?: {
        url: string;
        public_id: string;
    },
    fullname: string;
    email: string;
    height: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
}

interface AuthStore {
    isUserLogged: boolean;
    user: User | null;
    isLoading: boolean;
    activeDates: Date[];
    setIsUserLogged: (bool: boolean) => void;
    setUser: (user: User | null) => void;
    setActiveDates: (dates: Date[]) => void;
}


const useAuth = create<AuthStore>((set) => ({
    isUserLogged: false,
    user: null,
    isLoading: false,
    activeDates: [],
    setIsUserLogged: (bool) => set({ isUserLogged: bool }),
    setUser: (user) => set({ user: user }),
    setActiveDates: (dates) => set({ activeDates: dates }),
}))

interface StasStore {
    stats: object;
    setStats: (stats: object) => void;
}

const useStats = create<StasStore>((set) => ({
    stats: {},
    setStats: (stats) => set({ stats: stats }),
}))

export { useAuth, useStats }
