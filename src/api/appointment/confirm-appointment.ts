'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

export const ConfirmAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.patch(`/appointments/${payload.id}/confirm`).then(res => res.data);
        },
        onSuccess() {
            toast({ title: 'appointment confirm successful' })
            queryClient.invalidateQueries({
                queryKey: ['allAppointments'],
                exact: false
            })
            queryClient.invalidateQueries({
                queryKey: ['singleAppointment'],
                exact: false
            })
        },
    })
}