import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { ErrorResponse } from "@/types/response";
import { useLocalstorage } from "@/lib/helpers";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/validation-schema/login.schema";
import { Clinic } from "@/types/clinic";
type LoginPayload = z.infer<typeof LoginSchema>;
type LoginResponse = {
  message: string;
  clinic: Clinic;
  accessToken: string;
  refreshToken: string;
};
export const useLogin = () => {
  const { setData } = useLocalstorage();
  const router = useRouter();
  return useMutation<LoginResponse, ErrorResponse, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      return await ApiClient.post("clinic/login", payload).then((res) => {
        console.log(res.headers);
        return res.data;
      });
    },
    onSuccess: async (res) => {
      setData("accessToken", res.accessToken);
      setData("refreshToken", res.refreshToken);
      setData("clinic", res.clinic);
      toast({ title: res.message });
      router.push("/");
    },
    onError: async (error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error?.response?.data.message,
      });
    },
  });
};
