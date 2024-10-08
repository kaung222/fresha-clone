import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams } from "next/navigation";
import { Section } from "@/types/section";

export const useGetDoctorSection = () => {
  const { doctorId } = useParams();
  return useQuery<Section[]>({
    queryKey: ["DoctorSection"],
    queryFn: async () => {
      return await ApiClient.get(`sections/${doctorId}`).then(
        (res) => res.data
      );
    },
  });
};
