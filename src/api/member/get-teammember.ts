import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";

export const GetTeamMember = () => {
    return useQuery<Member[]>({
        queryKey: ['getMembers'],
        queryFn: async () => {
            return await ApiClient.get('/members').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}