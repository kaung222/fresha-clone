// import { useLocalstorage } from "@/lib/helpers";
// import { useParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { Socket, io } from "socket.io-client";
// import { useGetMessages } from "./conversation/get-messages";
// import { Message } from "@/types/message";

// export const useVideoChatSocket = () => {

//     const [stream, setStream] = useState<any>(null);
//     const [peer, setPeer] = useState<any>(null);
//     const myVideo = useRef<HTMLVideoElement>();
//     const partnerVideo = useRef<HTMLVideoElement>();
//     const roomId = "669e696d7673403e5de33f8d";
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const url = "http://52.77.143.5:9999";
//   const { conversationId } = useParams();
//   const accessToken = getData("accessToken");

//   useEffect(() => {
//     if (data) {
//       setMessages(data);
//     }
//     const url = "http://52.77.143.5:9999";
//     // const url = "http://localhost:9999";
//     const socket = io(url, {
//       autoConnect: true,
//       auth: {
//         token: accessToken,
//       },
//     });

//     setSocket(socket);

//     if (userId && conversationId) {
//       socket.emit("join_room", { userId, conversationId });
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [data, userId, conversationId]);

//   useEffect(() => {
//     //get user media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = stream;
//         }
//       });
//     // listen for incoming call
//     socket?.on("signal", ({ from, data }) => {
//       console.log(data);

//       if (peer) {
//         peer.signal(data);
//       } else {
//         const newPeer = new SimplePeer({
//           initiator: false,
//           trickle: false,
//           stream: stream,
//         });
//         newPeer.signal(data);
//         newPeer.on("signal", (data) => {
//           socket.emit("signal", { to: from, data });
//         });

//         newPeer.on("stream", (stream) => {
//           if (partnerVideo.current) {
//             partnerVideo.current.srcObject = stream;
//           }
//         });

//         setPeer(newPeer);
//       }
//     });

//     return () => {
//       socket?.off("signal");
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       const handleReceiveMessage = (payload: Message) => {
//         console.log(payload);

//         setMessages((prevMessages) => [...prevMessages, payload]);
//       };

//       const handleDeleteMessage = ({ messageId }: { messageId: string }) => {
//         setMessages(messages.filter((message) => message._id !== messageId));
//       };

//       socket.on("receive_message", handleReceiveMessage);
//       // socket.on("delete_message", handleDeleteMessage);

//       return () => {
//         socket.off("receive_message", handleReceiveMessage);
//         // socket.off("delete_message", handleDeleteMessage);
//       };
//     }
//   }, [socket]);

//   return { socket, messages };
// };
