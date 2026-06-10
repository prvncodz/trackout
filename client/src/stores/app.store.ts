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

export { useAppStore }
