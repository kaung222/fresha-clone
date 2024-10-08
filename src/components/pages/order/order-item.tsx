import { ApiClient } from "@/api/ApiClient";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/types/order";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";

const OrderItem = ({ order }: { order: Order }) => {
  const deleteOrder = (id: string) => {
    ApiClient.delete("orders/" + id);
  };
  return (
    <>
      <TableRow>
        <TableCell className="  p-[16px] font-[700] ">
          {order.orderId}
        </TableCell>
        <TableCell className="  p-[16px] ">
          <Image fill src={order.user.profilePicture} alt="profile" />
        </TableCell>
        <TableCell className="  p-[16px] ">{order.user.username}</TableCell>
        <TableCell className="  p-[16px] ">{order.status}</TableCell>
        <TableCell className="  p-[16px] ">
          {formatDistance(new Date(), order.createdAt)}
        </TableCell>
        <TableCell className="  p-[16px] ">{order.description}</TableCell>
        <TableCell
          className="  p-[16px] "
          onClick={() => deleteOrder(order.id)}
        >
          delete
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderItem;
