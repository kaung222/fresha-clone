'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { addDays, addMonths, addWeeks, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subDays, subWeeks } from 'date-fns'

type valueType = "custom" | "today" | "yesterday" | "tomorrow" | "thisMonth" | "lastMonth" | "nextMonth" | "thisWeek" | "lastWeek" | "nextWeek"

type Props = {
    dateRangePresets: { label: string, value: valueType }[];
    defaultValue: valueType;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;
    initialStartDateString: string;
    initialEndDateString: string;
}


const DateRangeSelect = ({ dateRangePresets, defaultValue = 'today', setStartDate, setEndDate, initialEndDateString, initialStartDateString }: Props) => {
    const [quickSelect, setQuickSelect] = useState<valueType>(defaultValue);


    const handleQuickSelect = (value: valueType) => {
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
            case "thisWeek":
                setStartDate(startOfWeek(now));
                setEndDate(endOfWeek(now));
                break;
            case "lastWeek":
                setStartDate(startOfWeek(subWeeks(now, 1)));
                setEndDate(endOfWeek(subWeeks(now, 1)));
                break;
            case "nextWeek":
                setStartDate(startOfWeek(addWeeks(now, 1)));
                setEndDate(endOfWeek(addWeeks(now, 1)));
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


    return (
        <>
            <Select value={quickSelect} onValueChange={(e: valueType) => handleQuickSelect(e)}>
                <SelectTrigger className="w-[180px]">
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
        </>
    )
}

export default DateRangeSelect