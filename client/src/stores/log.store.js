import { create } from "zustand"

const useLogStore = create((set) => ({
    logs: [],
    setLogs: (logs) => set({ logs }),
    addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
    removeLog: (id) => set((state) => ({ logs: state.logs.filter((log) => log._id !== id) })),
    duplicateLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
    editLog: (id, name) => set((state) => ({ logs: state.logs.map(obj => obj._id === id ? { ...obj, logName: name } : obj) })),
}))

export default useLogStore
