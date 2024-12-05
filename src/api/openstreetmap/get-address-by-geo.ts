'use client'
import { useQuery } from "@tanstack/react-query"
import { MapClient } from "../MapClient"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"


type ResponseType = {
    address: {
        amenity?: string;
        city: string;
        city_district?: string;
        country: string;
        country_code: string;
        postcode?: string;
        road?: string;
        state: string;
        suburb?: string;
        town?: string;
        township?: string;
        village?: string;
    }
}

export const useGetAddressByGeolocation = () => {
    const { getQuery } = useSetUrlParams();
    const lat = getQuery('lat');
    const lng = getQuery('lng');
    return useQuery<ResponseType>({
        queryKey: ['searchAddress', lat, lng],
        queryFn: async () => {
            return await MapClient.get(`/reverse`, {
                params: {
                    format: "json",
                    lat: lat,
                    lon: lng
                }
            }).then(res => res.data)
        }
    })
}