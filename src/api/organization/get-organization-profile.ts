import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";
import { Organization } from "@/types/organization";

export const GetOrganizationProfile = () => {
    return useQuery<Organization>({
        queryKey: ['getOrganizationProfile'],
        queryFn: async () => {
            return await ApiClient.get('/organizations/info/profile').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}