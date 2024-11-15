'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Member } from "@/types/member"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { MemberSchema } from "@/validation-schema/member.schema"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"
import { ApiClient } from "@/api/ApiClient"
import { ScheduleSchema } from "@/validation-schema/schedule.schema"
import { Schedule } from "@/types/member.schedule"

type SchedulePayload = z.infer<typeof ScheduleSchema>

export const CreateSchedule = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<Schedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.post(`/member-schedule`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "success schedule create" });
            router.push(`/scheduling/scheduled-shifts`);
            queryClient.invalidateQueries({
                queryKey: ['allSchedules'],
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