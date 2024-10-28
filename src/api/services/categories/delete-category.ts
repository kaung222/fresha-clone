import { ApiClient } from "@/api/ApiClient"
import { toast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/categories/${payload.id}`).then(res => res.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            });
            toast({ title: 'category deleted successfully!' });
        }
    })
}