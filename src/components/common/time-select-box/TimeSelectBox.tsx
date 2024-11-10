'use client'
import AppDropdown from '@/components/common/DropDown'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import { format, intervalToDuration } from 'date-fns'
import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { SetStateAction } from 'react';
import { ChevronDown } from 'lucide-react'
import { secondToHour } from '@/lib/utils'
import TimeRenderLists from './time-list'

type Props = {
    currentTime: number;
    setTime: Dispatch<SetStateAction<number>>;
}


const TimeSelectCommonBox = ({ currentTime, setTime }: Props) => {

    return (
        <>
            {/* <Button variant={'link'} className=' text-white '>{format(currentTime, 'HH:mm')}</Button> */}
            <AppDropdown trigger={(
                <span className=' flex w-[100px] justify-between items-center border border-gray-300  hover:bg-gray-100 px-4 py-2 rounded-lg '>
                    {secondToHour(currentTime)} <ChevronDown className=' size-4 ' />
                </span>
            )} zIndex={100}>
                <TimeRenderLists currentTime={currentTime} setTime={setTime} />
            </AppDropdown>

        </>
    )
}

export default TimeSelectCommonBox