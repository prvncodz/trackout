import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAppStore = create(
    persist((set) => ({
        curPage: "home",
        setCurPage: (page) => set({ curPage: page }),
    }),
        {
            name: 'curpage-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export { useAppStore };
