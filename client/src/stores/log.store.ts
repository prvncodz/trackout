import { Log } from "@/types/Log.types";
import { create } from "zustand"


export interface LogStore {
    logs: Log[];
    activeLog: string | null;
    setActiveLog: (logId: string) => void,
    setLogs(logs: Log[]): void;
}

const useLogStore = create<LogStore>((set) => ({
    logs: [],
    activeLog: null,
    setActiveLog: (logId) => set({ activeLog: logId }),
    setLogs: (logs) => set({ logs }),
}))

export default useLogStore
