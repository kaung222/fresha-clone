"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams } from "next/navigation";
import { User } from "@/types/user";
import { Clinic } from "@/types/clinic";
import { PostClient } from "../PostClient";
import { Post } from "@/types/post";

export type postDetailType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  isPublished: boolean;
  user?: User;
  clinic?: Clinic;
};

export const useGetPostDetails = () => {
  const { blogId } = useParams();

  return useQuery<Post>({
    queryKey: ["getDetailPost"],
    queryFn: async () => {
      return await PostClient.get(`posts/${blogId}`).then((res) => res.data);
    },
  });
};
