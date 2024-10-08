import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Order } from "@/types/order";
type GetOrdersResponse = {
  _metadata: PagonationMetadata;
  records: Order[];
};

export const useGetOrders = () => {
  const { getQuery } = useSetUrlParams();
  const search = getQuery("search");
  const page = getQuery("page");
  const per_page = getQuery("page_limit");
  const params = useQueryString({ search, page, per_page });

  //
  return useQuery<GetOrdersResponse>({
    queryKey: ["GetOrders", search, page, per_page],
    queryFn: async () => {
      return await ApiClient.get(`/clinics/get/orders`, {
        params,
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
