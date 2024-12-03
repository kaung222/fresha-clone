'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

type PayloadType = {
    appointmentId: string;
    notes: string;
    paymentMethod: string;
}

export const CompleteAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/appointments/${payload.appointmentId}/complete`, {
                notes: payload.notes,
                paymentMethod: payload.paymentMethod,
            }).then(res => res.data);
        },
        onSuccess() {
            toast({ title: 'appointment complete successful' })
            queryClient.invalidateQueries({
                queryKey: ['allAppointments'],
                exact: false
            });
            queryClient.invalidateQueries({
                queryKey: ['singleAppointment'],
                exact: false
            })
        },
    })
}