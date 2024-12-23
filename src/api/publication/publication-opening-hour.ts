'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationOpeningHourSchema } from "@/validation-schema/opening-hour.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PublicationOpeningHourSchema>

export const PublicationOpeningHourUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/opening-hours`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'opening hour done' })
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