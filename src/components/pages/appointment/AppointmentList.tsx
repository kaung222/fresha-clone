"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { useGetBookings } from "@/api/bookings/get-bookings";
import AppointmentItem from "./appointment-item";

type Props = {};

const AppointmentList = (props: Props) => {
  const { data } = useGetBookings();
  console.log(data);

  return (
    <div>
      <div className=" flex  justify-between items-center ">
        <div className=" px-[12px] ">
          <AppBreadcrumb title="Appointment" page="Appointments" />
        </div>

        {/* right  */}
        <div className=" mt-0 lg:mt-6 px-[12px] ">
          <form action="">
            <select
              defaultValue={"today"}
              className="px-[12px] py-[6px] border-[0.8px] rounded-[6px] text-dashboardText text-[15px] border-[rgb(233,236,239)] outline-none focus:border-button "
              name="date"
              id=""
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
          </form>
        </div>
      </div>

      {/* list table  */}
      <div className=" mt-[24px] px-[12px] ">
        <div
          style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
          className=" text-dashboardText text-[15px] font-[400] leading-[22.5px] bg-white rounded-[5px] "
        >
          {/* table inner long width  */}

          <Table className=" ">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow className=" ">
                <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                  Booking ID
                </TableHead>
                <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                  User
                </TableHead>
                <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                  Date
                </TableHead>
                <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                  Booking At
                </TableHead>
                <TableHead className=" p-[16px] font-[700] text-[15px] leading-[22.5px] text-dashboardText ">
                  Gender
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.records.map((booking) => {
                return <AppointmentItem booking={booking} key={booking.id} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
