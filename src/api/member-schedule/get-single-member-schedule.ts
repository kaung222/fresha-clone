import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberSchedule } from "@/types/member-schedule";
import { Member } from "@/types/member";
import { addDays, format, startOfWeek } from "date-fns";

type MemberWithSchedule = Member & {
    schedules: MemberSchedule[]
}

export const useGetSingleMemberSchedules = (id: string) => {

    return useQuery<MemberSchedule[]>({
        queryKey: ['getSingleMembersSchedules', id],
        queryFn: async () => {
            return await ApiClient.get(`/member-schedule/of/member/${id}`).then(res => res.data);
        },
        refetchOnWindowFocus: false,
    })
}