import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AppStore {
    curPage: string;
    setCurPage(page: string): void;
}

const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            curPage: "home",
            setCurPage: (page) => set({ curPage: page }),
        }),
        {
            name: "curpage-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

export { useAppStore }
