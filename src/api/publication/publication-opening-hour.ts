import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { PublicationOpeningHourSchema } from "@/validation-schema/opening-hour.schema"

type PayloadType = z.infer<typeof PublicationOpeningHourSchema>

export const PublicationOpeningHourUpdate = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/publication/info/opening-hours`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'opening hour done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}