import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const GetTokenByRefresh = () => {
    return useQuery({
        queryKey: ['GetRefreshToken'],
        queryFn: async () => {
            return await ApiClient.get('/auth/refresh').then(res => res.data)
        }
    })
}