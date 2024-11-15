'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ErrorResponse } from "@/types/response"

export const DeleteService = () => {
    const queryClient = useQueryClient();
    const router = useRouter()
    return useMutation<{}, ErrorResponse, { id: string; }>({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/services/${payload.id}`).then(res => res.data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            });
            toast({ title: 'Delete service successful' });
            router.push('/manage/services');
            return;
        },
        onError(error) {
            toast({ title: error.message })
        }
    })
}