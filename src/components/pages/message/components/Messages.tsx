"use client";
import { useConversationSocket } from "@/api/conversation-socket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalstorage } from "@/lib/helpers";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { Message } from "@/types/message";
import { formatDistance } from "date-fns";
import { Check, Download } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  messages: Message[];
  socket: Socket | null;
};

const Messages = ({}: Props) => {
  const { getData } = useLocalstorage();
  const { getQuery } = useSetUrlParams();
  const conversationId = getQuery("chat");
  const { socket, messages, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useConversationSocket();
  const viewRef = useRef<HTMLDivElement>(null);
  const clinic = getData("clinic");
  const [isOtherTyping, setIsOtherTyping] = useState<boolean>(false);

  socket?.on("user_typing", (data: any) => {
    if (data.username != clinic.name) {
      setIsOtherTyping(data.status);
      // console.log(data);
    }
  });

  const formatTime = (date: Date) => {
    if (!date) {
      return "now";
    }
    return formatDistance(date, new Date());
  };
  const handleDownloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    if (viewRef) {
      viewRef.current?.scrollIntoView();
    }
  }, [isOtherTyping, messages]);
  return (
    <>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId == clinic?.id ? "justify-end" : "justify-start"
            } gap-2 mb-4`}
          >
            {message.senderId != clinic?.id && (
              <Avatar className="mr-2">
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col max-w-[70%]">
              <div className={``}>
                {message.type === "text" ? (
                  <div
                    className={` p-3 rounded-lg ${
                      message.senderId == clinic?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                ) : (
                  <div className="relative group">
                    <Image
                      width={300}
                      height={300}
                      src={message.content}
                      alt="Sent image"
                      className="max-w-full h-auto rounded"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDownloadImage(message.content)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.senderId == clinic?.id ? "text-right" : "text-left"
                }`}
              >
                {formatTime(message.createdAt)}
                {message.senderId == clinic?.id && message.isRead && (
                  <Check className="inline-block ml-1 h-3 w-3 text-blue-500" />
                )}
              </div>
            </div>

            {message.senderId == clinic?.id && (
              <Avatar className="ml-2">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isOtherTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="typing-indicator">
              <span>typing.</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
        <div ref={viewRef}></div>
      </ScrollArea>
    </>
  );
};

export default Messages;
