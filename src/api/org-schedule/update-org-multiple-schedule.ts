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

type SchedulePayload = z.infer<typeof MultipleScheduleSchema>

export const UpdateOrgMultipleSchedule = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<OrgSchedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.patch(`/org-schedule/update/multiple`, payload).then(res => res.data)
        },
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ['getOrgSchedule'],
                exact: false
            });
            toast({ title: 'Business hours update success!' });
            router.push(`/user-account/business-hours`);
            return data;
        },
        onError(error) {
            toast({ title: error.message });
            return error;
        }
    })
}