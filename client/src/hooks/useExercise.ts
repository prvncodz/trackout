import axios from "@/lib/axios"
import { ExpandedLog } from "@/types/Log.types"
import { Set } from "@/types/Set.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

async function handleUpdateExercise(note = "", name: string, id: string) {
    await axios.patch(`/exercise/update/${id}`, {
        note,
        name,
    })
}

export function useUpdateExercise(ActiveLog: string, exerciseId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ note, name }: { note?: string, name: string}) => handleUpdateExercise(note, name, exerciseId),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["log", ActiveLog], (oldData: ExpandedLog) => {
                return oldData.exercises.map((exercise) => (
                    exercise._id === exerciseId ? { ...exercise, name: variables.name, note: variables.note } : exercise
                ))
            })
        }
    })
}


