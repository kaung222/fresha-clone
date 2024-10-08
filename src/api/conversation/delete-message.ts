'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ConversationClient } from "../conversation-client"
import { toast } from "@/components/ui/use-toast";

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            return await ConversationClient.delete(`/messages/${id}`).then(res => res.data)
        },
        onSuccess: () => {
            toast({ title: "Message Delete done!" })
            queryClient.invalidateQueries({
                queryKey: ['GetMessages']
            })
        }
    })
}