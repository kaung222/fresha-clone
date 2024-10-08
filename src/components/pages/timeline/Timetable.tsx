// import { AppBreadcrumb } from "@/components/common/breadcrumb";
// import React from "react";
// import CreateTimetable from "./CreateTimetable";
// import { useGetTimetables } from "@/api/timetable/get-timetables";
// import { Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import UpdateTimetable from "./updateTimetable";
// import { useDeleteTimetable } from "@/api/timetable/delete-timetable";
// export function formatDay(day: number) {
//   switch (day) {
//     case 0:
//       return "Sunday";
//     case 1:
//       return "Monday";
//     case 2:
//       return "Tuesday";
//     case 3:
//       return "Wednesday";
//     case 4:
//       return "Thursday";
//     case 5:
//       return "Friday";
//     case 6:
//       return "Saturday";
//     default:
//       return null;
//   }
// }

// const Timetable = () => {
//   const { data } = useGetTimetables();
//   const { mutate } = useDeleteTimetable();
//   return (
//     <>
//       <AppBreadcrumb page="Clinic Timetable" />
//       <CreateTimetable />
//       <div className="">
//         <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
//           <thead className=" bg-slate-300 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-5">
//                 Day
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Start Time
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 End Time
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Notes
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((timetable) => {
//               return (
//                 <tr
//                   className="border-t odd:bg-slate-50 even:bg-slate-200"
//                   key={timetable.id}
//                 >
//                   <td className="px-6 py-1">{formatDay(timetable.day)}</td>
//                   <td className="px-6 py-1">{timetable.startTime}</td>
//                   <td className="px-6 py-1">{timetable.endTime}</td>
//                   <td className=" px-6 py-1">{timetable.status}</td>
//                   <td className=" px-6 py-1">{timetable.notes}</td>
//                   <td className=" px-6 py-1 flex gap-2">
//                     <Button onClick={() => mutate({ id: timetable.id })}>
//                       <Trash2 />
//                     </Button>
//                     <UpdateTimetable timetable={timetable} />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Timetable;
