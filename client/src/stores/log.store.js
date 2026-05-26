import { create } from "zustand";


const useLogStore = create((set) => ({
    logs: [],
    setLogs: (logs) => set({ logs }),
    addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
}))

export default useLogStore
