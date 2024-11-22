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
import { CalendarIcon, Loader2, X } from "lucide-react"
import { format } from "date-fns"
import Modal from "@/components/modal/Modal"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { useCreateClosedPeriods } from "@/api/closed-period/create-closed-period"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FormSelect from "@/components/common/FormSelect"

export default function CreateClosedPeriods() {
    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('')
    const { deleteQuery } = useSetUrlParams()
    const { mutate, isPending } = useCreateClosedPeriods()


    const closeDrawer = () => {
        deleteQuery({ key: 'drawer' })
    };

    const createClosedDay = () => {
        if (startDate && endDate) {
            const payload = {
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(endDate, "yyyy-MM-dd"),
                type,
                notes: description
            }
            console.log(payload);
            mutate(payload, {
                onSuccess() {
                    closeDrawer()
                }
            })
        }
    }

    return (
        <Modal onClose={() => closeDrawer()}>
            <div className=" flex w-full  flex-col p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div>
                            <div className="text-2xl font-bold">Add closed period</div>
                            <div className="text-base">
                                Set the duration of your business closure.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="space-y-2">
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
                    </div>

                    <div className="space-y-2">
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
                    </div>

                </div>

                <div className="flex flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => closeDrawer()}
                    >
                        Close
                    </Button>
                    <Button disabled={isPending} onClick={() => createClosedDay()}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                saving...
                            </>
                        ) : (
                            'Save'
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}