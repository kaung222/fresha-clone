import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.delete(`/doctors/${payload.id}`).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ["GetDoctors"],
        exact: false
      })
      toast({ title: "Doctor delete successfully." });
      //   router.push("/doctors");
    },
  });
};
