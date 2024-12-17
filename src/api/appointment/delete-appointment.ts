'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

export const DeleteAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/appointments/${payload.id}`).then(res => res.data);
        },
        onSuccess(data) {
            toast({ title: 'appointment delete successful' })
            queryClient.invalidateQueries({
                queryKey: ['allAppointments'],
                exact: false
            })
            return data;
        },
    })
}