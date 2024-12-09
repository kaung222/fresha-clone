'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";


type PayloadType = {
    notes?: string;
    username?: string;
    saleItems: {
        productId: number;
        quantity: number;
    }[];
    savePayment: boolean;
    paymentMethod: 'Cash' | 'KBZ pay' | "AYA pay" | "Wave pay";
}

export const ProductQuickSale = () => {
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/sales`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['getAllProductSales'],
                exact: false
            })
            toast({ title: 'product quick sale success' })
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}