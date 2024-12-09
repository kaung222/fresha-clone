'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

export const DeleteClient = () => {
    const queryClient = useQueryClient()
    return useMutation<{}, ErrorResponse, { id: string }>({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/clients/${payload.id}`).then(res => res.data);
        },
        onSuccess(data, variables, context) {
            toast({ title: 'client delete successful' })
            queryClient.invalidateQueries({
                queryKey: ['allClients'],
                exact: false
            })
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}