"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Loader2, X } from "lucide-react"
import { format } from "date-fns"
import Modal from "@/components/modal/Modal"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { useCreateClosedPeriods } from "@/api/closed-period/create-closed-period"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FormSelect from "@/components/common/FormSelect"
import FormDate from "@/components/common/FormDate"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormTextarea from "@/components/common/FormTextarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClosedPeriodFormSchema } from "@/validation-schema/closed-period.schema"
import { z } from "zod"

const closeDays: { name: string, value: string }[] = [
    { name: "Christmas", value: "christmas" },
    { name: "Vacation", value: "vacation" },
    { name: "Regular", value: "regular" }
]

export default function CreateClosedPeriods() {
    const { deleteQuery } = useSetUrlParams()
    const { mutate, isPending } = useCreateClosedPeriods();
    const form = useForm({
        resolver: zodResolver(ClosedPeriodFormSchema),
        defaultValues: {
            startDate: '',
            endDate: ''
        }
    })


    const closeDrawer = () => {
        deleteQuery({ key: 'drawer' })
    };

    const createClosedDay = (values: any) => {
        console.log(values)
        const payload = {
            startDate: format(values.startDate, "yyyy-MM-dd"),
            endDate: format(values.endDate, "yyyy-MM-dd"),
            type: values.type,
            notes: values.notes
        }
        console.log(payload);
        mutate(payload, {
            onSuccess() {
                closeDrawer()
            }
        })
    }

    return (
        <Modal onClose={() => closeDrawer()}>
            <div className=" flex w-full  flex-col">
                <div className="flex justify-between items-center  sticky z-[60] top-0 w-full h-[80px] border-b bg-white border-gray-200 px-5 lg:px-10 ">
                    <Button onClick={closeDrawer} variant="ghost">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>

                    <Button disabled={isPending} variant={"brandDefault"} form='close-day-form' type='submit' className=" " >
                        {isPending ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                                saving...
                            </>
                        ) : "Saves"}
                    </Button>
                </div>
                <div className="flex justify-between items-start mb-6 px-8 pt-4">
                    <div>
                        <div>
                            <div className="text-2xl font-bold">Add closed period</div>
                            <div className="text-base">
                                Set the duration of your business closure.
                            </div>
                        </div>
                    </div>
                </div>
                <Form {...form}>
                    <form id="close-day-form" onSubmit={form.handleSubmit(createClosedDay)} className="space-y-6 flex-1 px-8 mb-20">
                        <FormDate
                            form={form}
                            label="Start Date"
                            placeholder="pick a date"
                            name="startDate"
                            required
                        />
                        <FormDate
                            form={form}
                            label="End Date"
                            placeholder="pick a date"
                            name="endDate"
                            required
                        />

                        <FormSelect
                            form={form}
                            name="type"
                            label="Types"
                            options={closeDays}
                            placeholder="Choose close day type."
                        />
                        <FormTextarea
                            form={form}
                            name="notes"
                            label="Description"
                            placeholder="More about close day..."
                        />
                    </form>
                </Form>

                <div className="space-y-6 flex-1 px-8 mb-20">
                    {/* <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="start-date"
                                >
                                    {startDate ? (
                                        format(startDate, "PPP")
                                    ) : (
                                        <span className="text-muted-foreground">Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div> */}

                    {/* <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    id="end-date"
                                >
                                    {endDate ? (
                                        format(endDate, "PPP")
                                    ) : (
                                        <span className="text-muted-foreground">Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <Label>Type</Label>
                        <Select value={type} onValueChange={setType} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select closed day type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="holiday">Holiday</SelectItem>
                                <SelectItem value="christmas">Christmas</SelectItem>
                                <SelectItem value="thadingute">Thadinguat</SelectItem>
                                <SelectItem value="vacation">Vacation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="eg. Christmas"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div> */}

                </div>

                {/* <div className="flex flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => closeDrawer()}
                    >
                        Close
                    </Button>
                    <Button disabled={isPending} onClick={() => createClosedDay()} className=" bg-brandColor hover:bg-brandColor/90 ">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div> */}
            </div>
        </Modal>
    )
}