'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { PackageSchema } from "@/validation-schema/package.schema"

type PayloadType = z.infer<typeof PackageSchema>

export const useUpdatePackage = (id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/services/package/${id}`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
        }
    })
}