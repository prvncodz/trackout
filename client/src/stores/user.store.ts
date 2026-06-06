import { User } from "@/types/User.types";
import { create } from "zustand"
import { CompletedWorkout } from "@/types/CompletedWorkout.types";


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

interface Stats {
    recentWorkouts: (CompletedWorkout & { timeAgo: string })[];
    totalWorkouts: number;
    totalActiveDays: number;
    consistencyStreak: number
    totalPrs: number;
    chartStats: any;

}

interface StatsStore {
    stats: Stats | null
    setStats: (stats: Stats | null) => void;
}

const useStats = create<StatsStore>((set) => ({
    stats: null,
    setStats: (stats) => set({ stats: stats }),
}))

export { useAuth, useStats }
