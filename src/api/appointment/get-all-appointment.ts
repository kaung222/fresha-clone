import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment, AppointmentForAll } from "@/types/appointment"
import { format } from "date-fns"

type ResponseType = {
    records: AppointmentForAll[];
    _metadata: PagonationMetadata
}

export const GetAllAppointments = (date: Date) => {
    return useQuery<AppointmentForAll[]>({
        queryKey: ['allAppointments', date],
        queryFn: async () => {
            return await ApiClient.get(`/appointments`, {
                params: {
                    date: format(date, "yyyy-MM-dd"),
                    page: 1
                }
            }).then(res => res.data)
        }
    })
}