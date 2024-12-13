'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { redirect, useRouter } from "next/navigation"
import { z } from "zod"
import { ServiceSchema } from "@/validation-schema/service.schema"
import { Service } from "@/types/service"
import { ErrorResponse } from "@/types/response"

type ServicePayload = z.infer<typeof ServiceSchema>

export const CreateService = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation<Service, ErrorResponse, ServicePayload>({
        mutationFn: async (payload: ServicePayload) => {
            return await ApiClient.post('/services', payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'Service create Successfully' })
            router.push('/services');
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
            queryClient.invalidateQueries({
                queryKey: ['getMembers'],
                exact: false
            })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        }
    })
}