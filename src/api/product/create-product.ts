'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ProductSchema } from "@/validation-schema/product.schema"
import { Product } from "@/types/product"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof ProductSchema> & {
    images: string[]
}

export const CreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<Product, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/products', payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Product create successful' })
            queryClient.invalidateQueries({
                queryKey: ['allProducts'],
                exact: false
            });
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}