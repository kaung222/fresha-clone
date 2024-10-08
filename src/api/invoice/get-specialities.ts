"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export type Specialities = {
  engName: string;
  burmaName: string;
  id: string;
};
export const useGetSpecialities = () => {
  return useQuery<Specialities[]>({
    queryKey: ["GetSpecialities"],
    queryFn: async () => {
      return await ApiClient.get(`/specialities`).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
