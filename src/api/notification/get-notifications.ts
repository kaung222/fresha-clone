import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"

type ResponseType = {
    records: Client[];
    _metadata: PagonationMetadata
}

export const GetNotifications = () => {
    return useQuery({
        queryKey: ['getNotifications'],
        queryFn: async () => {
            return await ApiClient.get(`/notifications`).then(res => res.data)
        }
    })
}