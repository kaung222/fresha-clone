import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { UpdateClinicSchema } from "@/validation-schema/update-clinic.shema";
import { useLocalstorage } from "@/lib/helpers";

type UpdateClinicProps = {
  id: string;
  UpdateClinic: z.infer<typeof UpdateClinicSchema>;
};
export const useUpdateClinic = () => {
  const { setData } = useLocalstorage();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateClinicProps) => {
      return await ApiClient.patch(
        "clinics/" + payload.id,
        payload.UpdateClinic
      ).then((res) => res.data);
    },
    onSuccess(res) {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["GetProfile"], exact: false });
      setData("clinic", res.clinic);
      toast({ description: "Update clinic details successfully" });
    },
  });
};
