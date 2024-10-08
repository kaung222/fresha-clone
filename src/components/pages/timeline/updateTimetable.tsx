import { useCreateClinicTimetable } from "@/api/timetable/create-clinic-timetable";
import AppDialog from "@/components/common/dialog";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Timetable } from "@/types/timetable";
import { Check, Pencil } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { dayOptions, statusOptions } from "./CreateTimetable";

const UpdateTimetable = ({ timetable }: { timetable: Timetable }) => {
  const form = useForm({ defaultValues: timetable });
  const { mutate } = useCreateClinicTimetable();
  const createTimetable = (data: any) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div>
      <AppDialog
        trigger={
          <Button variant="outline" size="sm">
            <Pencil className=" size-4 stroke-button" />
          </Button>
        }
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
              defaultValue="1"
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
              defaultValue={form.watch("status")}
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

export default UpdateTimetable;
