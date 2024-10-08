import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { z } from "zod";
import { CreateInvoiceSchema } from "@/validation-schema/create-invoice.schema";

type CreateInvoicePayload = z.infer<typeof CreateInvoiceSchema>;
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, ErrorResponse, CreateInvoicePayload>({
    mutationFn: async (payload: CreateInvoicePayload) => {
      return await ApiClient.post("invoices", payload).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      queryClient.invalidateQueries({
        queryKey: ["GetInvoices"],
        exact: false,
      });
    },
  });
};
