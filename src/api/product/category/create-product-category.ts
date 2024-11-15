'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ProductSchema } from "@/validation-schema/product.schema"
import { ApiClient } from "@/api/ApiClient"


type PayloadType = {
    name: string;
    notes: string;
}

export const CreateProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/product-category', payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'Product category create successful' })
            queryClient.invalidateQueries({
                queryKey: ['allProductCategory'],
                exact: false
            })
        }
    })
}