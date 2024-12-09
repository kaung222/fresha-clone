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


export const UpdateBrands = (id: string) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/brands/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['allBrands'],
                exact: false
            });
            toast({ title: 'product brand update success!' });
            return data
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error;
        }
    })
}