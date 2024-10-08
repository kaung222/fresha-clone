import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Notification } from "@/types/notification";
import { useDeleteNotification } from "@/api/notification/delete-notification";
import { formatDistance, subDays } from "date-fns";
import Image from "next/image";

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { mutate } = useDeleteNotification();
  const deleteNotification = (id: string) => {
    mutate({ id });
  };
  return (
    <DropdownMenuItem className=" w-full  " key={notification.id}>
      <div className=" py-[8px] w-full ">
        <div className=" flex w-full ">
          <Image
            fill
            className=" w-[45px] h-[45px] rounded-full  "
            src="https://shreethemes.in/doctris/layouts/assets/images/client/02.jpg"
            alt=""
          />
          <div className=" ms-[16px] w-full text-[rgb(132,146,166)] ">
            <small className=" font-[400] text-[12.15px] leading-[18.22px] ">
              {notification.title}
            </small>
            {/* <b className=" inline-block text-[13.5px] text-[rgb(33,37,41)] leading-[20.25px] ">
              test
            </b> */}
            <small className="block font-[400] text-[12.15px] leading-[18.225px] ">
              {formatDistance(new Date(), notification.createdAt)}
            </small>
          </div>
        </div>
        <button onClick={() => deleteNotification(notification.id)}>
          delete
        </button>
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationItem;
