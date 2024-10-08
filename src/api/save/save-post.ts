import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { PostClient } from "../PostClient";

export const useSavePost = () => {
    const queryClient = useQueryClient();
    const { blogId } = useParams();
    return useMutation({
        mutationFn: async () => {
            return await PostClient.post(`/saves/${blogId}`).then(res => res.data);
        },
        onSuccess: () => {
            toast({ title: "post saved!" });
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