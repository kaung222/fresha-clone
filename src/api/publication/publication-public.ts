import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

export const PublicationPublicUpdate = () => {
    return useMutation<any, ErrorResponse>({
        mutationFn: async () => {
            return await ApiClient.patch(`/publication/info/publish`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'info-done' })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        }
    })
}