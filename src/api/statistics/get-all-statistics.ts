import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type IncomeStatisticsType = {
  id: string;
  createdAt: string;
  totalBookings: number;
  totalDoctors: number;
  totalLikes: number;
  totalMedicines: number;
  totalPosts: number;
  totalRevenues: number;
  totalServices: number;
  totalViews: number;
  updatedAt: string;
};

export const useGetAllStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const type = getQuery("type") || "monthly";
  const date = getQuery("date");
  return useQuery<IncomeStatisticsType>({
    queryKey: ["AllStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
