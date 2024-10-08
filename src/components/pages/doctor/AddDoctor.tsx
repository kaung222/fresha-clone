"use client";
import { useGetSpeciality } from "@/api/default/specialities";
import { useAddDoctorByClinic } from "@/api/doctor/create-doctor";
import { useGetSpecialities } from "@/api/invoice/get-specialities";
import { useGetServices } from "@/api/service/get-service";
import FormInput from "@/components/common/FormInput";
import FormInputFile from "@/components/common/FormInputFile";
import FormSelect from "@/components/common/FormSelect";
import { AppBreadcrumb } from "@/components/common/breadcrumb";
import AppDialog from "@/components/common/dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { getImageIdFromImageUrl } from "@/lib/helpers/getImageId";
import { CreateDoctorSchema } from "@/validation-schema/create-doctor.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const genderOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];

const AddDoctor = (props: Props) => {
  const { mutate } = useAddDoctorByClinic();
  const form = useForm({
    resolver: zodResolver(CreateDoctorSchema),
    defaultValues: {
      serviceIds: [""],
      name: "James",
      email: "",
      phone: "",
      specialityId: "",
      description: "",
      gender: null,
      profilePictureUrl: "",
    },
  });
  const [assignService, setAssignService] = useState<string[]>([]);
  const profilePictureUrl = form.watch("profilePictureUrl");
  const createDoctor = (values: z.infer<typeof CreateDoctorSchema>) => {
    // values.serviceIds = assignService;
    // values.specialityId = Number(values.specialityId);
    // console.log(values);
    mutate(values);
  };
  const { data } = useGetSpeciality();
  const specialityOptions =
    data?.map((item) => ({
      name: item.burmaName,
      value: item.id.toString(),
    })) || [];
  const { data: serviceData } = useGetServices();

  const addService = (id: string) => {
    setAssignService([...assignService, id]);
  };

  const removeService = (id: string) => {
    setAssignService(assignService.filter((service) => service != id));
  };

  return (
    <>
      <AppDialog
        trigger={
          <span className=" bg-blue-700 p-3 rounded-md flex gap-2 text-white">
            <Plus /> Create Doctor
          </span>
        }
        title="Add New Doctor"
      >
        <Form {...form}>
          <form action="" className=" grid grid-cols-2 gap-x-3">
            <FormInput
              name="name"
              label="Doctor Name"
              placeholder="eg. Mg Mg"
              form={form}
              description="Do not need to use Dr."
            />

            <FormInput
              name="age"
              label="Age"
              placeholder="eg. 30"
              form={form}
              type="number"
            />

            <FormInput
              name="experience"
              label="Experience in year"
              placeholder="eg. 10"
              type="number"
              form={form}
            />

            <FormInput
              name="education"
              label="Education"
              placeholder="eg:Greenwish University"
              description="More values are used to sperate by comma."
              form={form}
            />

            <FormInput
              name="email"
              label="Email"
              placeholder="eg:example@domain.com"
              form={form}
            />

            <FormInput
              name="dob"
              label="Date of Birth"
              type="date"
              form={form}
            />
            <FormSelect
              options={specialityOptions}
              label="Specialization"
              form={form}
              name="speciality"
              placeholder="Select Speciality"
            />
            <FormSelect
              options={genderOptions}
              label="Gender"
              form={form}
              placeholder="Select Gender"
              name="gender"
            />
            <label htmlFor="">
              This form is used to add doctor by clinic and data will be shown
              in users.
            </label>

            <DialogFooter className=" col-span-2">
              <Button>
                <Check /> Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </AppDialog>
    </>
  );
};

export default AddDoctor;
