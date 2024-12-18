import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment, AppointmentForAll, BookingItem } from "@/types/appointment"
import { format } from "date-fns"
import { MemberStatistics } from "@/types/statistics"

export type ArgumentType = {
    id: string;
    startDate: string;
    endDate: string;
    status: "pending" | "confirmed" | "cancelled" | "completed"
}

export const useGetServiceStatisticsById = (arg: ArgumentType) => {
    const { startDate, endDate, id, status } = arg
    return useQuery<MemberStatistics>({
        queryKey: ['serviceStatistics', arg],
        queryFn: async () => {
            return await ApiClient.get(`/statistics/of/service/${id}`, {
                params: {
                    startDate,
                    endDate,
                    status
                }
            }).then(res => res.data)
        }
    })
}