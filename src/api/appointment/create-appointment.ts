'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { AppointmentSchema } from "@/validation-schema/appointment.schema"

type PayloadType = z.infer<typeof AppointmentSchema>

export const CreateAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/clients/${payload.clientId}/appointments`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['allAppointments'],
                exact: false
            });
            toast({ title: 'appointment create successful' });

        }
    })
}