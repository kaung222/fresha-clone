'use client'
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

type ResponseType = {
    records: Client[];
    _metadata: PagonationMetadata
}

export const GetAllClients = () => {
    const { getQuery } = useSetUrlParams();
    const search = getQuery('qc')
    return useQuery<ResponseType>({
        queryKey: ['allClients', search],
        queryFn: async () => {
            return await ApiClient.get(`/clients`, {
                params: {
                    search,
                }
            }).then(res => res.data)
        }
    })
}