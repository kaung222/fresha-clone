"use client";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLocalstorage } from "@/lib/helpers";

export const useConfirmOtp = () => {
  const { deleteData, getData } = useLocalstorage();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      return await ApiClient.post(`confirm-otp`, payload).then(
        (res) => res.data
      );
    },
    onSuccess: () => {
      toast({ title: "correct otp!" });
      deleteData("registerEmail");
    },
    onError: (error) => {
      toast({ title: error.message });
    },
  });
};
