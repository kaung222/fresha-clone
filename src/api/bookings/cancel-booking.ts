import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; description: string }) => {
      return await ApiClient.patch(`bookings/${payload.id}/cancel`, {
        description: payload.description,
      }).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      queryClient.invalidateQueries({
        queryKey: ["GetBookings"],
        exact: false,
      });
    },
  });
};
