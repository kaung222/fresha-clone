'use client'
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { User } from "@/types/user"
import { PostClient } from "../PostClient"

type LikeResponse = {
    user: User;
    id: string;
}

export const useGetAllLike = () => {
    const { blogId } = useParams();
    return useQuery<LikeResponse[]>({
        queryKey: ["AllLikes"],
        queryFn: async () => {
            return await PostClient.get(`/likes/${blogId}`).then(res => res.data);
        }
    })
}