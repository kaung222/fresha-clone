'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { PublicationBasicSchema } from "@/validation-schema/publication.schema"
import { z } from "zod"

type PayloadType = z.infer<typeof PublicationBasicSchema>

export const PublicationBasicInfoUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/basic-info`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'info-done' })
            queryClient.invalidateQueries({
                queryKey: ['getOrganizationProfile'],
                exact: false,
            })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}