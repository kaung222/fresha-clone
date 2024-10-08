import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useUnPublicClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["unPublicClinic"],
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.post(`/clinics/${payload.id}/unpublish`).then(
        (res) => res.data,
      );
    },
    onSuccess: () => {
      toast({ title: "Clinic unPublish successfully" });
      queryClient.invalidateQueries({
        queryKey: ['GetProfile'],
        exact: false
      })
    },
  });
};
