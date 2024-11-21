'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PagonationMetadata } from "@/types/_metadata"
import { ProductSale } from "@/types/productsale"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

type ResponseType = {
    _metadata: PagonationMetadata,
    records: ProductSale[]
}

export const GetAllProductSales = () => {
    const { setQuery, getQuery } = useSetUrlParams()
    const page = getQuery('page') || 1;
    return useQuery<ResponseType>({
        queryKey: ['getAllProductSales'],
        queryFn: async () => {
            return await ApiClient.get(`/sales`, {
                params: {
                    page: page
                }
            }).then(res => res.data)
        }
    })
}