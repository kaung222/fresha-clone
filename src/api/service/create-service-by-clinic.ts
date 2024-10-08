import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
type CreateServicePayload = {
  name: string;
  description: string;
  tags: string[];
  price?: number;
  averagePeriodPerPatient?: number; //in minutes
  images?: string[];
};
export const useCreateServiceByClinic = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<{ message: string }, ErrorResponse, CreateServicePayload>({
    mutationFn: async (payload: CreateServicePayload) => {
      return await ApiClient.post(`services`, payload).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/services");
      queryClient.invalidateQueries({
        queryKey: ['GetServicesByClinic'],
        exact: false
      })
    },
  });
};
