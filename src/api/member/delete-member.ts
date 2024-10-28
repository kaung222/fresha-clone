'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export const DeleteMember = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { id: string }) => {
            return await ApiClient.delete(`/members/${payload.id}`).then(res => res.data)
        },
        onSuccess() {
            toast({ title: "Member deleted successful" })
            queryClient.invalidateQueries({
                queryKey: ['GetMembers'],
                exact: false
            })
        }
    })
}