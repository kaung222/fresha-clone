import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { OrganizationReview } from "@/types/review"
import { PagonationMetadata } from "@/types/_metadata";

type ResponseType = {
    records: OrganizationReview[];
    _metadata: PagonationMetadata;
}

export const GetSingleMemberReview = () => {
    return useQuery<ResponseType>({
        queryKey: ['organizationReviews'],
        queryFn: async () => {
            return await ApiClient.get(`/org-reviews`).then(res => res.data)
        }
    })
}