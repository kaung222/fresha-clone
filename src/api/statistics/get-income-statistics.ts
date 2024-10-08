import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type IncomeStatisticsType = {
  income: string;
  day: string;
  month: string;
};

export const useGetIncomeStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const dateInstance = new Date("2024-08");
  const type = getQuery("type") || "monthly";
  const date = getQuery("date") || dateInstance.toISOString();
  return useQuery<IncomeStatisticsType[]>({
    queryKey: ["IncomeStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics/incomes`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
