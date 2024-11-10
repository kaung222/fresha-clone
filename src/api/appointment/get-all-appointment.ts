import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment } from "@/types/appointment"
import { format } from "date-fns"

type ResponseType = {
    records: Appointment[];
    _metadata: PagonationMetadata
}

export const GetAllAppointments = (date: Date) => {
    return useQuery<Appointment[]>({
        queryKey: ['allAppointments', date],
        queryFn: async () => {
            return await ApiClient.get(`/appointments`, {
                params: {
                    date: format(date, "yyyy-MM-dd")
                }
            }).then(res => res.data)
        }
    })
}