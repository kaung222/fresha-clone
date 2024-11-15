import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"

export const MarkReadNotifications = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            return await ApiClient.patch(`/notifications`).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getNotifications'],
                exact: false
            })
        }
    })
}