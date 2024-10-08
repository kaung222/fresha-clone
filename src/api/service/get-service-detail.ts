import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams } from "next/navigation";
import { Service } from "@/types/service";

export type ServiceDetailResponse = {
  averagePeriodPerPatient: number;
  createdAt: string; // ISO date string
  description: string;
  id: string;
  name: string;
  price: number;
  tags: string[];
  thumbnailUrl: string;
  updatedAt: string; // ISO date string
};

export const useGetDetailService = (id: string) => {

  return useQuery<Service>({
    queryKey: ["detailService"],
    queryFn: async () => {
      return await ApiClient.get(`/services/${id}`).then((res) => res.data);
    },
  });
};
