import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { OverallStatistics } from "@/types/statistics"

type ResponseType = {
    date: String,
    totalCommissionFees: string,
    totalDiscountPrice: string,
    totalAppointments: string
}

type ArgType = {
    startDate: string;
    endDate: string;
    status: string;
}

export const GetOverAllStatistics = (arg: ArgType) => {
    const { startDate, endDate, status } = arg;
    return useQuery<OverallStatistics[]>({
        queryKey: [`overallStatistics`, startDate, endDate, status],
        queryFn: async () => {
            return await ApiClient.get(`/statistics`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}


export const GetOverAllStatisticsSecond = (arg: ArgType) => {
    const { startDate, endDate, status } = arg;
    return useQuery<OverallStatistics[]>({
        queryKey: [`overallStatisticsSecond`, startDate, endDate, status],
        queryFn: async () => {
            return await ApiClient.get(`/statistics`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}