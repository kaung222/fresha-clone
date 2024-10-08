import { useQuery } from "@tanstack/react-query"
import { ConversationClient } from "../conversation-client"

export const GetMessageByPartner = (partnerId: string) => {
    return useQuery({
        queryKey: ['PartnerMessages'],
        queryFn: async () => {
            return await ConversationClient.get(`/conversations/${partnerId}/messages`).then(res => res.data)
        }
    })
}