import axios from "@/lib/axios"
import CreateSetSchema from "@/schemas/set.schema"
import type { CreateSetInput } from "@/schemas/set.schema"
import type { ExpandedLog } from "@/types/Log.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

async function handleUpdateSet(id: string, reps: number, weight: number, rest?: string) {
    const res = await axios.patch(`/set/update/${id}`, {
        reps,
        weight,
        rest: rest ?? "00:30",
    })
    return res.data
}

export function useUpdateSet(ActiveLog: string | null) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ setId, reps, weight, rest }: { setId: string, reps: number, weight: number, rest?: string }) => handleUpdateSet(setId, reps, weight, rest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["log", ActiveLog] })
        },
    })

}
async function toggleDone(id: string) {
    const res = await axios.patch(`/set/toggle-set-completed/${id}`, { isPr: false })
    return res.data
}

export function useToggleSetDone(ActiveLog: string | null, exerciseId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (setId: string) => toggleDone(setId),
        onSuccess: (data, setId) => {
            queryClient.setQueryData(["log", ActiveLog], (oldData: ExpandedLog) => {
                return oldData.exercises.map((exercise) => (
                    exercise._id === exerciseId ?
                        exercise.sets.map(set => (
                            set._id === setId ? { ...set, completed: !set.completed } : set
                        ))
                        : exercise
                ))

            })
        }
    })
}



async function handleCreateSet(exerciseId: string, data: CreateSetInput) {
    try {
        CreateSetSchema.parse(data)
        const res = await axios.post(`/set/create/${exerciseId}`, data)
        return res.data.data
    } catch (err: any) {
        throw err
    }
}

export function useCreateSet(exerciseId: string, ActiveLog: string | null, options?: { onSuccess?: () => void, onError?: () => void }) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newSet: CreateSetInput) => handleCreateSet(exerciseId, newSet),
        onSuccess: (data) => {
            queryClient.setQueryData(["log", ActiveLog], (oldData: ExpandedLog | undefined) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    exercises: oldData.exercises.map((exercise) => (
                        exercise._id === exerciseId ?
                            {
                                ...exercise,
                                sets: [...exercise.sets, data]
                            }
                            : exercise
                    ))
                }
            })
            options?.onSuccess?.()
        },
        onError: (err) => {
            toast.error(err.message)
            options?.onError?.()
        }
    })

}

async function handleDeleteSet(setId: string, exerciseId: string) {
    const res = await axios.delete(`/set/delete/${setId}/${exerciseId}`)
    return res.data
}

export function useDeleteSet(exerciseId: string, ActiveLog: string | null) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (setId: string) => handleDeleteSet(setId, exerciseId),
        onSuccess: (data, setId) => {
            queryClient.setQueryData(["log", ActiveLog], (oldData: ExpandedLog) => {
                return oldData.exercises.map((exercise) => (
                    exercise._id === exerciseId ?
                        exercise.sets.filter(set => set._id !== setId)
                        : exercise
                ))

            })
        }
    })
}


