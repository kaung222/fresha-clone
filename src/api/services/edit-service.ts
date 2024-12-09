'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { Service } from "@/types/service"
import { ErrorResponse } from "@/types/response"
import { ServiceSchema } from "@/validation-schema/service.schema"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type ServicePayload = z.infer<typeof ServiceSchema>


export const UpdateService = (id: string) => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation<Service, ErrorResponse, ServicePayload>({
        mutationFn: async (payload: ServicePayload) => {
            return await ApiClient.patch(`/services/${id}`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Service Update successfully" })
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            });
            return;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error;
        }

    })
}