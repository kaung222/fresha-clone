'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { AppointmentSchema, UpdateAppointmentSchema } from "@/validation-schema/appointment.schema"

type PayloadType = z.infer<typeof UpdateAppointmentSchema>

export const UpdateAppointment = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/appointments/${id}`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['allAppointments'],
                exact: false
            });
            queryClient.invalidateQueries({
                queryKey: ['singleAppointment'],
                exact: false
            });
            toast({ title: 'appointment update successful' });

        }
    })
}