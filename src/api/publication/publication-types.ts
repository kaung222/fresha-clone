import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationTypesSchema } from "@/validation-schema/publication.schema"

type PayloadType = z.infer<typeof PublicationTypesSchema>

export const PublicationTypesUpdate = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/types`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Types done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}