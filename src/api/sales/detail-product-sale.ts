'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PagonationMetadata } from "@/types/_metadata"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { ProductSaleDetail } from "@/types/productsale"

export const GetDetailProductSale = (id: string) => {
    const { setQuery, getQuery } = useSetUrlParams()
    return useQuery<ProductSaleDetail>({
        queryKey: ['getDetailProductSales'],
        queryFn: async () => {
            return await ApiClient.get(`/sales/${id}`).then(res => res.data)
        }
    })
}