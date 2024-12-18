import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

export const useLogout = () => {
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.post(`/auth/logout`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Log out success!" })
        },
    })
}