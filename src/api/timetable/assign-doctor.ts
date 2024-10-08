import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useAssignDoctor = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await ApiClient.post("sections", payload).then((res) => res.data);
    },
    onError(error) {
      //@ts-expect-error
      toast({ title: error.response.data.message });
    },
    onSuccess() {
      toast({ title: "assign successfully" });
      //   queryClient.invalidateQueries({ queryKey: ["GetTimetables"] });
    },
  });
};
