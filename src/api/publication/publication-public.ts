import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

export const PublicationPublicUpdate = () => {
    return useMutation({
        mutationFn: async () => {
            return await ApiClient.patch(`/publication/info/publish`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'info-done' })
            return data;
        },
        onError(err) {
            toast({ title: err.message })
        }
    })
}