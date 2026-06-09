import axios from "@/lib/axios"
import { ExpandedLog } from "@/types/Log.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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
