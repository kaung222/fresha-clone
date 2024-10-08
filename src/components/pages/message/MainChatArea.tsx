"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChatHeader from "./components/ChatHeader";
import VideoCallArea from "./components/VideoCallArea";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useSendMessage } from "@/api/conversation/send-message";
import { useLocalstorage } from "@/lib/helpers";
import { useGetConversations } from "@/api/conversation/get-conversations";
import { useConversationSocket } from "@/api/conversation-socket";
import { GetUserConversationsDetail } from "@/api/conversation/user-conversation";

type Props = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};

export type CallStatus = "idle" | "ready" | "calling" | "incoming" | "ongoing";

const MainChatArea = ({ setIsSidebarOpen, isSidebarOpen }: Props) => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isImage, setIsImage] = useState<string | undefined>(undefined);
  const { mutate: sendImage } = useSendMessage();
  const { getData } = useLocalstorage();
  const clinic = getData("clinic");
  const { getQuery } = useSetUrlParams();
  const partnerId = getQuery("chat");
  const {
    socket,
    messages,
    conversationData,
    activeUsers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useConversationSocket();

  const openCall = () => {
    setCallStatus("ready");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const imgPayload = {
    content: String(isImage),
    senderId: clinic?.id,
    conversationId: String(conversationData?._doc._id),
    type: "image",
  };

  const handleSendImage = () => {
    sendImage(imgPayload, {
      onSuccess: () => {
        setIsImage(undefined);
      },
    });
  };
  const handleCancelImage = () => {
    setIsImage(undefined);
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader
          activeUsers={activeUsers}
          conversationData={conversationData}
          toggleSidebar={toggleSidebar}
          openCall={openCall}
          callStatus={callStatus}
        />

        {partnerId && (
          <>
            {/* Video Call Area */}
            {callStatus !== "idle" && (
              <VideoCallArea
                callStatus={callStatus}
                setCallStatus={setCallStatus}
                conversationId={conversationData?._doc._id || ""}
              />
            )}

            {/* Messages */}
            <Messages messages={messages} socket={socket} />

            {/* Message Input */}
            <MessageInput
              conversationData={conversationData}
              setImage={setIsImage}
              socket={socket}
            />
          </>
        )}

        {/* Image Preview Dialog */}
        <Dialog
          open={isImage ? true : false}
          onOpenChange={(e) => setIsImage(undefined)}
        >
          <DialogContent className="max-w-[70%]">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            {isImage && (
              <Image
                src={isImage}
                alt="Preview"
                className="max-w-full h-auto"
                width={400}
                height={400}
              />
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelImage}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSendImage}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MainChatArea;
