import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const usePublishDoctor = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.patch(
        `doctors/${payload.id}/publish`,
        payload
      ).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: "publish successful" });
      queryClient.invalidateQueries({
        queryKey: ['GetDoctors'],
        exact: false,
      })
    },
  });
};
