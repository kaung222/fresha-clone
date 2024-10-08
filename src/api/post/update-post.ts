import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { Clinic } from "@/types/clinic";
import { useLocalstorage } from "@/lib/helpers";
import { PostClient } from "../PostClient";
type CreatePostPayload = {
  title: string;
  content: string;
  images?: string[];
  tags: string[];
};
export const useUpdatePost = () => {
  const { getData } = useLocalstorage();
  const router = useRouter();
  const { blogId } = useParams();
  //get clinic from localstorage
  const clinic: Clinic = getData("clinic");
  return useMutation<{ message: string }, ErrorResponse, CreatePostPayload>({
    mutationFn: async (payload: CreatePostPayload) => {
      return await PostClient.patch(`posts/${blogId}`, payload).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push("/blogs");
    },
  });
};
