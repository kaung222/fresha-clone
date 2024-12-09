'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ErrorResponse } from "@/types/response"

type PayloadType = {
    id: string;
}

export const DeleteMemberSchedule = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<{}, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.delete(`/member-schedule/${payload.id}`).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['getMembersSchedules'],
                exact: false
            })
            toast({ title: "Schedule Delete successfully" });
            return data;
        },
        onError(error, variables, context) {
            toast({ title: error.response?.data.message, variant: 'destructive' });
            return error
        },
    });
}