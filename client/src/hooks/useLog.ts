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

async function handleCreateLog(name: string) {
    const res = await axios.post(`/log/create`, { logName: name })
    return res.data
}


export function useCreateLog(userId: string | undefined) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (name: string) => handleCreateLog(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs", userId] })
        },
    })
}

async function handleCreateExercise(logId: string, muscleGroup: string, name: string) {
    const res = await axios.post(`/exercise/create/${logId}`, { name, muscleGroup })
    return res.data
}

export function useCreateExercise(logId: string, ActiveLog: string | null) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ name, muscleGroup }: { name: string, muscleGroup: string }) => handleCreateExercise(logId, muscleGroup, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
        },
    })
}

async function handleMarkLogCompleted(logId: string) {
    const res = await axios.patch(`/log/mark-completed/${logId}`)
    return res.data
}

export function useMarkLogCompleted(logId: string, ActiveLog: string | null) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => handleMarkLogCompleted(logId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
        },
    })
}

async function handleDeleteExercise(logId: string, id: string) {
    const res = await axios.delete(`/exercise/delete/${logId}/${id}`)
    return res.data
}

export function useDeleteExercise(logId: string, ActiveLog: string | null) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (exerciseId: string) => handleDeleteExercise(logId, exerciseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
        },
    })
}

