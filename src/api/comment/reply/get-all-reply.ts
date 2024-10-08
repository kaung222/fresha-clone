
import { PostClient } from "@/api/PostClient"
import { Reply } from "@/types/reply"
import { useQuery } from "@tanstack/react-query"

export const useGetReply = (id: string) => {
    return useQuery<Reply[]>({
        queryKey: ['GetReply'],
        queryFn: async () => {
            return await PostClient.get(`/reply/${id}`).then(res => res.data)
        }
    })
}