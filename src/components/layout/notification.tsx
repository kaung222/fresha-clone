"use client";
import { useConnectNotification } from "@/api/notification-socket";
import IconMail from "../icons/IconMail";
import AppDropdown from "../common/DropDown";
import { DropdownMenuLabel } from "../ui/dropdown-menu";
import NotificationItem from "./notification-item";

const Notification = () => {
  const { socket, notifications } = useConnectNotification();
  return (
    <>
      <AppDropdown
        trigger={
          <IconMail className=" size-5  text-button w-[30px] h-[30px] p-1 rounded-full" />
        }
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        {notifications?.map((notification) => {
          return (
            <NotificationItem
              notification={notification}
              key={notification.id}
            />
          );
        })}
        {notifications.length == 0 && (
          <div className=" w-full h-full flex justify-center items-center ">
            <div>Notification is empty!</div>

          </div>
        )}
      </AppDropdown>
    </>
  );
};

export default Notification;
