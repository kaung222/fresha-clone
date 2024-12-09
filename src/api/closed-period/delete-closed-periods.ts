'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { string } from "zod"
import { ErrorResponse } from "@/types/response"

type PayloadType = {
    id: string;
}

export const DeleteClosedPeriod = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<{}, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/closed-days/${payload.id}`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Closed day deleted successful" })
            queryClient.invalidateQueries({
                queryKey: ['getClosedDays'],
                exact: false
            })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });

        }
    })
}