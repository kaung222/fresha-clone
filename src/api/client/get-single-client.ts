import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const GetSingleClient = (id: string) => {
    return useQuery({
        queryKey: ['SingleClient'],
        queryFn: async () => {
            return await ApiClient.get(`/clients/${id}`).then(res => res.data)
        }
    })
}