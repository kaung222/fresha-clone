"use client";
import { useGetDoctorsByClinic } from "@/api/doctor/get-doctors";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import Link from "next/link";
import DoctorCard from "./doctor-card";
import EmptyData from "@/components/common/empty-data";
import Loading from "@/components/common/loading";

const DoctorList = () => {
  const { data, isLoading } = useGetDoctorsByClinic();
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className=" flex  justify-between items-center ">
        <div className=" px-[12px] ">
          {/* breadcrumb  */}
          <AppBreadcrumb title="Doctors" page="Doctors" />
        </div>

        {/* right  */}
        <div className=" mt-0 lg:mt-6 px-[12px] ">
          <div className=" w-[110px] h-[53.5px]  ">
            <Link
              href="/doctors/create"
              className=" block w-full px-5 py-2 border-[0.8px] bg-button border-button rounded-[5px] text-white font-[400] text-[15px] leading-[22.5px] text-center "
            >
              Add Doctor
            </Link>
          </div>
        </div>
      </div>

      {/* all cards  */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {/* card  */}

        {data?.records.map((doctor) => {
          return <DoctorCard doctor={doctor} key={doctor.id} />;
        })}
        {data?.records.length === 0 && <EmptyData name="doctor" />}
      </div>
    </div>
  );
};

export default DoctorList;
