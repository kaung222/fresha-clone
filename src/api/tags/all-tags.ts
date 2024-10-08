import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

type ClinicTypeResponseType = {
    id: number;
    burmaName: string;
    engName: string;
};

export const GetAllTags = () => {
    return useQuery<ClinicTypeResponseType[]>({
        queryKey: ['AllTags'],
        queryFn: async () => {
            return await ApiClient.get(`/clinic-types`).then(res => res.data);
        }
    })
}