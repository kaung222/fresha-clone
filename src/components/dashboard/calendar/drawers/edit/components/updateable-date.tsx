import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import React from 'react'
import DatePicker from 'react-datepicker'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const UpdateableDate = ({ currentDate, setCurrentDate }: Props) => {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>

                    <h1 className=" font-semibold hover:underline flex items-center gap-2 cursor-pointer ">{format(currentDate, 'EEE dd LLL')} <Edit className=' w-4 h-4 ' /> </h1>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={currentDate}
                        onSelect={(e) => {
                            if (e) {
                                setCurrentDate(e)
                            }
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {/* <DatePicker
                selected={currentDate}
                onChange={(e) => {
                    if (e) {
                        setCurrentDate(e)
                    }
                }}
                dateFormat={'EEE dd LLL'}
                showWeekPicker={false}
                customInput={

                    <h1 className=" font-semibold hover:underline flex items-center gap-2 ">{format(currentDate, 'EEE dd LLL')} <Edit className=' w-4 h-4 ' /> </h1>
                }
                className=''
                popperClassName=' '
                calendarClassName=' '
            /> */}
        </>
    )
}

export default UpdateableDate