import { useDeleteDoctor } from "@/api/doctor/delete-doctor";
import EditDeleteBar from "@/components/common/edit-delete-bar";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const { mutate } = useDeleteDoctor();
  const handleDeleteDoctor = () => {
    mutate({ id: doctor.id });
  };
  return (
    <div className=" relative ">
      {/* edit  */}
      <div className=" top-7 border bg-white border-button rounded-full size-6 right-3 cursor-pointer z-10 absolute ">
        <EditDeleteBar
          edit={`/doctors/${doctor.id}/edit`}
          handleDelete={handleDeleteDoctor}
        />
      </div>

      <div
        key={doctor.id}
        style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
        className=" overflow-hidden relative z-0 group bg-white rounded-[5px]  mt-6 px-3"
      >
        <div>
          <div className="relative">
            <div className=" relative w-full aspect-square ">
              <Image
                className=" "
                src={doctor?.profilePictureUrl}
                alt="doctor image"
                fill
                sizes="100%"
              />
            </div>
            <div className=" flex flex-col gap-3 absolute bottom-2 left-0 translate-x-[-100px] group-hover:translate-x-0 duration-500 ">
              <div
                style={{
                  boxShadow:
                    "rgba(57, 108, 240, 0.357) 0px 2.34456px 3.9076px 0px",
                }}
                className=" group hover:bg-button stroke-button hover:stroke-white ms-[8px] w-[36px] h-[36px] border-[0.8px] bg-[#dee6edae] border-dashboardBlueShadow rounded-full flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 stroke-inherit "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
              {/* more test  */}
              <div
                style={{
                  boxShadow:
                    "rgba(57, 108, 240, 0.357) 0px 2.34456px 3.9076px 0px",
                }}
                className=" group hover:bg-button ms-[8px] w-[36px] h-[36px] border-[0.8px] bg-[#dee6edae] border-dashboardBlueShadow rounded-full flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 stroke-button group-hover:stroke-white "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>

              <div
                style={{
                  boxShadow:
                    "rgba(57, 108, 240, 0.357) 0px 2.34456px 3.9076px 0px",
                }}
                className=" group hover:bg-button ms-[8px] w-[36px] h-[36px] border-[0.8px] bg-[#dee6edae] border-dashboardBlueShadow rounded-full flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 stroke-button group-hover:stroke-white "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className=" p-6 group-hover:bg-button duration-500 ">
            <Link
              className=" text-center block font-[600] text-[18px] leading-[27px] text-dashboardText group-hover:text-white duration-500 "
              href={`doctors/${doctor.id}`}
            >
              {doctor.name}
            </Link>
            <div className=" text-center font-[400] text-[13.5px] leading-[20.25px] text-[rgb(132,146,166)] group-hover:text-gray-50 duration-500 ">
              {doctor?.speciality.engName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
