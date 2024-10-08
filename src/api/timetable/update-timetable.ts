import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useUpdateTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      return await ApiClient.patch(`timetables/${payload.id}`, payload).then(
        (res) => res.data
      );
    },
    onError(error) {
      //@ts-expect-error
      toast({ title: error.response.data.message });
    },
    onSuccess() {
      toast({ title: "added successfully" });
      queryClient.invalidateQueries({ queryKey: ["GetTimetables"] });
    },
  });
};
