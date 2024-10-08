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

export const useRequestOtp = () => {
  const { setData } = useLocalstorage();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { email: string }) => {
      return await ApiClient.post(`request-otp`, payload).then(
        (res) => res.data
      );
    },
    onSuccess: (res) => {
      console.log(res);
      setData("registerEmail", res.email);
      toast({ title: "OTP request successfully!" });
      // router.push('/confirm-otp');
    },
  });
};
