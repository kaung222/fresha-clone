import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type OrderStatisticsType = {
  order: string;
  day: string;
  month: string;
};

export const useGetOrderStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const type = getQuery("type") || "monthly";
  const date = getQuery("date");
  return useQuery<OrderStatisticsType[]>({
    queryKey: ["OrderStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics/orders`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
