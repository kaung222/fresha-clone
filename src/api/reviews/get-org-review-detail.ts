import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const useGetDetailOrgReview = (id: string) => {
    return useQuery({
        queryKey: ['getDetailOrgReview'],
        queryFn: async () => {
            return await ApiClient.get(`/org-reviews/${id}`).then(res => res.data)
        }
    })
}