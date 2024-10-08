import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ConversationClient } from "../conversation-client";
import { Message } from "@/types/message";
import { useParams } from "next/navigation";
import { PagonationMetadata } from "@/types/_metadata";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";

export type GetMessageResponse = {
  _metadata: PagonationMetadata;
  records: Message[];
};

export const useGetMessages = () => {
  let page = 1;
  const { getQuery } = useSetUrlParams();
  const chatId = getQuery('chat');
  const { conversationId } = useParams();

  return useInfiniteQuery<GetMessageResponse>({
    queryKey: ["GetMessages", chatId],
    queryFn: async ({ pageParam = 1 }) => {
      return await ConversationClient.get(
        `/conversations/${chatId}/messages`,
        {
          params: {
            page: pageParam,
            per_page: 20,
          },
        }
      ).then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage._metadata
      return page >= pageCount ? undefined : page + 1;
    }
  });
};
