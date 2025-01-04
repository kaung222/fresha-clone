'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { AppointmentSchema, UpdateAppointmentSchema } from "@/validation-schema/appointment.schema"
import { Appointment } from "@/types/appointment"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof UpdateAppointmentSchema>

export const UpdateAppointment = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation<Appointment, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/appointments/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            const queryKeysToInvalidate = [
                ['allAppointments'],
                ['allAppointmentsByCreateDate'],
                ['singleAppointment']
            ];
            queryKeysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({
                    queryKey: key,
                    exact: false
                });
            });
            toast({ title: 'appointment update successful' });

            return data;
        },
        onError(error) {
            toast({ title: error.response?.data?.message, variant: "destructive" })
            return error;
        }
    })
}