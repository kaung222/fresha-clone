'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PagonationMetadata } from "@/types/_metadata"
import { Payment } from "@/types/payment"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

type ResponseType = {
    _metadata: PagonationMetadata,
    records: Payment[]
}

export const GetPayments = () => {
    const { getQuery } = useSetUrlParams()
    const page = getQuery('page') || 1
    return useQuery<ResponseType>({
        queryKey: ['getPayments'],
        queryFn: async () => {
            return await ApiClient.get(`/payments`, {
                params: {
                    page: page
                }
            }).then(res => res.data)
        }
    })
}