import axios from "@/lib/axios"
import { Log } from "@/types/Log.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export async function fetchAllLogs() {
    const res = await axios.get("/log/all-logs")
    return res?.data?.data
}

async function handleDuplicateLog(id: string): Promise<Log> {
    const res = await axios.post(`/log/duplicate/${id}`)
    return res.data
}

export function useDuplicateLog(lodId: string, userId: string | undefined) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => handleDuplicateLog(lodId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs", userId] })
        },
    })
}

async function HandleDeleteLog(id: string): Promise<Log> {
    const res = await axios.delete(`/log/delete/${id}`)
    return res.data
}

export function useDeleteLog(logId: string, userId: string | undefined) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => HandleDeleteLog(logId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs", userId] })
        },
    })

}

async function handleEditLog(id: string, name: string) {
    const res = await axios.patch(`/log/update/${id}`, { logName: name })
    return res.data
}

export function useEditLog(logId: string, userId: string | undefined) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (name: string) => handleEditLog(logId, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs", userId] })
        },
    })
}


