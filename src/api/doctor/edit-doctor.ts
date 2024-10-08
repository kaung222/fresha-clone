"use client";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import { CreateDoctorSchema } from "@/validation-schema/create-doctor.schema";
import { z } from "zod";

type AddDoctorPayload = z.infer<typeof CreateDoctorSchema>;
export const useEditDoctorByClinic = (id: string) => {

  const router = useRouter();
  return useMutation<{ message: string }, ErrorResponse, AddDoctorPayload>({
    mutationFn: async (payload: AddDoctorPayload) => {
      return await ApiClient.patch(`doctors/${id}`, payload).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/doctors");
    },
  });
};
