'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useRemoveLike } from "./remove-Like";
import { PostClient } from "../PostClient";

export const useGiveLikeReact = () => {
    const { blogId } = useParams();
    const { mutate } = useRemoveLike();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return await PostClient.post(`/likes/${blogId}`).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "liked!" });
            queryClient.invalidateQueries({
                queryKey: ['AllLikes'],
                exact: false,
            })
            queryClient.invalidateQueries({
                queryKey: ['getDetailPost'],
                exact: false,
            })
        },
        onError: () => {
            mutate();
        }
    })
}