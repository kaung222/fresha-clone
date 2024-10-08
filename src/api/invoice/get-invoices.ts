"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Invoice } from "@/types/invoice";
type GetPostsResponse = {
  _metadata: PagonationMetadata;
  records: Invoice[];
  totalAmount: number;
};

export const useGetInvoices = () => {
  const { getQuery } = useSetUrlParams();
  const search = getQuery("search");
  const page = getQuery("page");
  const per_page = getQuery("page_limit");
  const params = useQueryString({ search, page, per_page });
  return useQuery<GetPostsResponse>({
    queryKey: ["GetInvoices", search, page, per_page],
    queryFn: async () => {
      return await ApiClient.get(`/invoices`, {
        params,
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
