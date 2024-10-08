"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PagonationMetadata } from "@/types/_metadata";
import { PostClient } from "../PostClient";
import { Comment } from "@/types/comment";

type CommentResponse = {
  _metadata: PagonationMetadata;
  records: Comment[];
};

export const useGetAllComments = () => {
  const { blogId } = useParams();
  return useInfiniteQuery<CommentResponse>({
    queryKey: ["GetComment"],
    queryFn: async ({ pageParam = 1 }) => {
      return await PostClient.get(`/comments/${blogId}`, {
        params: {
          page: pageParam,
          per_page: 10,
        },
      }).then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage._metadata;
      return page >= pageCount ? undefined : page + 1;
    },
  });
};
