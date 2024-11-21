import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Service } from "@/types/service"

type ResponseType = Service & {
    services: Service[]
}

export const GetSingleServiceById = (id: string) => {
    return useQuery<ResponseType>({
        queryKey: ['GetSingleService', id],
        queryFn: async () => {
            return await ApiClient.get(`/services/${id}`).then(res => res.data)
        }
    })
}