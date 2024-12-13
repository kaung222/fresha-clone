import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type ResponseType = {
    memberId: string;
    totalOrders: string;
    totalFees: string;
    totalDuration: string;
}
type ArgType = {
    startDate: string;
    endDate: string;
    status: string;
}

export const MostOrderMemberStatistics = (arg: ArgType) => {
    const { startDate, endDate, status } = arg;
    return useQuery<ResponseType[]>({
        queryKey: ['mostOrderedMembers', startDate, endDate, status],
        queryFn: async () => {
            return await ApiClient.get(`/statistics/members`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}