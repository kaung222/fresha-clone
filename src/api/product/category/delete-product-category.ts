'use client'
import { ApiClient } from "@/api/ApiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DeleteProductCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/product-category/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['allProductCategory'],
                exact: false
            })
        }
    })
}