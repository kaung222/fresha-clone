"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";
import { Post } from "@/types/post";
import { useLocalstorage } from "@/lib/helpers";
import { Clinic } from "@/types/clinic";
import { PostClient } from "../PostClient";
type GetPostsResponse = {
  _metadata: PagonationMetadata;
  records: Post[];
};

export const useGetPostsByClinic = () => {
  const { getQuery } = useSetUrlParams();
  const { getData } = useLocalstorage();
  const clinic: Clinic = getData("clinic");
  const search = getQuery("search");
  const page = getQuery("page");
  const per_page = getQuery("page_limit");
  const params = useQueryString({ search, page, per_page });
  return useQuery<GetPostsResponse>({
    queryKey: ["GetPostByClinic", search, page, per_page],
    queryFn: async () => {
      return await PostClient.get(`/posts/user/${clinic.id}/me`, {
        params,
      }).then((res) => res.data);
    },
    staleTime: 300 * 1000,
    refetchOnWindowFocus: false,
  });
};
