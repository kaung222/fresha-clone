'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { PagonationMetadata } from "@/types/_metadata"
import { Service } from "@/types/service"
import { Client } from "@/types/client"
import { AppointmentForAll } from "@/types/appointment"
import { Product } from "@/types/product"
import { ProductSale } from "@/types/productsale"

type ResponseType = {
    _metadata: PagonationMetadata;
    records: Service[] | Client[] | AppointmentForAll[] | Product[] | ProductSale[]
}

export const useGlobalSearch = () => {
    const { getQuery } = useSetUrlParams();
    const searchType = getQuery('search-type') || 'appointment'
    const query = getQuery("search") || '';
    return useQuery<ResponseType>({
        queryKey: ['globalSearch', query, searchType],
        queryFn: async () => {
            return await ApiClient.get('/search', {
                params: {
                    name: searchType,
                    q: query,
                    page: 1
                }
            }).then(res => res.data)
        }
    })
}