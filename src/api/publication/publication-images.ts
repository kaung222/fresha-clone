import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationImagesSchema } from "@/validation-schema/publication.schema"

type PayloadType = z.infer<typeof PublicationImagesSchema>

export const PublicationImageUpdate = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/images`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'image done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}