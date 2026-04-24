import { create } from "zustand";

const useAppStore = create((set) => ({
    curPage: "home",
    setCurPage: (page) => set({ curPage: page }),
}));

export {useAppStore}; 
