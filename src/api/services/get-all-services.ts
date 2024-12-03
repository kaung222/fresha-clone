import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Service } from "@/types/service"

type ResponseType = Service & {
    services: Service[]
}

export const GetAllServices = () => {
    return useQuery<Service[]>({
        queryKey: ['GetAllServices'],
        queryFn: async () => {
            return await ApiClient.get(`/services`).then(res => res.data)
        }
    })
}