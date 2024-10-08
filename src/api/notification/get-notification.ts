import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { PagonationMetadata } from "@/types/_metadata";
import { Notification } from "@/types/notification";

type GetNofificationResponse = {
  _metadata: PagonationMetadata;
  records: Notification[];
};

export const useGetNotifications = () => {
  return useQuery<GetNofificationResponse>({
    queryKey: ["GetNotifications"],
    queryFn: async () => {
      return await ApiClient.get(`/notifications`).then((res) => res.data);
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
