'use client'
import { ApiClient } from "@/api/ApiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/products/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['allProducts'],
                exact: false
            })
        }
    })
}