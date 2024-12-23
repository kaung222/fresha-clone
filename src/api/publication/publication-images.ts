'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationImagesSchema } from "@/validation-schema/publication.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PublicationImagesSchema>

export const PublicationImageUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/images`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'image done' })
            queryClient.invalidateQueries({
                queryKey: ['getOrganizationProfile'],
                exact: false,
            })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
        }
    })
}