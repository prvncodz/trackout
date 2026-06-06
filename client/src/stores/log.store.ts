import { Log } from "@/types/Log.types";
import { create } from "zustand"


export interface LogStore {
    logs: Log[];
    setLogs(logs: Log[]): void;
    addLog(log: Log): void;
    removeLog(id: string): void;
    duplicateLog(log: Log): void;
    editLog(id: string, name: string): void;
}

const useLogStore = create<LogStore>((set) => ({
    logs: [],
    setLogs: (logs) => set({ logs }),
    addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
    removeLog: (id) => set((state) => ({ logs: state.logs.filter((log) => log._id !== id) })),
    duplicateLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
    editLog: (id, name) => set((state) => ({ logs: state.logs.map(obj => obj._id === id ? { ...obj, logName: name } : obj) })),
}))

export default useLogStore
