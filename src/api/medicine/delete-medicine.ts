import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await ApiClient.delete(`medicines/${id}`).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      queryClient.invalidateQueries({
        queryKey: ["GetMedicines"],
        exact: false,
      });
    },
    onError() {
      toast({ title: "Error deleting medicine" });
    },
  });
};
