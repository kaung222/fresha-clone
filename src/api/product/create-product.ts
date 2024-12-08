'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ProductSchema } from "@/validation-schema/product.schema"



type PayloadType = z.infer<typeof ProductSchema>

export const CreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/products', payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'Product create successful' })
            queryClient.invalidateQueries({
                queryKey: ['allProducts'],
                exact: false
            })
        }
    })
}