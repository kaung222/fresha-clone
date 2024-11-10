import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member"

export const GetUserProfile = (id: string) => {
    return useQuery<Member>({
        queryKey: ['userProfile'],
        queryFn: async () => {
            return await ApiClient.get(`/members/${id}/profile`).then(res => res.data)
        }
    })
}