import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const useGetAllClinicTypes = () => {
  return useQuery({
    queryKey: ["AllClinicTypes"],
    queryFn: async () => {
      return await ApiClient.get("/clinic-types").then((res) => res.data);
    },
  });
};
