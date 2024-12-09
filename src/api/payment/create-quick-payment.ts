'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast";
import { Payment } from "@/types/payment";
import { ErrorResponse } from "@/types/response";

type PayloadType = {
    method: "Cash" | "KBZ pay" | "AYA pay" | "Wave pay";
    clientName?: string;
    amount: number;
}

export const useCreateQuickPayment = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/payments`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Quick pay added' });
            queryClient.invalidateQueries({
                queryKey: ['getPayments'],
                exact: false
            });
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}