'use client'
import { ApiClient } from "@/api/ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type PayloadType = {
    id: string
}

export const DeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/products/${payload.id}`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Product Delete Successfully" })
            queryClient.invalidateQueries({
                queryKey: ['allProducts'],
                exact: false
            })
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}