'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

type PayloadType = {
    id: string;
    reason: string;
}

export const CancelAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/appointments/${payload.id}/cancel`, { reason: payload.reason }).then(res => res.data);
        },
        onSuccess(data) {
            toast({ title: 'appointment cancel successful' })
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
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}