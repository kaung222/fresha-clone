import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"

export const GetSingleClient = (id: string) => {
    return useQuery<Client>({
        queryKey: ['SingleClient'],
        queryFn: async () => {
            return await ApiClient.get(`/clients/${id}`).then(res => res.data)
        }
    })
}