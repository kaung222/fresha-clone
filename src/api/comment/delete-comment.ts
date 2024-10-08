import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { PostClient } from "../PostClient";

export const useDeleteComment = () => {
    return useMutation({
        mutationFn: async (postId: string) => {
            return await PostClient.delete(`/comments/${postId}`).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "deleted!" });
        }
    })
}