import { useQuery } from "@tanstack/react-query"
import { ConversationClient } from "../conversation-client"
import { Clinic } from "@/types/clinic"
import { User } from "@/types/user";
import { Conversation } from "@/types/conversation";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

export type ConversationDetailResponse = {
    clinic: Clinic;
    user: User;
    _doc: Conversation;
}

export const GetUserConversationsDetail = (userId: string) => {
    const { getQuery } = useSetUrlParams();
    const conversationId = getQuery('chat')
    return useQuery<ConversationDetailResponse>({
        queryKey: ['UserConversations', conversationId],
        queryFn: async () => {
            return await ConversationClient.get(`/conversations/${userId}`).then(res => res.data)
        }
    })
}