'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type PayloadType = {
    id: string;
}

export const useDeleteMail = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/emails/${payload.id}`).then(res => res.data)
        },
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ['getAllMail'],
                exact: false
            })
        },
    })
}