"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Medicine } from "@/types/medicine";
type GetMedicinesResponse = {
  _metadata: PagonationMetadata;
  records: Medicine[];
};

export const useGetMedicines = () => {
  const { getQuery } = useSetUrlParams();
  const search = getQuery("search");
  const page = getQuery("page");
  const params = useQueryString({ search, page });
  return useQuery<GetMedicinesResponse>({
    queryKey: ["GetMedicines", search, page],
    queryFn: async () => {
      return await ApiClient.get(`/products`, {
        params,
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
