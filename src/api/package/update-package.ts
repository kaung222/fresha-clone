'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { PackageSchema } from "@/validation-schema/package.schema"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"

type PayloadType = z.infer<typeof PackageSchema>

export const useUpdatePackage = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation<Package, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/services/package/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Package Update successfully" })
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error;
        },
    })
}