import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const useDeleteClinic = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await ApiClient.delete("clinics/" + payload.id).then(
        (res) => res.data
      );
    },
    onSuccess() {
      router.push("/");
      toast({ description: "Delete clinic permanently" });
    },
  });
};
