import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationLocationSchema } from "@/validation-schema/publication.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PublicationLocationSchema>

export const PublicationLocationUpdate = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/location`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'location done' })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error

        }
    })
}