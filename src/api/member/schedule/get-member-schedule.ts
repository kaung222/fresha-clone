import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../../ApiClient"
import { Schedule } from "@/types/member.schedule";

export const GetMemberSchedules = () => {
    return useQuery<Schedule[]>({
        queryKey: ['allSchedules'],
        queryFn: async () => {
            return await ApiClient.get(`/member-schedule`).then(res => res.data);
        }
    })
}