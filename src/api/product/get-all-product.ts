import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { PagonationMetadata } from "@/types/_metadata"
import { Product } from "@/types/product";

type ResponseType = {
    records: Product[];
    _metadata: PagonationMetadata;
}
export const GetAllProducts = () => {
    return useQuery<ResponseType>({
        queryKey: ['allProducts'],
        queryFn: async () => {
            return await ApiClient.get('/products').then(res => res.data);
        }
    })
}