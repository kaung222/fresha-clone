"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams } from "next/navigation";
import { Doctor } from "@/types/doctor";
export const useGetDetailDoctor = () => {
  const { doctorId } = useParams();
  return useQuery<Doctor>({
    queryKey: ["getDetailDoctor"],
    queryFn: async () => {
      return ApiClient.get(`doctors/${doctorId}`).then((res) => res.data);
    },
  });
};
