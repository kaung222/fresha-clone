import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await ApiClient.delete(`invoices/${id}`).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      queryClient.invalidateQueries({
        queryKey: ["GetInvoices"],
        exact: false,
      });
    },
    onError() {
      toast({ title: "Error deleting invoice" });
    },
  });
};
