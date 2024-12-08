'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ClientSchema } from "@/validation-schema/client.schema"
import { Client } from "@/types/client"

type ClientPayload = z.infer<typeof ClientSchema>


export const UpdateClient = (id: string) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<Client, ErrorResponse, ClientPayload>({
        mutationFn: async (payload: ClientPayload) => {
            return await ApiClient.patch(`/clients/${id}`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['allClients'],
                exact: false
            });
            toast({ title: 'Client update success!' });
            return data;
        },
        onError(error) {
            toast({ title: error.message })
        }
    })
}