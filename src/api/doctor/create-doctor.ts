import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { CreateDoctorSchema } from "@/validation-schema/create-doctor.schema";
import { z } from "zod";

type AddDoctorPayload = z.infer<typeof CreateDoctorSchema>;
export const useAddDoctorByClinic = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, ErrorResponse, AddDoctorPayload>({
    mutationFn: async (payload: AddDoctorPayload) => {
      return await ApiClient.post("doctors", payload).then((res) => res.data);
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/doctors");
      queryClient.invalidateQueries({ queryKey: ["GetDoctors"], exact: false });
    },
  });
};
