'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Member } from "@/types/member"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { MemberSchema } from "@/validation-schema/member.schema"
import { ErrorResponse } from "@/types/response"
import { useRouter } from "next/navigation"
import { ClosedPeriodSchema } from "@/validation-schema/closed-period.schema"

type PayloadType = z.infer<typeof ClosedPeriodSchema>

export const useCreateClosedPeriods = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation<Member, ErrorResponse, PayloadType>({
        mutationFn: async (payload: PayloadType) => {
            return await ApiClient.post(`/closed-days`, payload).then(res => res.data)
        },
        onSuccess(data) {
            toast({ title: "Closed day create successful" });
            queryClient.invalidateQueries({
                queryKey: ['getClosedDays'],
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