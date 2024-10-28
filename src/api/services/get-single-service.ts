import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Service } from "@/types/service"

export const GetSingleServiceById = (id: string) => {
    return useQuery<Service>({
        queryKey: ['GetSingleService', id],
        queryFn: async () => {
            return await ApiClient.get(`/services/${id}`).then(res => res.data)
        }
    })
}