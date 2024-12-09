'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ProductSchema } from "@/validation-schema/product.schema"
import { ApiClient } from "@/api/ApiClient"
import { ErrorResponse } from "@/types/response"


type PayloadType = {
    name: string;
    notes: string;
}

export const CreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/brands', payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Product brand create successful' })
            queryClient.invalidateQueries({
                queryKey: ['allBrands'],
                exact: false
            })
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}