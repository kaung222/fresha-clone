import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ConversationClient } from "../conversation-client"
import { toast } from "@/components/ui/use-toast";

type SendMessageType = {
    content: string;
    conversationId: string | string[];
    type: string;
}

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['SendMessage'],
        mutationFn: async (payload: SendMessageType) => {
            return await ConversationClient.post('messages', payload).then(res => res.data);
        },
        onSuccess: () => {
            // toast({ title: "Send message successfully!." })
            // queryClient.invalidateQueries({
            //     queryKey: ["GetMessages"],
            //     exact: false,
            // })
        }
    })
}