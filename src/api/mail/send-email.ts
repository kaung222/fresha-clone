'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { z } from "zod"
import { MailSchema } from "@/validation-schema/mail.schema"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response"

type PayloadType = z.infer<typeof MailSchema>

export const useSendEmail = () => {
    const queryClient = useQueryClient();
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/emails`, payload).then(res => res.data)
        },
        onSuccess(data, variables, context) {
            toast({ title: "Email send successfully!", variant: 'success' })
            queryClient.invalidateQueries({
                queryKey: ['getAllMail'],
                exact: false
            })
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        }
    })
}