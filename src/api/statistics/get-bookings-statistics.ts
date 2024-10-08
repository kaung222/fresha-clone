import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

type BookingStatisticsType = {
  booking: string;
  day: string;
  month: string;
};

export const useGetBookingsStatistics = () => {
  const { getQuery } = useSetUrlParams();
  const type = getQuery("type") || "monthly";
  const date = getQuery("date");
  return useQuery<BookingStatisticsType[]>({
    queryKey: ["BookingStatistics", type, date],
    queryFn: async () => {
      return await ApiClient.get(`statistics/bookings`, {
        params: {
          type,
        },
      }).then((res) => res.data);
    },
  });
};
