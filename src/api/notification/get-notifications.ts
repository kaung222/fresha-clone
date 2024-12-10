import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Client } from "@/types/client"
import { PagonationMetadata } from "@/types/_metadata"
import { Notification } from "@/types/notification"

type ResponseType = {
    records: Notification[];
    _metadata: PagonationMetadata
}

export const GetNotifications = () => {
    return useQuery<ResponseType>({
        queryKey: ['getNotifications'],
        queryFn: async () => {
            return await ApiClient.get(`/notifications`).then(res => res.data)
        },
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    })
}