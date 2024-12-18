import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { PublicationBasicSchema } from "@/validation-schema/publication.schema"
import { z } from "zod"

type PayloadType = z.infer<typeof PublicationBasicSchema>

export const PublicationBasicInfoUpdate = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/basic-info`, payload).then(res => res.data)
        },
        onSuccess(data) {
            // toast({ title: 'info-done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}