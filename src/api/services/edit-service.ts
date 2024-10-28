'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { Service } from "@/types/service"
import { ErrorResponse } from "@/types/response"
import { ServiceSchema } from "@/validation-schema/service.schema"
import { useRouter } from "next/navigation"

type ServicePayload = z.infer<typeof ServiceSchema>


export const UpdateService = (id: string) => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation<Service, ErrorResponse, ServicePayload>({
        mutationFn: async (payload: ServicePayload) => {
            return await ApiClient.patch(`/services/${id}`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            });
            router.push('/catalog/services')
        }

    })
}