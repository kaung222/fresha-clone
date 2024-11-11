import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import React from 'react'
import DatePicker from 'react-datepicker'

type Props = {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const UpdateableDate = ({ currentDate, setCurrentDate }: Props) => {
    return (
        <>
            <DatePicker
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
            />
        </>
    )
}

export default UpdateableDate