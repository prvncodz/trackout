import axios from "@/lib/axios"
import type { ExpandedLog } from "@/types/Log.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

async function handleCreateExercise(logId: string, muscleGroup: string, name: string) {
    const res = await axios.post(`/exercise/create/${logId}`, { name, muscleGroup })
    return res.data.data
}

export function useCreateExercise(logId: string, ActiveLog: string | null, options?: { onSuccess?: () => void, onError?: () => void }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ name, muscleGroup }: { name: string, muscleGroup: string }) => handleCreateExercise(logId, muscleGroup, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
            options?.onSuccess?.()
        },
        onError: (err) => {
            toast.error(err.message)
            options?.onError?.()
        }
    })
}


async function handleDeleteExercise(logId: string, id: string) {
    const res = await axios.delete(`/exercise/delete/${logId}/${id}`)
    return res.data
}

export function useDeleteExercise(logId: string, ActiveLog: string | null, options?: { onSuccess?: () => void, onError?: () => void }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (exerciseId: string) => handleDeleteExercise(logId, exerciseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}

async function handleUpdateExercise(id: string, note = "", name?: string) {
    await axios.patch(`/exercise/update/${id}`, {
        note,
        name,
    })
}

export function useUpdateExercise(ActiveLog: string | null, exerciseId: string, options?: { onSuccess?: () => void, onError?: () => void }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ note, name }: { note?: string, name?: string }) => handleUpdateExercise(exerciseId,note, name),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["log", ActiveLog], (oldData: ExpandedLog) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    exercises: oldData.exercises.map((exercise) => (
                        exercise._id === exerciseId ? { ...exercise, name: variables.name, note: variables.note } : exercise
                    ))
                }
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}


