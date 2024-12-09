'use client'
import { ApiClient } from "@/api/ApiClient"
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

type Categorypayload = {
    id: string;
    name: string;
    notes: string;
    colorCode: string;
}

export const UpdateCategory = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<any, ErrorResponse, Categorypayload>({
        mutationFn: async (payload: Categorypayload) => {
            return await ApiClient.patch(`/categories/${payload.id}`, { name: payload.name, notes: payload.notes, colorCode: payload.colorCode }).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Category update successful" })
            queryClient.invalidateQueries({
                queryKey: ['getAllCategory'],
                exact: false
            })
            return;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        }
    })
}