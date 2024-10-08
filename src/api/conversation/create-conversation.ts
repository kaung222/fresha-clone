import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/types/response";
type CreateConversationPayload = {
  userId: string;
  clinicId: string;
};
export const useCreateConversation = () => {
  const router = useRouter();
  return useMutation<
    { message: string; conversationId: string },
    ErrorResponse,
    CreateConversationPayload
  >({
    mutationFn: async (payload: CreateConversationPayload) => {
      return await ApiClient.post("conversations", payload).then(
        (res) => res.data
      );
    },
    onSuccess(res) {
      toast({ description: res.message });
      router.push(`/conversations/${res.conversationId}`);
    },
  });
};
