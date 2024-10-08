// import { useGetDoctorsByClinic } from "@/api/doctor/get-doctors";
// import { useAssignDoctor } from "@/api/timetable/assign-doctor";
// import AppDialog from "@/components/common/dialog";
// import FormSelect from "@/components/common/FormSelect";
// import { Button } from "@/components/ui/button";
// import { DialogFooter } from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";
// import { Check } from "lucide-react";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { formatDay } from "./Timetable";
// import { useGetTimetablesOfDoctor } from "@/api/timetable/get-timetables";

// type Props = {
//   timeTable_id?: string;
//   doctor_id?: string;
// };

// const AssignDoctor = ({ timeTable_id, doctor_id }: Props) => {
//   const form = useForm();
//   const { data: doctors } = useGetDoctorsByClinic();
//   const { data: timetables } = useGetTimetablesOfDoctor();
//   const { mutate } = useAssignDoctor();
//   const doctorOptions = doctors?.records.map((doctor) => {
//     return { name: doctor.name, value: doctor.id };
//   });

//   const timetableOptions = timetables?.map((timetable) => {
//     return {
//       name: `${formatDay(timetable.day)} ${timetable.startTime.slice(
//         0,
//         5
//       )}-${timetable.endTime.slice(0, 5)}`,
//       value: timetable.id,
//     };
//   });

//   const assignDoctor = (data: any) => {
//     if (doctor_id) {
//       data.doctorId = doctor_id;
//     }
//     if (timeTable_id) {
//       data.timetableId = timeTable_id;
//     }
//     console.log("assign", data);
//     mutate(data);
//   };
//   return (
//     <div className="">
//       <AppDialog
//         trigger={
//           <Button variant="outline" size="sm">
//             Assign Doctor
//           </Button>
//         }
//         title="Assign Doctor"
//       >
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(assignDoctor)}
//             className="grid grid-cols-2 gap-5 "
//           >
//             {!doctor_id && (
//               <FormSelect
//                 form={form}
//                 name="doctorId"
//                 label="Doctor"
//                 options={doctorOptions}
//                 placeholder="Choose Doctor"
//               />
//             )}
//             {!timeTable_id && (
//               <FormSelect
//                 name="timetableId"
//                 form={form}
//                 options={timetableOptions}
//                 label="Timetable"
//                 placeholder="Choose Timetable"
//               />
//             )}

//             <FormSelect
//               name="status"
//               form={form}
//               options={[
//                 { name: "available", value: "available" },
//                 { name: "leave", value: "leave" },
//               ]}
//               label="Status"
//               placeholder="Choose Status"
//             />

//             <FormSelect
//               name="roomId"
//               form={form}
//               options={timetableOptions}
//               label="Room ( optional )"
//               placeholder="Choose Room"
//             />

//             <DialogFooter className=" col-span-2">
//               <Button>
//                 <Check />
//                 Save
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </AppDialog>
//     </div>
//   );
// };

// export default AssignDoctor;
