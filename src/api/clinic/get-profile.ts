"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { Clinic } from "@/types/clinic";
import { useLocalstorage } from "@/lib/helpers";

export const useGetProfile = () => {
  const { getData } = useLocalstorage();
  const clinic: Clinic = getData("clinic");
  return useQuery<Clinic>({
    queryKey: ["GetProfile"],
    queryFn: async () => {
      return await ApiClient.get(`/clinics/${clinic.id}/profile`).then(
        (res) => res.data
      );
    },
    staleTime: 300 * 1000,
  });
};
