import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

type PayloadType = {
    email: string;
    password: string;
}

export const ResetPassword = () => {
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/auth/new-password`, payload).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Password reset successfully" })
        }
    })
}