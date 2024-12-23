'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationLocationSchema } from "@/validation-schema/publication.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PublicationLocationSchema> & {
    country: string;
    city: string;
}

export const PublicationLocationUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/location`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'location done' })
            queryClient.invalidateQueries({
                queryKey: ['getOrganizationProfile'],
                exact: false,
            })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error

        }
    })
}