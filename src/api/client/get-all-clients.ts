import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"

type ResponseType = {
    records: Client[];
    _metadata: PagonationMetadata
}

export const GetAllClients = () => {
    return useQuery<ResponseType>({
        queryKey: ['allClients'],
        queryFn: async () => {
            return await ApiClient.get(`/clients`).then(res => res.data)
        }
    })
}