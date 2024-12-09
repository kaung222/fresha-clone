'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { ClientSchema } from "@/validation-schema/client.schema"
import { toast } from "@/components/ui/use-toast"
import { Client } from "@/types/client"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"

type PayloadType = z.infer<typeof ClientSchema>;
type ResponseType = {
    data: Client;
    message: string;
}

export const CreateClient = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    return useMutation<ResponseType, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/clients', payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: data.message });
            queryClient.invalidateQueries({
                queryKey: ['allClients'],
                exact: false
            })

            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}