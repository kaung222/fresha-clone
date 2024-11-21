'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast";

type PayloadType = {
    method: "Cash" | "KBZ pay" | "AYA pay" | "Wave pay";
    clientName?: string;
    amount: number;
}

export const useCreateQuickPayment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/payments`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'Quick pay add' });
            queryClient.invalidateQueries({
                queryKey: ['getPayments'],
                exact: false
            })
        }
    })
}