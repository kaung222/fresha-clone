"use client";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLocalstorage } from "@/lib/helpers";

type RequestOtpResponse = {
  message: string;
  email: string;
};

export const useForgetPasswordOtp = () => {
  const { setData } = useLocalstorage();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      return await ApiClient.post(`forget-password`, payload).then(
        (res) => res.data
      );
    },
    onSuccess: (res) => {
      console.log(res);
      setData("forgetEmail", res.email);
      toast({ title: "OTP request successfully!" });
    },
  });
};
