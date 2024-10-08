import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import { PostClient } from "../PostClient";
import { toast } from "@/components/ui/use-toast";

export const useRemoveLike = () => {
    const { blogId } = useParams();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return await PostClient.delete(`/likes/${blogId}`).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "removed!" });
            queryClient.invalidateQueries({
                queryKey: ["AllLikes"],
                exact: false,
            })
            queryClient.invalidateQueries({
                queryKey: ["getDetailPost"],
                exact: false,
            })
        }
    })
}