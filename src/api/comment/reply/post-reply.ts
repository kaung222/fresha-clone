import { PostClient } from "@/api/PostClient";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query"

type ReplyPayload = {
    id: string;
    content: string;
    type: string;
}

export const useReplyComment = () => {
    return useMutation({
        mutationFn: async (payload: ReplyPayload) => {
            return await PostClient.post(`/reply/${payload.id}`,
                {
                    content: payload.content,
                    type: payload.type
                }
            ).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: 'reply success!' })
        }
    })
}