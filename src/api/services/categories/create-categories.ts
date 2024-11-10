import { ApiClient } from "@/api/ApiClient"
import { toast } from "@/components/ui/use-toast";
import { Category } from "@/types/category";
import { ErrorResponse } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type CategoryPayloadType = {
    name: string;
    notes: string;
}

export const CreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation<Category, ErrorResponse, CategoryPayloadType>({
        mutationFn: async (payload: CategoryPayloadType) => {
            return await ApiClient.post(`/categories`, payload).then(res => res.data)
        },
        onSuccess: (data) => {
            toast({ title: "c create success" });
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
            return data;
        },
        onError(error) {
            toast({ title: error.message })
        }
    })
}