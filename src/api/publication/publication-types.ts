import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationTypesSchema } from "@/validation-schema/publication.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PublicationTypesSchema>

export const PublicationTypesUpdate = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/types`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Types done' })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        }
    })
}