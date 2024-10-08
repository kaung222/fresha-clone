'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormSelect from '@/components/common/FormSelect'
import FormInput from '@/components/common/FormInput'
import { Edit } from 'lucide-react'
import { useCreateDoctorTimeTable } from '@/api/timetable/create-doctor-timetable'
import { useLocalstorage } from '@/lib/helpers'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useParams } from 'next/navigation'

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

type Props = {

}

const CreateTimetableDialog = ({ }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { getData } = useLocalstorage();
    const { doctorId } = useParams();
    const form = useForm();
    const { mutate } = useCreateDoctorTimeTable();
    const clinic = getData('clinic');

    const handleSubmitCreateTimetable = (values: any) => {
        const payload = { ...values, day: Number(values.day), maxBookings: Number(values.maxBookings), requesterId: clinic.id, doctorId }
        console.log(payload);
        mutate(payload, {
            onSuccess: () => {
                setIsDialogOpen(false)
                form.reset({
                    day: undefined,
                    status: undefined,
                    startTime: '',
                    endTime: '',
                    maxBookings: undefined,
                    notes: '',
                });
            }
        })
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Create Timetable
                    </Button>
                </DialogTrigger>
                <DialogContent className=' h-screen overflow-auto '>
                    <DialogHeader>
                        <DialogTitle>Create New Timetable Entry</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitCreateTimetable)} className="space-y-4">
                            <div>
                                <FormSelect
                                    form={form}
                                    name="day"
                                    label="Day"
                                    placeholder="Choose Day"
                                    options={dayOptions}
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="startTime"
                                    placeholder="Start Time"
                                    form={form}
                                    label="Start Time"
                                    type="time"
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="endTime"
                                    placeholder="End Time"
                                    form={form}
                                    label="End Time"
                                    type="time"
                                />
                            </div>
                            <div>
                                <FormInput
                                    name="maxBookings"
                                    placeholder="Max booking"
                                    type="number"
                                    form={form}
                                    label="Max Bookings ( optional )"
                                />
                            </div>
                            <div>
                                <FormSelect
                                    name="status"
                                    form={form}
                                    options={statusOptions}
                                    placeholder="Choose Status"
                                    label="Status"
                                />
                            </div>
                            <div>
                                <FormInput
                                    form={form}
                                    name='notes'
                                    label='Notes'
                                    placeholder='Give some note...'
                                />
                            </div>
                            <Button type="submit">Add Timetable</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateTimetableDialog