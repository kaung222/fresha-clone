import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment, AppointmentForAll, BookingItem } from "@/types/appointment"
import { format } from "date-fns"


export const GetMemberAppointmentsById = (id: string) => {
    return useQuery<BookingItem[]>({
        queryKey: ['memberAppointments', id],
        queryFn: async () => {
            return await ApiClient.get(`/appointments/of/member/${id}`, {
                params: {
                    startDate: '2024-11-1',
                    endDate: '2024-11-30'
                }
            }).then(res => res.data)
        }
    })
}