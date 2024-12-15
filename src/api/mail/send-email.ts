'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { MailSchema } from "@/validation-schema/mail.schema"

type PayloadType = z.infer<typeof MailSchema>

export const useSendEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/emails`, payload).then(res => res.data)
        },
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({
                queryKey: ['getAllMail'],
                exact: false
            })
        },
    })
}