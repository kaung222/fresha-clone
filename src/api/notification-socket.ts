import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useLocalstorage } from "@/lib/helpers";
import { useGetNotifications } from "./notification/get-notification";
import { Notification } from "@/types/notification";

export const useConnectNotification = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getData } = useLocalstorage();
  const { data } = useGetNotifications();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userId = getData("clinic")?.id;
  const accessToken = getData("accessToken");

  useEffect(() => {
    const url = "https://notification.clinic.burmazay.com";
    const socket = io(url, {
      autoConnect: true,
      auth: { token: accessToken },
    });

    setSocket(socket);

    if (data) {
      setNotifications(data.records);
    }

    if (userId) {
      socket.emit("JOIN_NOTIFICATION", { userId });
    }

    return () => {
      socket.disconnect();
    };
  }, [accessToken, data, userId]);

  useEffect(() => {
    if (socket) {
      socket.on("NEW_NOTIFICATION", (newNotification: Notification) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      });
    }

    return () => {
      socket?.off("NEW_NOTIFICATION");
    };
  }, [socket]);

  return { socket, notifications };
};
