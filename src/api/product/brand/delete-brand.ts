'use client'
import { ApiClient } from "@/api/ApiClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DeleteBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/brands/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['allBrands'],
                exact: false
            })
        }
    })
}