'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment, AppointmentForAll } from "@/types/appointment"
import { format } from "date-fns"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

type ResponseType = {
    records: AppointmentForAll[];
    _metadata: PagonationMetadata
}

export const GetAllAppointments = () => {
    const today = new Date(format(new Date(), "yyyy-MM-dd"))
    const { getQuery } = useSetUrlParams();
    const startDate = getQuery('startDate') || format(today, "yyyy-MM-dd");
    const endDate = getQuery('endDate') || format(today, "yyyy-MM-dd");
    return useQuery<AppointmentForAll[]>({
        queryKey: ['allAppointments', startDate, endDate],
        queryFn: async () => {
            return await ApiClient.get(`/appointments`, {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    page: 1
                }
            }).then(res => res.data)
        }
    })
}