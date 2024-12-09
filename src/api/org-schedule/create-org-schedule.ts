'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"
import { OrgScheduleSchema } from "@/validation-schema/org-schedule.schema"
import { OrgSchedule } from "@/types/org-schedule"

type SchedulePayload = z.infer<typeof OrgScheduleSchema>

export const CreateOrgSchedule = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<OrgSchedule, ErrorResponse, SchedulePayload>({
        mutationFn: async (payload: SchedulePayload) => {
            return await ApiClient.post(`/org-schedule`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Business open hour created successfully!" });
            router.push(`/user-account/business-hours`);
            queryClient.invalidateQueries({
                queryKey: ['getOrgSchedule'],
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