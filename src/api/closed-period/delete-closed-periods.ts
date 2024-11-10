'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export const DeleteClosedPeriod = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/closed-days/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Closed day deleted successful" })
            queryClient.invalidateQueries({
                queryKey: ['getClosedDays'],
                exact: false
            })
        }
    })
}