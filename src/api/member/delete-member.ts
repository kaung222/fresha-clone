'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

type PayloadType = {
    id: string;
}

export const DeleteMember = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<{}, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/members/${payload.id}`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Member deleted successful" })
            queryClient.invalidateQueries({
                queryKey: ['getMembers'],
                exact: false
            })
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}