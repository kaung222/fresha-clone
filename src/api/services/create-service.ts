'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { redirect, useRouter } from "next/navigation"
import { z } from "zod"
import { ServiceSchema } from "@/validation-schema/service.schema"

type ServicePayload = z.infer<typeof ServiceSchema>

export const CreateService = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: ServicePayload) => {
            return await ApiClient.post('/services', payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'Service create Successfully' })
            router.push('/catalog/services');
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
        }
    })
}