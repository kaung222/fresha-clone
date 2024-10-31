'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { ClientSchema } from "@/validation-schema/client.schema"
import { toast } from "@/components/ui/use-toast"

type PayloadType = z.infer<typeof ClientSchema>

export const CreateClient = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post('/clients', payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: 'client create successful' });
            queryClient.invalidateQueries({
                queryKey: ['allClients'],
                exact: false
            })
        }
    })
}