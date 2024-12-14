import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment, AppointmentForAll, BookingItem } from "@/types/appointment"
import { format } from "date-fns"
import { MemberStatistics, ProductStatistics } from "@/types/statistics"

export type ArgumentType = {
    id: string;
    startDate: string;
    endDate: string;
    status: "pending" | "confirmed" | "cancelled" | "completed"
}

export const useGetProductStatisticsById = (arg: ArgumentType) => {
    const { startDate, endDate, id, status } = arg
    return useQuery<ProductStatistics>({
        queryKey: ['productStatistics', arg],
        queryFn: async () => {
            return await ApiClient.get(`/statistics/of/product/${id}`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}