'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { PackageSchema } from "@/validation-schema/package.schema"
import { toast } from "@/components/ui/use-toast"

type PayloadType = z.infer<typeof PackageSchema>

export const useCreatePackage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/services/package`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Package create successfully" })
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
        }
    })
}