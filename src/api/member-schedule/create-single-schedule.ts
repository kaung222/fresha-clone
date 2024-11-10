'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"
import { OrgScheduleSchema } from "@/validation-schema/org-schedule.schema"
import { OrgSchedule } from "@/types/org-schedule"
import { SingleMemberSchedule } from "@/validation-schema/member-schedule.schema"

type SchedulePayload = z.infer<typeof SingleMemberSchedule>

export const CreateSingleMemberSchedule = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<OrgSchedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.post(`/member-schedule`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "One Member schedule successfully!" });
            queryClient.invalidateQueries({
                queryKey: ['getMembersSchedules'],
                exact: false
            });
            // router.push('/team/scheduled-shifts')
            return data;
        },
        onError(error) {
            toast({ title: error.message });
            return error;
        }
    })
}