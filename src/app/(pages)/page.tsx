"use client";

import { useGetAllStatistics } from "@/api/statistics/get-all-statistics";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { useSession } from "next-auth/react";

const Home = () => {

  const { data, isLoading } = useGetAllStatistics();

  if (isLoading) return "The results are calculating";
  return (
    <>
      <div className="">
        <AppBreadcrumb page="Dashboard" />
        <div className=" flex flex-wrap gap-5">

          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Posts</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalPosts}</p>
          </div>

          {/* //Service' */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Services</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalServices}</p>
          </div>

          {/* //Doctor */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Doctors</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalDoctors}</p>
          </div>
          {/* //Booking */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Bookings</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalBookings}</p>
          </div>

          {/* //Likes  */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Likes</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalLikes}</p>
          </div>

          {/* //Medicine  */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"

          >
            <h2 className=" h-3 font-semibold">Total Medicine</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalMedicines}</p>
          </div>

          {/* revenue  */}
          <div
            className=" bg-slate-100 p-7 rounded-md shadow-md shadow-slate-300"
          >
            <h2 className=" h-3 font-semibold">Total Revenues</h2>
            <p className=" text-lg text-blue-700 mt-7">{data?.totalRevenues}</p>
          </div>



        </div>

      </div>

    </>
  );
};

export default Home;





















// 'use client'
// import IconCross from "@/components/icons/IconCross";
// import IconMark from "@/components/icons/IconMark";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import React from "react";

// type Props = {};

// const page = (props: Props) => {
//   const { data: session } = useSession({
//     required: true,
//     // onUnauthenticated() {
//     //   redirect(`/api/auth/signin?callbackUrl=/client`)
//     // }
//   });
//   console.log(session)
//   return (
//     <div className=" w-full h-full  ">
//       <h5 className=" text-dashboardText font-[600] text-[18px] leading-[27px] ">
//         Dashboard
//       </h5>
//       {session && (
//         <div>
//           Signed in as {session.user?.email} <br />
//           <button onClick={() => signOut()} >Sign Out</button>
//         </div>
//       )}
//       {!session && (
//         <div>
//           not signed in <br />
//           <button onClick={() => signIn()} >sign in</button>
//         </div>
//       )}
//       <div
//         style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
//         className=" mt-[24px] px-[12px]
//              "
//       >
//         <div className=" ">
//           <div className=" p-[24px] border-b-[0.8px] border-[rgb(233,236,239)] flex justify-between  ">
//             <div className=" flex gap-1 items-center  ">
//               <span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="size-5 stroke-button"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
//                   />
//                 </svg>
//               </span>
//               <span className=" font-[600] text-dashboardText text-[18px] leading-[27px] ">
//                 Latest Appointment
//               </span>
//             </div>
//             <h6 className=" font-[600] text-[15px] leading-[22.5px] text-[rgb(132,146,166)] ">
//               55 Patients
//             </h6>
//           </div>
//           {/* lists  */}
//           <div className=" p-[24px] ">
//             {/* list  */}
//             <div className=" flex justify-between ">
//               {/* left  */}
//               <div className=" flex items-center ">
//                 <img
//                   className=" size-[43.4px] rounded-full border-[0.8px] border-[rgb(233,236,239)]  "
//                   src="https://shreethemes.in/doctris/layouts/assets/images/client/01.jpg"
//                   alt=""
//                 />
//                 <div className=" ms-[16px] ">
//                   <h2 className=" text-dashboardText font-[600] text-[15px] leading-[22.5px] ">
//                     Calvin Carlo{" "}
//                   </h2>
//                   <small className=" text-[13.5px] font-[400] leading-[20.25px] text-[rgb(132,146,166)] ">
//                     Booking on 27th Nov, 2020
//                   </small>
//                 </div>
//               </div>
//               {/* right  */}
//               <div className=" flex gap-2 ">
//                 <button
//                   style={{
//                     boxShadow: "rgba(83, 199, 151, 0.3) 0px 3px 5px 0px",
//                   }}
//                   className=" size-[34.4px] border-[0.8px] border-[rgba(83,199,151,0.1)] rounded-full bg-[rgba(83,199,151,0.1)] hover:bg-[rgb(83,199,151)] group flex justify-center items-center  "
//                 >
//                   <IconMark className="size-5 stroke-[rgb(83,199,151)] group-hover:stroke-white " />
//                 </button>
//                 <button
//                   style={{ boxShadow: "rgba(240,115,90, 0.3) 0px 3px 5px 0px" }}
//                   className=" group size-[34.4px] border-[0.8px] border-[rgba(83,199,151,0.1)] rounded-full bg-[rgba(240,115,90,0.1)] hover:bg-[rgb(240,115,90)] flex justify-center items-center  "
//                 >

//                   <IconCross
//                     className="size-5 stroke-[rgb(240,115,90)] group-hover:stroke-white " />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
