'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"
import { ProductSchema } from "@/validation-schema/product.schema"
import { ApiClient } from "@/api/ApiClient"

type PayloadType = {
    name: string;
    notes: string;
}


export const UpdateProductCategory = (id: string) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/product-category/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['allProductCategory'],
                exact: false
            });
            toast({ title: 'product category update success!' });
            return data
        },
        onError(error) {
            toast({ title: error.message });
            return error;
        }
    })
}