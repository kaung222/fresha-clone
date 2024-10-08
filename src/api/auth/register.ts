import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { RegisterSchema } from "@/validation-schema/register.schema";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { useLocalstorage } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { Clinic } from "@/types/clinic";

const RegisterSchemaPayload = z.object({
  name: z.string().min(2, {
    message: "Clinic name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Use strong password"),
  phone: z.string().min(5, "use valid phone number"),
  address: z.string(),
  city: z.string(),
  description: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  type: z.string(),
  clinicTypeId: z.number(),
});

type RegisterPayload = z.infer<typeof RegisterSchemaPayload>;
type RegisterResponse = {
  message: string;
  clinic: Clinic;
  accessToken: string;
};
export const useRegister = () => {
  const router = useRouter();
  const { setData } = useLocalstorage();
  return useMutation<RegisterResponse, ErrorResponse, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      return await ApiClient.post("clinic/register", payload).then(
        (res) => res.data
      );
    },
    onSuccess: async (res) => {
      // setData("clinic", JSON.stringify(res.clinic));
      return toast({ title: "Register successfully" });
      // router.push("/login");
    },
    onError: async (error) => {
      if (error) {
        toast({
          variant: "destructive",
          title: "Register failed",
          description: error?.response?.data.message,
        });
      }
    },
  });
};
