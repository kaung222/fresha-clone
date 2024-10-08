import { useUpdateClinic } from "@/api/clinic/update-clinic";
import AppDialog from "@/components/common/dialog";
import FormInput from "@/components/common/FormInput";
import FormInputFile from "@/components/common/FormInputFile";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Clinic } from "@/types/clinic";
import Image from "next/image";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface UpdateClinicProps {
  clinic: Clinic;
}

const DEFAULT_PROFILE_IMAGE =
  "https://d276q1ykaqtzjd.cloudfront.net/2191892e-c083-4e8f-bb4d-91d085bb71ccINBX_IMGdoctor1.jfif";

const UpdateClinic = ({ clinic }: UpdateClinicProps) => {
  const { id, name, address, description, profilePictureUrl } = clinic;
  const { mutate } = useUpdateClinic();

  const form = useForm({
    defaultValues: {
      name,
      address,
      description,
      profilePictureUrl,
    },
  });

  const watchedValues = form.watch();
  const profileImage = watchedValues.profilePictureUrl || DEFAULT_PROFILE_IMAGE;
  const hasChanged = useMemo(
    () => JSON.stringify(watchedValues) === JSON.stringify(form.getValues()),
    [watchedValues, form]
  );

  const handleUpdate = (values: any) => {
    console.log(values);
    mutate({ id, UpdateClinic: values });
  };

  return (
    <AppDialog trigger="Update clinic" title="Update clinic">
      <Image
        src={profileImage}
        alt="profile image"
        width={0}
        height={0}
        className="rounded-full w-full h-auto"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <FormInputFile
            id="profileImageurl"
            name="profilePictureUrl"
            form={form}
            label="Add Image"
          />
          <FormInput name="nae" form={form} label="Clinic Name" />
          <FormInput name="address" form={form} label="Clinic Address" />
          <FormInput
            name="description"
            form={form}
            label="Clinic Description"
          />
          <DialogFooter>
            <Button disabled={hasChanged}>Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </AppDialog>
  );
};

export default UpdateClinic;
