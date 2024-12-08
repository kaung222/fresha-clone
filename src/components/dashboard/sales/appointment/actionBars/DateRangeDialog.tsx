"use client"

import * as React from "react"
import { addDays, addMonths, endOfDay, endOfMonth, format, startOfDay, startOfMonth, subDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ControllableDialog from "@/components/common/control-dialog"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { getStartAndEndOfMonth } from "@/lib/utils"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"


const dateRangePresets = [
    { label: "Custom", value: "custom" },
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Next Month", value: "nextMonth" },
]

type Props = {
    children: React.ReactNode
}

export default function DateRangePicker({ children }: Props) {
    const [open, setOpen] = React.useState(false);
    const { setQuery, getQuery } = useSetUrlParams();
    const initialStartDateString = getQuery('startDate') || format(new Date(), 'yyyy-MM-dd')
    const initialEndDateString = getQuery('endDate') || format(new Date(), "yyyy-MM-dd")
    const [startDate, setStartDate] = React.useState<Date>(new Date(initialStartDateString))
    const [endDate, setEndDate] = React.useState<Date>(new Date(initialEndDateString))
    const [quickSelect, setQuickSelect] = React.useState<string>("custom");
    const [monthsToShow, setMonthsToShow] = React.useState([new Date("2024-01-01"), addMonths(new Date("2024-01-01"), 1)])

    const handleApply = () => {
        setQuery({ key: 'startDate', value: format(startDate, 'yyyy-MM-dd') });
        setQuery({ key: 'endDate', value: format(endDate, 'yyyy-MM-dd') });
        setOpen(false)
    }

    const handleQuickSelect = (value: string) => {
        setQuickSelect(value);
        const now = new Date();

        switch (value) {
            case "today":
                setStartDate(startOfDay(now));
                setEndDate(endOfDay(now));
                break;
            case "yesterday":
                setStartDate(startOfDay(subDays(now, 1)));
                setEndDate(endOfDay(subDays(now, 1)));
                break;
            case "tomorrow":
                setStartDate(startOfDay(addDays(now, 1)));
                setEndDate(endOfDay(addDays(now, 1)));
                break;
            case "thisMonth":
                setStartDate(startOfMonth(now));
                setEndDate(endOfMonth(now));
                break;
            case "lastMonth":
                const lastMonth = subDays(startOfMonth(now), 1);
                setStartDate(startOfMonth(lastMonth));
                setEndDate(endOfMonth(lastMonth));
                break;
            case "nextMonth":
                const nextMonth = addMonths(now, 1);
                setStartDate(startOfMonth(nextMonth));
                setEndDate(endOfMonth(nextMonth));
                break;
            default:
                setStartDate(new Date(initialStartDateString));
                setEndDate(new Date(initialEndDateString));
                break;
        }
    };

    // Handle manual date selection
    const handleCustomDateChange = (field: "start" | "end", date: Date) => {
        if (field === "start") {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
        setQuickSelect("custom");
    };


    return (
        <ControllableDialog zIndex={50} title="Date Range" open={open} setOpen={setOpen} trigger={children}>
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg space-y-6">
                <div className="space-y-4">
                    <Label>Date range</Label>
                    <Select value={quickSelect} onValueChange={(e) => handleQuickSelect(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                            {dateRangePresets.map((preset) => (
                                <SelectItem key={preset.value} value={preset.value}>
                                    {preset.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Starting</Label>
                        <div>
                            <DatePicker className=" z-[30] "
                                selected={startDate}
                                onChange={(date) => date && handleCustomDateChange('start', date)}
                                dateFormat={"MMMM d, yyyy"}
                                customInput={
                                    <button>

                                        {format(startDate, "MMMM d, yyyy")}

                                    </button>
                                }
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Ending</Label>
                        <div>
                            <DatePicker className=" z-[30] "
                                selected={endDate}
                                onChange={(date) => date && handleCustomDateChange("end", date)}
                                dateFormat={"MMMM d, yyyy"}
                                customInput={
                                    <button>

                                        {format(endDate, "MMMM d, yyyy")}

                                    </button>
                                }
                            />
                        </div>
                    </div>
                </div>


                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="button" onClick={handleApply} className=" bg-brandColor hover:bg-brandColor/90 ">Apply</Button>
                </div>
            </div>
        </ControllableDialog>
    )
}