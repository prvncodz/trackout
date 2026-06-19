import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AppStore {
    curPage: string;
    loading: boolean;
    setLoading(bool: boolean): void;
    setCurPage(page: string): void;
}

const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            curPage: "home",
            loading: false,
            setLoading: (bool) => set({ loading: bool }),
            setCurPage: (page) => set({ curPage: page }),
        }),
        {
            name: "curpage-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

interface Theme{
    theme:string;
    setTheme:(theme:string) => void;
}
const useThemeStore = create<Theme>()(
    persist(
        (set) => ({
            theme: "light",
            setTheme: (theme) => set({ theme: theme })
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export { useAppStore ,useThemeStore}
