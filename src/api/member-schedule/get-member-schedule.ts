import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { MemberSchedule } from "@/types/member-schedule";
import { Member } from "@/types/member";
import { addDays, format, startOfWeek } from "date-fns";

type MemberWithSchedule = Member & {
    schedules: MemberSchedule[]
}

export const GetMembersSchedules = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = addDays(start, 6);
    console.log(start, end)
    // return `${format(start, "MMMM d")} - ${format(end, "d")}`;
    return useQuery<MemberWithSchedule[]>({
        queryKey: ['getMembersSchedules', date],
        queryFn: async () => {
            return await ApiClient.get('/member-schedule').then(res => res.data);
        },
        staleTime: 300 * 1000,
        refetchOnWindowFocus: false,
    })
}