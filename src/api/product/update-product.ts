'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"
import { ProductSchema } from "@/validation-schema/product.schema"

type ProductPayload = z.infer<typeof ProductSchema>


export const UpdateProduct = (id: string) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<Product, ErrorResponse, ProductPayload>({
        mutationFn: async (payload: ProductPayload) => {
            return await ApiClient.patch(`/products/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['allProducts'],
                exact: false
            });
            toast({ title: 'product update success!' });
            router.push(`/manage/products`);
            return data
        },
        onError(error) {
            toast({ title: error.message });
            return error;
        }
    })
}