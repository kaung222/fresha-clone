import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type LikeStatisticsType = {
  income: string;
  day: string;
  month: string;
};

export const useGetLikesStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const type = getQuery("type") || "monthly";
  const date = getQuery("date");
  return useQuery<LikeStatisticsType[]>({
    queryKey: ["LikeStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics/likes`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
