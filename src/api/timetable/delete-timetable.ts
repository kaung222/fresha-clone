import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.delete(`timetables/${payload.id}`).then(
        (res) => res.data
      );
    },
    onError(error) {
      //@ts-expect-error
      toast({ title: error.response.data.message });
    },
    onSuccess() {
      toast({ title: "delete successfully" });
      queryClient.invalidateQueries({ queryKey: ["GetTimetables"] });
    },
  });
};
