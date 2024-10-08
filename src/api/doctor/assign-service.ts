import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"

type PayloadType = {
    serviceIds: string[];
}

export const useAssignServiceToDoctor = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.patch(`/doctors/${id}/assign`, payload).then(res => res.data)
        },
        onSuccess: () => {
            toast({ title: "Assign Service Successfully" })
            queryClient.invalidateQueries({
                queryKey: ['getDetailDoctor'],
                exact: false
            })
        }
    })
}