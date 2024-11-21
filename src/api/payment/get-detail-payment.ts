import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PaymentDetail } from "@/types/payment"

export const useGetDetailPayment = (id: string) => {
    return useQuery<PaymentDetail>({
        queryKey: ['getDetailPayment'],
        queryFn: async () => {
            return await ApiClient.get(`/payments/${id}`).then(res => res.data)
        }
    })
}