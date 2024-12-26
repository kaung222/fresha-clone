'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { AppointmentSchema } from "@/validation-schema/appointment.schema"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof AppointmentSchema>

export const CreateAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/appointments/for/client`, payload).then(res => res.data);
        },
        onSuccess(data) {
            const queryKeysToInvalidate = [
                ['allAppointments'],
                ['allAppointmentsByCreateDate']
            ];
            queryKeysToInvalidate.forEach(key => {
                queryClient.invalidateQueries({
                    queryKey: key,
                    exact: false
                });
            });
            toast({ title: data.message });
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.message });
            return error;
        },
    })
}