"use client";
import { useGetOrders } from "@/api/order/get-orders";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderItem from "./order-item";

const OrderList = () => {
  const { data } = useGetOrders();
  return (
    <>
      <div className="">
        <AppBreadcrumb page="Orders" />
        <Table className=" ">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className=" ">
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Order ID
              </TableHead>
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Profile
              </TableHead>
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Name
              </TableHead>
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Status
              </TableHead>
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Order At
              </TableHead>
              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Description
              </TableHead>

              <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.records.map((order) => {
              return <OrderItem order={order} key={order.id} />;
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OrderList;
