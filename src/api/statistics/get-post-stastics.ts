import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type PostStatisticsType = {
  totalPosts: string;
  day: string;
};

export const useGetPostStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const type = getQuery("type") || "monthly";
  const date = getQuery("date");
  return useQuery<PostStatisticsType[]>({
    queryKey: ["PostStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics/posts`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
