import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";
import { ClosedPeriod } from "@/types/closed_period";

type FormattedType = {
    date: string;
    endDate: string;
    startDate: string;
    notes: string;
    type: string
}

export const GetFormatClosedPeriods = () => {
    return useQuery<FormattedType[]>({
        queryKey: ['getFormatClosedDays'],
        queryFn: async () => {
            return await ApiClient.get('/closed-days/formatted-closed-days').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}