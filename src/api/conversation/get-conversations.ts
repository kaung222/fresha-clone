import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useQueryString } from "@/lib/hooks/useQueryString";
import { PagonationMetadata } from "@/types/_metadata";

import { useLocalstorage } from "@/lib/helpers";
import { Clinic } from "@/types/clinic";
import { Conversation } from "@/types/conversation";
import { ConversationClient } from "../conversation-client";

export type GetConversationResponse = {
  _metadata: PagonationMetadata;
  records: Conversation[];
};

export const useGetConversations = () => {
  const { getQuery } = useSetUrlParams();
  const search = getQuery("search");
  const page = getQuery("page");
  const per_page = getQuery("page_limit");
  //get gg
  const params = useQueryString({ search, page, per_page });
  return useInfiniteQuery<GetConversationResponse>({
    queryKey: ["GetConversations", search, page, per_page],
    queryFn: async ({ pageParam = 1 }) => {
      return await ConversationClient.get(`/conversations`, {
        params: {
          page: pageParam,
          per_page: 20,
          search,
        },
      }).then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage._metadata;
      return page >= pageCount ? undefined : page + 1;
    }
  });
};
