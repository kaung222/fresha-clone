import { useLocalstorage } from "@/lib/helpers";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useGetMessages } from "./conversation/get-messages";
import { Message } from "@/types/message";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { GetUserConversationsDetail } from "./conversation/user-conversation";

export const useConversationSocket = () => {
  const [activeUsers, setActiveUser] = useState<string[]>([]);
  const socket = useRef<Socket | null>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetMessages();
  const { getData } = useLocalstorage();
  const { getQuery } = useSetUrlParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = getData("clinic")?.id;
  const partnerId = getQuery("chat");
  const accessToken = getData("accessToken");
  const { data: conversationData } = GetUserConversationsDetail(partnerId)
  const conversationId = conversationData?._doc._id

  useEffect(() => {
    if (data) {
      const messageArray: Message[] = [];
      data.pages?.map((page) =>
        page.records.map((message) => messageArray.unshift(message))
      );
      setMessages(messageArray);
    }
    // const url = "http://3.0.133.180:9999";
    // const url = "http://localhost:9999";
    const url = "https://socket.chat.burmazay.com";
    socket.current = io(url, {
      autoConnect: true,
      auth: {
        token: accessToken,
      },
    });

    if (userId && conversationId) {
      socket.current.emit("join_room", { userId, conversationId });
      // socket.current.emit("get_active_members", { conversationId });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [accessToken, data, conversationId, userId]);

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (payload: Message) => {
        console.log(payload);

        setMessages((prevMessages) => [...prevMessages, payload]);
      };

      const handleDeleteMessage = ({ messageId }: { messageId: string }) => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      };

      const getActiveUser = (data: string[]) => {
        console.log(data);
        setActiveUser(data);
      };

      socket.current?.on("receive_message", handleReceiveMessage);
      socket.current?.on("active_members", getActiveUser);
      // socket.on("delete_message", handleDeleteMessage);

      return () => {
        socket.current?.off("receive_message", handleReceiveMessage);
        // socket.off("delete_message", handleDeleteMessage);
      };
    }
  }, [socket, messages]);

  return {
    socket: socket.current,
    messages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    conversationData,
    activeUsers,
  };
};
