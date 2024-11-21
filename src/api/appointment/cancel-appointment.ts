'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

type PayloadType = {
    id: string;
    reason: string;
}

export const CancelAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/appointments/${payload.id}/cancel`, { reason: payload.reason }).then(res => res.data);
        },
        onSuccess() {
            toast({ title: 'appointment cancel successful' })
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