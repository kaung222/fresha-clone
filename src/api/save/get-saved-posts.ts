import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/user"
import { PostClient } from "../PostClient";

type SavePostResponse = {
    user: User;
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    images: string[];
    tags: string[];
    isPublished: boolean;
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    isSaved: boolean;
}

export const useGetSavedPosts = () => {
    return useQuery<SavePostResponse[]>({
        queryKey: ['SavedPosts'],
        queryFn: async () => {
            return await PostClient.get('/saves').then(res => res.data);
        }
    })
}