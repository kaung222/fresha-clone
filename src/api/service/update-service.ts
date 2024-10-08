import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
type UpdateServicePayload = {
  name: string;
  description: string;
  tags: string[];
  price?: number;
  averagePeriodPerPatient?: number; //in minutes
  images?: string[];
};
export const useUpdateServiceByClinic = (id: string) => {
  const router = useRouter();
  return useMutation<{ message: string }, ErrorResponse, UpdateServicePayload>({
    mutationFn: async (payload: UpdateServicePayload) => {
      return await ApiClient.patch(`services/${id}`, payload).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/services");
    },
  });
};
