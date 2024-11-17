import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

type PayloadType = {
    email: string;
}

export const ForgetPassword = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/forget-password`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "OTP send to your email" })
        }
    })
}