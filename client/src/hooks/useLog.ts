import axios from "@/lib/axios"
import { Log } from "@/types/Log.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

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
    console.log("invalidating for userId:", userId)

    return useMutation({
        mutationFn: () => handleDuplicateLog(lodId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["logs", userId] })
            toast.success("log duplicated successfully")
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || err?.message
            toast.error(message)
        }
    })
}


