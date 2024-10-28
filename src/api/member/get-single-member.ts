import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member"
import { useParams } from "next/navigation"

export const GetSingleMember = (id: string) => {
    const { teamId } = useParams()
    return useQuery<Member>({
        queryKey: ['GetSingleMember', id, teamId],
        queryFn: async () => {
            return await ApiClient.get(`/members/${id}`).then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })
}