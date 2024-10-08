"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { PhoneIncoming, PhoneOff } from "lucide-react";
import { useLocalstorage } from "@/lib/helpers";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { toast } from "@/components/ui/use-toast";
import useSetUrlParams from "@/lib/hooks/urlSearchParam";
import { CallStatus } from "../MainChatArea";
import { Conversation } from "@/types/conversation";

type Props = {
  callStatus: CallStatus;
  setCallStatus: Dispatch<SetStateAction<CallStatus>>;
  conversationId: string;
};

const VideoCallArea = ({
  callStatus,
  setCallStatus,
  conversationId,
}: Props) => {
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const [isVideoControlsVisible, setIsVideoControlsVisible] = useState(false);
  const { getData } = useLocalstorage();
  const { getQuery } = useSetUrlParams();
  const accessToken = getData("accessToken");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData>();
  const url = "https://socket.chat.burmazay.com";
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const socket = io(url, {
      auth: { token: accessToken },
      autoConnect: true,
    });

    socket && setSocket(socket);
    socket.emit("join_room", { conversationId });
    socket.on("receive_call", (data) => {
      toast({ title: `${data.username} is calling` });
      console.log(`${data.username} is calling`);
      setCallStatus("incoming");
      setCallerSignal(data.signal);
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, conversationId, callStatus]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        mediaStreamRef.current = mediaStream;
        setStream(mediaStream);
        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    // Cleanup function to stop the camera when the component unmounts
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  // make call
  const makeCall = () => {
    if (!stream) return;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      },
    });
    peer.on("signal", (signal) => {
      socket?.emit("make_call", {
        conversationId,
        signal,
        username: "James",
      });
      setCallStatus("calling");
    });
    peer.on("stream", (partnerStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });
    connectionRef.current = peer;
    socket?.on("call_accepted", ({ signal }) => {
      console.log("accept");
      peer.signal(signal);
      setCallStatus("ongoing");
    });
  };

  // acceptCall
  const acceptCall = () => {
    if (!stream) return;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      },
    });
    peer.on("signal", (signal) => {
      socket?.emit("answer_call", { signal, conversationId });
    });
    peer.on("stream", (partnerStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
      }
    });
    if (callerSignal) peer.signal(callerSignal);
    connectionRef.current = peer;
    setCallStatus("ongoing");
  };

  //leave call
  const leaveCall = () => {
    console.log("call leave");
    socket?.emit("leave_call", { conversationId, username: "James" });
    // Stop all media tracks
    stream?.getTracks().forEach((track) => track.stop());

    // Clear video elements
    if (myVideo.current) myVideo.current.srcObject = null;
    if (partnerVideo.current) partnerVideo.current.srcObject = null;
    connectionRef.current?.destroy();
    setCallStatus("ready");
  };

  const handleAcceptCall = () => {
    setCallStatus("ongoing");
  };

  const handleRejectCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    // Clear video elements
    if (myVideo.current) myVideo.current.srcObject = null;
    if (partnerVideo.current) partnerVideo.current.srcObject = null;
    setCallStatus("idle");
  };

  const handleLeaveCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    // Clear video elements
    if (myVideo.current) myVideo.current.srcObject = null;
    if (partnerVideo.current) partnerVideo.current.srcObject = null;
    setCallStatus("idle");
  };
  return (
    <>
      <div
        ref={videoAreaRef}
        className="bg-gray-800 h-64 md:h-96 relative"
        onMouseEnter={() => setIsVideoControlsVisible(true)}
        onMouseLeave={() => setIsVideoControlsVisible(false)}
      >
        <video
          ref={partnerVideo}
          className="w-full h-full object-cover"
          autoPlay
          loop
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-900 border-2 border-white rounded-lg overflow-hidden">
          <video
            ref={myVideo}
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
            autoPlay
            muted
            loop
          ></video>
        </div>
        {isVideoControlsVisible && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {callStatus === "ready" && (
              <>
                <Button onClick={makeCall} variant="default" size="sm">
                  <PhoneIncoming className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button
                  onClick={handleLeaveCall}
                  variant="destructive"
                  size="sm"
                >
                  <PhoneOff className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
            {callStatus === "incoming" && (
              <>
                <Button onClick={acceptCall} variant="default" size="sm">
                  <PhoneIncoming className="mr-2 h-4 w-4" />
                  Accept
                </Button>
                <Button
                  onClick={handleRejectCall}
                  variant="destructive"
                  size="sm"
                >
                  <PhoneOff className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
            {callStatus === "ongoing" && (
              <Button onClick={leaveCall} variant="destructive" size="sm">
                <PhoneOff className="mr-2 h-4 w-4" />
                Leave Call
              </Button>
            )}
            {callStatus === "calling" && (
              <Button onClick={handleLeaveCall} variant="destructive" size="sm">
                <PhoneOff className="mr-2 h-4 w-4" />
                Cancel Call
              </Button>
            )}
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {callStatus === "incoming" && "Incoming Call..."}
          {callStatus === "calling" && "Calling..."}
          {callStatus === "ongoing" && "On Call"}
        </div>
      </div>
    </>
  );
};

export default VideoCallArea;
