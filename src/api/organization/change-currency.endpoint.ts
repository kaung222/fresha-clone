'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const useChangeCurrency = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { currency: string }) => {
            return await ApiClient.post(`/organizations/currency`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getOrganizationProfile'],
                exact: false
            })
        }
    })
}