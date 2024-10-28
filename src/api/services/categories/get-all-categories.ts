import { ApiClient } from "@/api/ApiClient"
import { Category } from "@/types/category"
import { useQuery } from "@tanstack/react-query"


export const GetAllCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['getAllCategory'],
        queryFn: async () => {
            return await ApiClient.get('/categories').then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
    })
}