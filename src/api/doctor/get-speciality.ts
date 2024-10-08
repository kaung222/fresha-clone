import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type SpecialityResponseType = {
    id: number;
    engName: string;
    burmaName: string;
    userId: string;
}

export const GetAllSpecility = () => {
    return useQuery<SpecialityResponseType[]>({
        queryKey: ['AllSpecility'],
        queryFn: async () => {
            return await ApiClient.get(`/specialities`).then(res => res.data)
        }
    })
}