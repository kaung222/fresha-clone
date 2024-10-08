import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { CreateTimeTableSchema } from "@/validation-schema/create-timetable.schema";

type CreateTimetableSchemaType = z.infer<typeof CreateTimeTableSchema>;
export const useCreateDoctorTimeTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTimetableSchemaType) => {
      return await ApiClient.post("timetables", payload).then(
        (res) => res.data
      );
    },
    onSuccess: () => {
      toast({ title: "create timetable successfully!" });
      queryClient.invalidateQueries({
        queryKey: ['GetTimetables'],
        exact: false
      })
    },
  });
};
