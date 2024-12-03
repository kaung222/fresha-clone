import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type ResponseType = {
    serviceId: number;
    totalOrders: string
}

type ArgType = {
    startDate: string;
    endDate: string;
    status: string;
}

export const MostServiceStatistics = (arg: ArgType) => {
    const { startDate, endDate, status } = arg;
    return useQuery<ResponseType[]>({
        queryKey: ['mostOrderedServices', startDate, endDate, status],
        queryFn: async () => {
            return await ApiClient.get(`/statistics/services`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}