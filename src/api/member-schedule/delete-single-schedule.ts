'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export const DeleteMemberSchedule = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/member-schedule/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getMembersSchedules'],
                exact: false
            })
            toast({ title: "Schedule Delete successfully" });
            // router.push('/team/scheduled-shifts')
        }
    });
}