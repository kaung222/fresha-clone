import React from "react";
import AppDialog from "./../../../common/dialog";
import Image from "next/image";

type Props = {};

const ViewUser = (props: Props) => {
  return (
    <>
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
    </>
  );
};

export default ViewUser;

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
