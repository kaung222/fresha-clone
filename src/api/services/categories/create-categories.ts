import { ApiClient } from "@/api/ApiClient"
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type CategoryPayloadType = {
    name: string;
    notes: string;
}

export const CreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CategoryPayloadType) => {
            return await ApiClient.post(`/categories`, payload).then(res => res.data)
        },
        onSuccess: (data) => {
            toast({ title: "c create success" });
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
        }
    })
}