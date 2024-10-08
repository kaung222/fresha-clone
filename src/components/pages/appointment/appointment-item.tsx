"use client";
import { ApiClient } from "@/api/ApiClient";
import { useCancelBooking } from "@/api/bookings/cancel-booking";
import { useConfirmBooking } from "@/api/bookings/confirm-booking";
import AppDialog from "@/components/common/dialog";
import ToolTipCommon from "@/components/common/tool-tip-common";
import IconCross from "@/components/icons/IconCross";
import IconMark from "@/components/icons/IconMark";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Booking } from "@/types/booking";
import { formatDistance } from "date-fns";
import React from "react";
import AppointmentResponseForm from "./AppointmentRequest";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import Image from "next/image";

const AppointmentItem = ({ booking }: { booking: Booking }) => {
  const form = useForm();
  const { mutate: cancel } = useCancelBooking();
  const { mutate: confirm } = useConfirmBooking();
  const deleteBook = async (id: string) => {
    await ApiClient.delete("bookings/" + id);
  };
  const cancelBooking = (value: any) => {
    cancel({ id: booking.id, description: value.description });
  };

  const confirmBooking = () => {
    confirm({ id: booking.id });
  };
  return (
    <>
      <TableRow>
        <TableCell className="  p-[16px] font-[700] ">
          {booking.bookingId}
        </TableCell>
        <TableCell className="  p-[16px] ">
          <div className="flex items-center gap-1">
            <span>{booking.name}</span>
          </div>
        </TableCell>
        <TableCell className="  p-[16px] ">{booking?.age}</TableCell>
        <TableCell className="  p-[16px] ">
          {booking.bookingDate.toString()}
        </TableCell>
        <TableCell className="  p-[16px] ">
          {formatDistance(new Date(), booking.createdAt)}
        </TableCell>
        <TableCell
          className="  p-[16px] "
          // onClick={() => deleteBook(booking.id)}
        >
          <div>
            {booking.status == "PENDING" && (
              <div className="px-2 py-1 inline-block rounded-full bg-orange-500 text-green-50 text-xs font-medium">
                Pending
              </div>
            )}
            {booking.status == "CONFIRMED" && (
              <div className="px-2 py-1 inline-block rounded-full bg-green-500 text-green-50 text-xs font-medium">
                Confirm
              </div>
            )}
            {booking.status == "CANCELED" && (
              <div className="px-2 py-1 inline-block rounded-full bg-red-500 text-green-50 text-xs font-medium">
                Cancel
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="  p-[16px] ">
          <AppDialog trigger={"See Details"} title="Appointment Details">
            <div className=" p-4 pt-6 ">
              <div className=" flex items-center  ">
                <div>
                  <Image
                    fill
                    className=" size-[65px] rounded-full "
                    src="https://shreethemes.in/doctris/layouts/assets/images/client/01.jpg"
                    alt=""
                  />
                </div>
                <h5 className=" ms-4 text-dashboardText text-[18px] font-[600] leading-[27px] ">
                  Howard Tanner
                </h5>
              </div>
              <ul className=" mt-6 ">
                <li>
                  <ul>
                    <AppointmentDetail name="Doctor" value="Dr. Vavin Carlo" />
                    <AppointmentDetail name="Time" value="11:00 AM" />
                    <AppointmentDetail name="Date" value="20th Dec 2024" />
                    <AppointmentDetail name="Gender" value="MALE" />
                    <AppointmentDetail name="Age" value="25 years old" />
                  </ul>
                </li>
                <li></li>
              </ul>
            </div>
          </AppDialog>
        </TableCell>
        <TableCell>
          <div className=" flex gap-2 ">
            {/* Confirm Booking  */}
            <ToolTipCommon title="confirm">
              <Button
                onClick={confirmBooking}
                disabled={booking.status !== "PENDING"}
                className=" bg-green-500 disabled:bg-green-300 "
              >
                Accept
              </Button>
            </ToolTipCommon>

            {/* Cancel Booking  */}
            <AppDialog
              trigger={
                <Button
                  disabled={booking.status !== "PENDING"}
                  className=" bg-delete disabled:bg-red-300 "
                >
                  Cancel
                </Button>
              }
              title="Send why this booking isn't available!"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(cancelBooking)}>
                  <FormTextarea
                    form={form}
                    label="Description"
                    name="description"
                    placeholder="give node"
                  />
                  <Button className=" bg-delete ">Cancel Booking</Button>
                </form>
              </Form>
            </AppDialog>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AppointmentItem;

const AppointmentDetail = ({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) => {
  return (
    <li className="flex h-10 ">
      <h6 className=" text-dashboardText font-[600] text-[15px] leading-[22.5px] ">
        {name}
      </h6>
      <p className=" ms-2 mb-4 text-[rgb(132,146,166)] font-[400] text-[15px] leading-[24px] ">
        {value}
      </p>
    </li>
  );
};
