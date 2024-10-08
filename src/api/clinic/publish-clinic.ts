import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const usePublishClinic = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.post(`clinics/${payload.id}/publish`).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/profile");
      queryClient.invalidateQueries({
        queryKey: ['GetProfile'],
        exact: false
      })
    },
  });
};
