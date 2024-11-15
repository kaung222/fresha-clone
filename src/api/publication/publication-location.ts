import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationLocationSchema } from "@/validation-schema/publication.schema"

type PayloadType = z.infer<typeof PublicationLocationSchema>

export const PublicationLocationUpdate = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/location`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'location done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}