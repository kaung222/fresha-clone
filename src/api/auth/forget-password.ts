import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { ErrorResponse } from "@/types/response";

type PayloadType = {
    email: string;
}

export const ForgetPassword = () => {
    return useMutation<any, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/forget-password`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "OTP send to your email" });
            return data
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        }
    })
}