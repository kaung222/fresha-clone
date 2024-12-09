'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { PackageSchema } from "@/validation-schema/package.schema"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof PackageSchema>

export const useCreatePackage = () => {
    const queryClient = useQueryClient()
    return useMutation<Package, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/services/package`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Package create successfully" })
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    })
}