"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  PhoneOff,
  Send,
  Menu,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";
import ChatSideBar from "./components/ChatSideBar";
import ChatHeader from "./components/ChatHeader";
import VideoCallArea from "./components/VideoCallArea";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import { useConversationSocket } from "@/api/conversation-socket";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetConversations } from "@/api/conversation/get-conversations";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { useLocalstorage } from "@/lib/helpers";
import { useSendMessage } from "@/api/conversation/send-message";
import MainChatArea from "./MainChatArea";

export default function ChatDesign() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: conversationData, isLoading } = useGetConversations();
  const { getQuery } = useSetUrlParams();
  const { getData } = useLocalstorage();
  const clinic = getData("clinic");
  const userId = getQuery("chat");

  return (
    <div className="flex h-h-screen-minus-120 bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white ${userId ? "w-64" : "w-full"
          } flex-shrink-0 border-r ${userId ? (isSidebarOpen ? "block" : "hidden") : "block"
          } md:block`}
      >
        <ChatSideBar isLoading={isLoading} conversationData={conversationData} />
      </div>

      {/* Main Chat Area */}
      {userId && (
        <MainChatArea
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </div>
  );
}
