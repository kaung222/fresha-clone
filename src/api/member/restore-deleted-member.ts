import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const RestoreDeletedMember = (id: string) => {
    return useQuery({
        queryKey: ['RestoreMember'],
        queryFn: async () => {
            return await ApiClient.get(`/members/${id}/restore`).then(res => res.data)
        }
    })
}