import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { PostClient } from "../PostClient";

export const useRemoveSavedPost = () => {
    const queryClient = useQueryClient();
    const { blogId } = useParams();
    return useMutation({
        mutationFn: async () => {
            return await PostClient.delete(`/saves/${blogId}`).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "remove post success!" })
            queryClient.invalidateQueries({
                queryKey: ['SavedPosts'],
                exact: false,
            })
            queryClient.invalidateQueries({
                queryKey: ['getDetailPost'],
                exact: false,
            })
        }
    })
}