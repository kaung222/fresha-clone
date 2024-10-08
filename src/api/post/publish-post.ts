import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { PostClient } from "../PostClient";

export const usePublishPost = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await PostClient.post(`posts/${payload.id}/publish`, payload).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/blogs");
    },
  });
};
