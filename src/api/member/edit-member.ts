'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberSchema } from "@/validation-schema/member.schema"
import { z } from "zod"
import { Member } from "@/types/member"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type MemberPayload = z.infer<typeof MemberSchema>


export const EditMember = (id: string) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation<Member, ErrorResponse, MemberPayload>({
        mutationFn: async (payload: MemberPayload) => {
            return await ApiClient.patch(`/members/${id}`, payload).then(res => res.data)
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['GetMembers'],
                exact: false
            });
            toast({ key: 'Team member update success!' });
            router.push(`/team/teammember`);

        }
    })
}