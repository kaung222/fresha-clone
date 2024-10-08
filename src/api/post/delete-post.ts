import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { PostClient } from "../PostClient";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await PostClient.delete("posts/" + payload.id).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/blogs");
      queryClient.invalidateQueries({
        queryKey: ["GetPostByClinic"],
        exact: false,
      });
    },
    onError(error) {
      toast({ description: error.message, variant: "destructive" });
    },
  });
};
