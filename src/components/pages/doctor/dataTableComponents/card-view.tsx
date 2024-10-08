import AppDialog from "@/components/common/dialog";
import { Doctor } from "@/types/doctor";
import React from "react";
import DoctorCard from "../doctor-card";
import Image from "next/image";

type Props = {
  doctor: Doctor;
};

const DoctorCardView = ({ doctor }: Props) => {
  return (
    <>
      <AppDialog trigger={"See Details"} title="Doctor Preview">
        <div className="  flex gap-6 justify-center items-center ">
          <div className=" relative w-[40%] aspect-square ">
            <Image src={doctor.profilePictureUrl} alt="" fill sizes="80%" />
          </div>
          <div className=" w-[50%] ">
            <h1 className=" text-[22px] text-dashboardText font-bold ">
              {doctor.name}
            </h1>
            <p className=" text-[12px] text-text  "></p>
            <br />
            <p className=" text-[14px] text-text font-medium ">
              {doctor.description}
            </p>
          </div>
        </div>
      </AppDialog>
    </>
  );
};

export default DoctorCardView;
