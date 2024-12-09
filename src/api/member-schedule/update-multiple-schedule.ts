'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberSchema } from "@/validation-schema/member.schema"
import { z } from "zod"
import { Member } from "@/types/member"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { MultipleScheduleSchema, OrgScheduleSchema } from "@/validation-schema/org-schedule.schema"
import { OrgSchedule } from "@/types/org-schedule"
import { MultipleMemberScheduleUpdateSchema } from "@/validation-schema/member-schedule.schema"

type SchedulePayload = z.infer<typeof MultipleMemberScheduleUpdateSchema>

export const UpdateMemberMultipleSchedule = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<OrgSchedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.patch(`/member-schedule/update/multiple`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: 'member schedule update success!' });
            queryClient.invalidateQueries({
                queryKey: ['getMembersSchedules'],
                exact: false
            });
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        }
    })
}