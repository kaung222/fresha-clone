import { useQuery } from "@tanstack/react-query"
import { ApiClient } from "../ApiClient"
import { Appointment } from "@/types/appointment"
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

export const GetSingleAppointment = (id: string) => {
    const { getQuery } = useSetUrlParams();
    const appointmentId = getQuery('appointment-detail')
    return useQuery<Appointment>({
        queryKey: ['singleAppointment', appointmentId],
        queryFn: async () => {
            return await ApiClient.get(`/appointments/${id}`).then(res => res.data)
        },
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    })
}