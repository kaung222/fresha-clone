import { useMutation } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            return await ApiClient.post(`/auth/org-logout`).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Log out success!" })
        },
    })
}