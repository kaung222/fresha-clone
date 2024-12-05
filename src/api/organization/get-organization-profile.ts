"use client"
import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member";
import { Organization } from "@/types/organization";
import { useLocalstorage } from "@/lib/helpers";

export const GetOrganizationProfile = () => {
    const { setData } = useLocalstorage()
    return useQuery<Organization>({
        queryKey: ['getOrganizationProfile'],
        queryFn: async () => {
            return await ApiClient.get('/organizations/info/profile').then(res => {
                setData("organization", res.data)
                return res.data
            });
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}