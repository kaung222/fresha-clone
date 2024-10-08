import { useCreateClinicTimetable } from "@/api/timetable/create-clinic-timetable";
import AppDialog from "@/components/common/dialog";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export const dayOptions = [
  { name: "Sunday", value: "0" },
  { name: "Monday", value: "1" },
  { name: "Tuesday", value: "2" },
  { name: "Wednesday", value: "3" },
  { name: "Thursday", value: "4" },
  { name: "Friday", value: "5" },
  { name: "Saturday", value: "6" },
];
export const statusOptions = [
  {
    name: "Available",
    value: "available",
  },
  {
    name: "Holiday",
    value: "holiday",
  },
];
const CreateTimetable = () => {
  const form = useForm();
  const { mutate } = useCreateClinicTimetable();
  const createTimetable = (data: any) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className=" my-5">
      <AppDialog
        trigger={<Button>Create Timetable</Button>}
        title="Create Timetable"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createTimetable)}
            className="grid grid-cols-2 gap-5 "
          >
            <FormSelect
              form={form}
              name="day"
              label="Day"
              placeholder="Choose Day"
              options={dayOptions}
            />

            <FormInput
              name="notes"
              placeholder="notes.."
              form={form}
              label="Note ( optional )"
            />
            <FormInput
              name="startTime"
              placeholder="Start Time"
              form={form}
              label="Start Time"
              type="time"
            />
            <FormInput
              name="endTime"
              placeholder="End Time"
              form={form}
              label="End Time"
              type="time"
            />
            <FormInput
              name="maxBookings"
              placeholder="Max booking"
              type="number"
              form={form}
              label="Max Bookings ( optional )"
            />
            <FormSelect
              name="status"
              form={form}
              options={statusOptions}
              placeholder="Choose Status"
              label="Status"
            />

            <DialogFooter className=" col-span-2">
              <Button>
                <Check />
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </AppDialog>
    </div>
  );
};

export default CreateTimetable;
