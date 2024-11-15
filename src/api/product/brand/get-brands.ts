import { useQuery } from "@tanstack/react-query"
import { PagonationMetadata } from "@/types/_metadata"
import { Product } from "@/types/product";
import { ApiClient } from "@/api/ApiClient";

type ResponseType = {
    id: number;
    name: string;
    notes: string;
    orgId: number;
}
export const GetBrands = () => {
    return useQuery<ResponseType[]>({
        queryKey: ['allBrands'],
        queryFn: async () => {
            return await ApiClient.get('/brands').then(res => res.data);
        }
    })
}