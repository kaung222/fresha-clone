import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";
import { ClosedPeriod } from "@/types/closed_period";

export const GetClosedPeriods = () => {
    return useQuery<ClosedPeriod[]>({
        queryKey: ['getClosedDays'],
        queryFn: async () => {
            return await ApiClient.get('/closed-days').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}