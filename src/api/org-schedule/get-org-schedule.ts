import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { OrgSchedule } from "@/types/org-schedule";

export const GetOrgSchedule = () => {
    return useQuery<OrgSchedule[]>({
        queryKey: ['getOrgSchedule'],
        queryFn: async () => {
            return await ApiClient.get('/org-schedule').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}