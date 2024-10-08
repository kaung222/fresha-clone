import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { Timetable } from "@/types/timetable";

export const useGetTimetablesOfDoctor = (id: string) => {
  return useQuery<Timetable[]>({
    queryKey: ["GetTimetables"],
    queryFn: async () => {
      return ApiClient.get(`/timetables/${id}`).then((res) => res.data);
    },
  });
};
