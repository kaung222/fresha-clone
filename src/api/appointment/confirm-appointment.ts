'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

export const ConfirmAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, any>({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.patch(`/appointments/${payload.id}/confirm`).then(res => res.data);
        },
        onSuccess(data) {
            toast({ title: 'appointment confirm successful' });
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
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}