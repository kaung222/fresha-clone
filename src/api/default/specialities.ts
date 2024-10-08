import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

type SpecialityType = {
  id: number;
  engName: string;
  burmaName: string;
  userId: string | null;
};

export const useGetSpeciality = () => {
  return useQuery<SpecialityType[]>({
    queryKey: ["Specialities"],
    queryFn: async () => {
      return await ApiClient.get("specialities").then((res) => res.data);
    },
  });
};
