import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AppStore {
    curPage: string;
    setCurPage(): void;
}

const useAppStore = create(
    persist(
        (set) => ({
            curPage: "home",
            setCurPage: (page: string) => set({ curPage: page }),
        }),
        {
            name: "curpage-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

export { useAppStore }
