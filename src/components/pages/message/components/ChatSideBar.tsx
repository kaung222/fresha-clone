"use client";
import {
  GetConversationResponse,
  useGetConversations,
} from "@/api/conversation/get-conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalstorage } from "@/lib/helpers";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { Conversation } from "@/types/conversation";
import { InfiniteData } from "@tanstack/react-query";
import { MessageSquare, Search, Users } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  conversationData: InfiniteData<GetConversationResponse, unknown> | undefined;
  isLoading: boolean;
};
const ChatSideBar = ({ conversationData, isLoading }: Props) => {
  const { setQuery } = useSetUrlParams();
  const { getData } = useLocalstorage();
  const clinic = getData("clinic");
  const conversationArray = conversationData?.pages.flatMap((page) => page.records);

  // isLoading && (<div>Loading...</div>)

  return (
    <>
      <ScrollArea className="p-4 h-full">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">Chats</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="">

          {isLoading ? (
            <div className="p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : conversationArray?.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start a conversation or join a channel to begin chatting.
              </p>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Find People
              </Button>
            </div>
          ) : (
            <>

              {
                conversationArray?.map((conversation) => (
                  <div
                    key={conversation._id}
                    onClick={() =>
                      setQuery({ key: "chat", value: conversation.user?.id })
                    }
                    className="flex items-center space-x-4 mb-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={conversation.user?.profilePicture} />
                      <AvatarFallback>
                        {conversation.user?.username.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{conversation.user?.username}</p>
                      <p className="text-sm text-gray-500">
                        {conversation.latestMessage?.content || "Start chat"}
                      </p>
                    </div>
                  </div>
                ))
              }
            </>
          )}

        </ScrollArea>
      </ScrollArea>
    </>
  );
};

export default ChatSideBar;
