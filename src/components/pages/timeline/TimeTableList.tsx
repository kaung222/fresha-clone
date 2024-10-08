// "use client";

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { AppBreadcrumb } from "@/components/common/breadcrumb";
// import CreateTimetable from "./CreateTimetable";
// import { useDeleteTimetable } from "@/api/timetable/delete-timetable";
// import UpdateTimetable from "./updateTimetable";
// import { Trash2 } from "lucide-react";
// import AssignDoctor from "./AssignDoctor";
// import { useGetTimetablesOfDoctor } from "@/api/timetable/get-timetables";
// import { useParams } from "next/navigation";

// function formatDay(day: number) {
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

// export default function TimeTableList() {
//   const { doctorId } = useParams();
//   const { data } = useGetTimetablesOfDoctor(String(doctorId));
//   const { mutate } = useDeleteTimetable();

//   return (
//     <>
//       <AppBreadcrumb page="Clinic Timetable" />
//       <CreateTimetable />
//       <div className="overflow-auto border rounded-lg">
//         <Table>
//           <TableHeader className="bg-primary text-primary-foreground">
//             <TableRow>
//               <TableHead>Day</TableHead>
//               <TableHead>Time</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Notes</TableHead>
//               <TableHead>Assigned</TableHead>
//               <TableHead>max Bookings</TableHead>
//               <TableHead className=" text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data?.map((timeline, index) => (
//               <TableRow
//                 key={timeline.id}
//                 className={`${index % 2 === 0 ? "bg-muted" : "bg-background"}`}
//               >
//                 <TableCell>{formatDay(timeline.day)}</TableCell>
//                 <TableCell>
//                   {timeline.startTime.slice(0, 5)} -{" "}
//                   {timeline.endTime.slice(0, 5)}
//                 </TableCell>
//                 <TableCell>
//                   <div
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       timeline.status == "available"
//                         ? "bg-green-200 text-green-900"
//                         : "bg-red-200 text-red-900"
//                     }`}
//                   >
//                     {timeline.status == "available" ? "Available" : "holiday"}
//                   </div>
//                 </TableCell>
//                 <TableCell>{timeline.notes}</TableCell>
//                 <TableCell>Assign Lists</TableCell>
//                 <TableCell>{timeline.maxBookings}</TableCell>
//                 <TableCell>
//                   <div className="flex justify-end gap-2">
//                     <AssignDoctor timeTable_id={timeline.id} />
//                     <UpdateTimetable timetable={timeline} />
//                     <Button
//                       onClick={() => mutate({ id: timeline.id })}
//                       variant="outline"
//                       size="sm"
//                     >
//                       <Trash2 className=" size-4 stroke-delete" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }
