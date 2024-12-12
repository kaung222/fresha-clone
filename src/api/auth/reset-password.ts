import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response";

type PayloadType = {
    email: string;
    password: string;
}

export const ResetPassword = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/new-password`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Password reset successfully" })
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        }
    })
}