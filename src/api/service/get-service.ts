"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Service } from "@/types/service";
import { Clinic } from "@/types/clinic";
import { useLocalstorage } from "@/lib/helpers";
type GetServicesResponse = {
  _metadata: PagonationMetadata;
  records: Service[];
};

export const useGetServices = () => {
  const { getQuery } = useSetUrlParams();
  const { getData } = useLocalstorage();
  const search = getQuery("search");
  const page = getQuery("page");
  const pageLimit = getQuery("page_limit");
  const clinic: Clinic = getData("clinic");
  // filter null and empty string with qs librar
  const params = useQueryString({ search, page, pageLimit });
  return useQuery<GetServicesResponse>({
    queryKey: ["GetServicesByClinic", search, page, pageLimit],
    queryFn: async () => {
      return await ApiClient.get(`/clinics/${clinic.id}/services`, {
        params,
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
