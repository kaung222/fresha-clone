'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberSchema } from "@/validation-schema/member.schema"
import { z } from "zod"
import { Member } from "@/types/member"
import { ErrorResponse } from "@/types/response"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { OrgSchedule } from "@/types/org-schedule"
import { SingleMemberScheduleUpdateSchema } from "@/validation-schema/member-schedule.schema"

type SchedulePayload = z.infer<typeof SingleMemberScheduleUpdateSchema>



export const UpdateMemberSingleSchedule = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<OrgSchedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.patch(`/member-schedule/${payload.id}`, {
                startTime: payload.startTime,
                endTime: payload.endTime,
                dayOfWeek: payload.dayOfWeek,
                memberId: payload.memberId
            }).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['getMembersSchedules'],
                exact: false
            });
            toast({ title: 'member schedule update success!' });
            return data;
        },
        onError(error) {
            toast({ title: error.response?.data.message, variant: 'destructive' })
            return error;
        }
    })
}