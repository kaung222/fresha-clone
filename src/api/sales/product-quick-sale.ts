import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast";


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
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/sales`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'product quick sale success' })
        }
    })
}