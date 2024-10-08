"use client";
import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/common/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/common/FormSelect";
import FormInputFile from "@/components/common/FormInputFile";
import FormRadio from "@/components/common/FormRadio";
import FormTags from "@/components/common/FormTags";
import Image from "next/image";
import { GetAllSpecility } from "@/api/doctor/get-speciality";
import { useAddDoctorByClinic } from "@/api/doctor/create-doctor";
import { useEditDoctorByClinic } from "@/api/doctor/edit-doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Doctor } from "@/types/doctor";
import { CreateDoctorSchema } from "@/validation-schema/create-doctor.schema";

type Props = {
  data: Doctor;
};

const EditDoctor = ({ data }: Props) => {
  console.log(data);
  const { mutate } = useEditDoctorByClinic(data.id);
  const { data: specialities } = GetAllSpecility();
  console.log(data);
  const form = useForm({
    defaultValues: {
      profilePictureUrl: data.profilePictureUrl,
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      experience: data.experience,
      licenseNumber: data.licenseNumber,
      specialityId: data.speciality?.id,
      languageProficiency: data.languageProficiency,
      qualifications: data.qualifications,
    },
  });
  const editDoctor = (values: any) => {
    const payload = {
      ...values,
      specialityId: Number(values.specialityId),
      experience: Number(values.experience),
    };
    console.log(payload);
    mutate(payload);
  };
  const profilePictureUrl = form.watch("profilePictureUrl");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogDescription>
          Enter the details data of doctor to edit. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editDoctor)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex col-span-1 md:col-span-2 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {profilePictureUrl ? (
                      <Image
                        width={300}
                        height={300}
                        src={profilePictureUrl}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">Service Image</h3>
                    <p className="text-sm text-muted-foreground">
                      {profilePictureUrl ? "" : "No file selected"}
                    </p>
                  </div>
                </div>
                <FormInputFile
                  form={form}
                  name="profilePictureUrl"
                  id="thumbnail"
                />
                <Button type="button" variant="outline" size="sm">
                  <Label htmlFor="thumbnail">Choose File</Label>
                </Button>
              </div>

              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="name"
                  label="Name"
                  placeholder="Dr. Mg Mg"
                />
              </div>
              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="doctor@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="phone"
                  label="Phone"
                  placeholder="+959112233221"
                />
              </div>
              <div className="flex flex-col ">
                <FormRadio
                  form={form}
                  name="gender"
                  label="Gender"
                  options={[
                    { label: "Male", value: "male", id: "male" },
                    { label: "Female", value: "female", id: "female" },
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="dob"
                  label="Date of Birth"
                  type="date"
                />
              </div>
              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="experience"
                  label="Experience(years)"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <FormInput
                  form={form}
                  name="licenseNumber"
                  label="License Number"
                  placeholder="LIC-12345"
                />
              </div>
              {specialities && (
                <div className="flex flex-col ">
                  <FormSelect
                    form={form}
                    name="specialityId"
                    label="Speciality"
                    defaultValue={String(data.speciality.id)}
                    placeholder="Select a speciality"
                    options={specialities?.map((speciality: any) => ({
                      name: speciality.engName,
                      value: String(speciality.id),
                    }))}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col ">
              <FormRadio
                form={form}
                name="languageProficiency"
                label="Language Proficiency"
                options={[
                  { label: "English", value: "English", id: "english" },
                  { label: "Burma", value: "Burma", id: "burma" },
                ]}
              />
            </div>
            <div className="flex flex-col ">
              <FormTags
                form={form}
                name="qualifications"
                label="Qualifications"
                defaultValue={Array(String(data.qualifications))}
                placeholder="Add Your Qualifications"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={form.handleSubmit(editDoctor)}>
              Save Doctor
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditDoctor;

// z.infer<typeof CreateDoctorSchema>

// <div>
//   <AppBreadcrumb
//     title="Doctors"
//     data={[
//       {
//         name: "Doctors",
//         link: "/doctors",
//       },
//     ]}
//     page="Add Doctor"
//   />

//   {/* form  */}
//   <div className=" mt-6 ">
//     <div className=" p-6 ">
//       {/* image form  */}
//       <div className=" mx-[-12px] ">
//         <div className=" px-3 flex justify-center ">
//           <Image fill src={profilePictureUrl} alt="doctor image" />
//         </div>
//         <div className=" px-3 text-center">
//           <h5 className=" mb-2 font-[600] text-[18px] leading-[27px] text-textDart ">
//             Upload Doctor Picture
//           </h5>
//           <p className=" text-textLightest ">
//             For best results, use an image at least 600px by 600px in either
//             .jpg or .png format
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* form inputs  */}
//     <div className=" mt-6 ">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(createDoctor)}>
//           <FormInputFile
//             form={form}
//             name="profilePictureUrl"
//             id="profilePicture"
//           />
//           <label
//             htmlFor="profilePicture"
//             className=" p-2 rounded-md bg-blue-600 text-white hover:text-dashboardBlue hover:bg-dashboardBlueShadow "
//           >
//             Add profile image
//           </label>
//           <Button
//             className=" bg-delete hover:bg-deleteBlur hover:text-delete ms-1 "
//             type="button"
//             onClick={() => {
//               form.setValue("profilePictureUrl", "");
//             }}
//           >
//             Remove Image
//           </Button>
//           {/* each  */}
//           <div className=" px-3 mt-6">
//             <div className=" mb-4">
//               <FormInput
//                 form={form}
//                 label="Doctor Name"
//                 name="name"
//                 placeholder="Name :"
//               />
//             </div>
//           </div>
//           {/* each  */}
//           <div className=" px-3">
//             <div className=" mb-4">
//               <FormInput
//                 form={form}
//                 label="Email"
//                 name="email"
//                 placeholder="Email :"
//               />
//             </div>
//           </div>
//           {/* each  */}
//           <div className=" px-3">
//             <div className=" mb-4">
//               <FormInput
//                 form={form}
//                 label="Phone Number"
//                 name="phone"
//                 placeholder="phone :"
//               />
//             </div>
//           </div>
//           {/* each  */}
//           <div className=" px-3">
//             <div className=" mb-4">
//               <FormInput
//                 form={form}
//                 label="Professional"
//                 name="professional"
//                 placeholder="eg. Dentist"
//               />
//             </div>
//           </div>
//           {/* each  */}
//           <div className=" px-3">
//             <div className=" mb-4">
//               <FormInput
//                 form={form}
//                 label="Description"
//                 name="description"
//                 placeholder="Say something :"
//               />
//             </div>
//           </div>
//           <input
//             id="male"
//             type="radio"
//             className=" ms-4 "
//             {...form.register("gender")}
//             value="MALE"
//           />{" "}
//           <label htmlFor="male" className="me-2">
//             male
//           </label>
//           <input
//             id="female"
//             type="radio"
//             {...form.register("gender")}
//             value="FEMALE"
//           />
//           <label htmlFor="female">female</label>
//           <Button className=" mt-4 block bg-dashboardBlue hover:bg-dashboardBlueShadow hover:text-dashboardBlue px-20 ">
//             Edit
//           </Button>
//         </form>
//       </Form>
//     </div>
//   </div>
// </div>
