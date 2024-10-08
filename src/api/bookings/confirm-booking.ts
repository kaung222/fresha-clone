import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.patch(`bookings/${payload.id}/confirm`).then(
        (res) => res.data
      );
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
