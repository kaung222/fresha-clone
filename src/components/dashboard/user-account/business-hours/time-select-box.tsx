'use client'
import AppDropdown from '@/components/common/DropDown'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import { format, intervalToDuration } from 'date-fns'
import React, { Dispatch, useEffect, useRef, useState } from 'react'
import TimeIntervalView from './time-intervel-view'
import { SetStateAction } from 'react';
import { ChevronDown } from 'lucide-react'
import { secondToHour } from '@/lib/utils'
import { DayShift } from './EditOpeningHours'

type Props = {
    defaultTime: number;
    setSchedule: Dispatch<SetStateAction<DayShift[]>>
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    part: "start" | "end";
}


const TimeTableSelectBox = ({ defaultTime, setSchedule, day, part }: Props) => {

    return (
        <>
            {/* <Button variant={'link'} className=' text-white '>{format(currentTime, 'HH:mm')}</Button> */}
            <AppDropdown trigger={(
                <span className=' flex w-[100px] justify-between items-center border border-gray-300  hover:bg-gray-100 px-4 py-2 rounded-lg '>
                    {secondToHour(defaultTime)} <ChevronDown className=' size-4 ' />
                </span>
            )}>
                <TimeIntervalView part={part} day={day} setSchedule={setSchedule} currentTime={defaultTime} />
            </AppDropdown>

        </>
    )
}

export default TimeTableSelectBox