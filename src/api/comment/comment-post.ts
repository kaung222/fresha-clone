'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { PostClient } from "../PostClient";

type CommentPayload = {
    content: string;
    type: string;
}

export const useCommentPost = () => {
    const { blogId } = useParams();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CommentPayload) => {
            return await PostClient.post(`/comments/${blogId}`, payload).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "commented!" });
            queryClient.invalidateQueries({
                queryKey: ["GetComment"],
                exact: false,
            })
        }
    })
}