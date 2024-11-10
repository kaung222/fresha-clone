'use client'
import { useQuery } from "@tanstack/react-query"
import { MapClient } from "../MapClient"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

export const useSearchLocation = () => {
    const { getQuery } = useSetUrlParams();
    const query = getQuery('q') || '';
    return useQuery({
        queryKey: ['searchLocation', query],
        queryFn: async () => {
            return await MapClient.get(`/search`, {
                params: {
                    format: "json",
                    q: query
                }
            }).then(res => res.data)
        }
    })
}