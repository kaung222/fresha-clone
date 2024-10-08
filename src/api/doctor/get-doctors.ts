"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Doctor } from "@/types/doctor";
import { ApiClient } from "../ApiClient";
import { useLocalstorage } from "@/lib/helpers";
import { Clinic } from "@/types/clinic";

export type GetDoctorsResponse = {
  _metadata: PagonationMetadata;
  records: Doctor[];
};

export const useGetDoctorsByClinic = () => {
  const { getQuery } = useSetUrlParams();
  const search = getQuery("search");
  const page = getQuery("page") || 1;
  const pageLimit = getQuery("pageLimit");
  const { getData } = useLocalstorage();
  const clinic: Clinic = getData("clinic");
  const params = useQueryString({ search, page, pageLimit });
  return useQuery<GetDoctorsResponse>({
    queryKey: ["GetDoctors", search, page, pageLimit],
    queryFn: async () => {
      return await ApiClient.get(`/clinics/${clinic.id}/doctors`, {
        params
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
