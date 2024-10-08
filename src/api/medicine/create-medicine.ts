import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { z } from "zod";

type CreateMedicinePayload = any;
//  z.infer<typeof CreateInvoiceSchema> | any
export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, ErrorResponse, CreateMedicinePayload>(
    {
      mutationFn: async (payload: CreateMedicinePayload) => {
        return await ApiClient.post("medicines", payload).then(
          (res) => res.data
        );
      },
      onSuccess(res) {
        toast({ description: res.message });
        queryClient.invalidateQueries({
          queryKey: ["GetMedicines"],
          exact: false,
        });
      },
    }
  );
};
