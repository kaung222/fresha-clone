import { PostClient } from "@/api/PostClient"
import { toast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"

export const useDeleteReply = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            return await PostClient.delete(`/reply/${id}`).then(res => res.data)
        },
        onSuccess: () => {
            toast({ title: "delete success" })
        }
    })
}