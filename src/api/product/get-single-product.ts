import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { useParams } from "next/navigation"
import { Product } from "@/types/product"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"

export const GetSingleProduct = (id: string) => {
    const { getQuery } = useSetUrlParams()
    const { productId } = useParams()
    const drawerProductId = getQuery('drawer')
    return useQuery<Product>({
        queryKey: ['getSingleProduct', id, productId, drawerProductId],
        queryFn: async () => {
            return await ApiClient.get(`/products/${id}`).then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })
}