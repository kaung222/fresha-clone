import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.post("orders/" + payload.id).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      queryClient.invalidateQueries({
        queryKey: ["GetOrders"],
        exact: false,
      });
    },
    onError(error) {
      toast({ description: error.message, variant: "destructive" });
    },
  });
};
