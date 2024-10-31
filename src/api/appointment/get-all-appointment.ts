import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Appointment } from "@/types/appointment"

type ResponseType = {
    records: Appointment[];
    _metadata: PagonationMetadata
}

export const GetAllAppointments = () => {
    return useQuery<Appointment[]>({
        queryKey: ['allAppointments'],
        queryFn: async () => {
            return await ApiClient.get(`/appointments`, {
                params: {
                    date: new Date()
                }
            }).then(res => res.data)
        }
    })
}