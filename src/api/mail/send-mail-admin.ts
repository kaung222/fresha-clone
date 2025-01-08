import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { ErrorResponse } from "@/types/response"
import { z } from "zod"
import { sendEmailToAdminSchema } from "@/validation-schema/admin-email.schema"
import { toast } from "@/components/ui/use-toast"

type PayloadType = z.infer<typeof sendEmailToAdminSchema>

export const useSendMailToAdmin = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/emails/to/admins`, payload).then(res => res.data)
        },
        onSuccess(data, variables, context) {
            return data
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        },
    })
}