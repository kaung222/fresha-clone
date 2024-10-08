"use client";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { useLocalstorage } from "@/lib/helpers";

export const useCreateNewPassword = () => {
  const router = useRouter();
  const { deleteData } = useLocalstorage();
  return useMutation({
    mutationKey: ["NewPassword"],
    mutationFn: async (payload: { email: string; newPassword: string }) => {
      await ApiClient.post("/new-password", payload);
    },
    onSuccess: () => {
      deleteData("forgetEmail");
      router.push("/login");
    },
  });
};
