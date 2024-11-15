'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { MemberSchema } from "@/validation-schema/member.schema"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"

type MemberPayload = z.infer<typeof MemberSchema>

export const useCreateMember = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<Member, ErrorResponse, MemberPayload>({
        mutationFn: async (payload: MemberPayload) => {
            return await ApiClient.post(`/members`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "success member create" });
            router.push(`/manage/teammember`);
            queryClient.invalidateQueries({
                queryKey: ['getMembers'],
                exact: false
            });
            return data;
        },
        onError(error) {
            toast({ title: error.message });
            return error;
        }
    })
}