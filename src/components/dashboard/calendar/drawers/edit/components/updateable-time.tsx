'use client'
import AppDropdown from '@/components/common/DropDown'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import TimeList from './time-list'
import { secondToHour } from '@/lib/utils'
import { Edit } from 'lucide-react'

type Props = {
    currentSecond: number;
    setCurrentSecond: React.Dispatch<React.SetStateAction<number>>;
}


const UpdateableTime = ({ currentSecond, setCurrentSecond }: Props) => {


    return (
        <>
            <AppDropdown trigger={(
                <span className=' inline-flex items-center text-white hover:underline px-4 py-2 gap-2 '>
                    {secondToHour(currentSecond)} <Edit className=' w-4 h-4 ' />
                </span>
            )}>
                <TimeList setCurrentSecond={setCurrentSecond} currentSecond={currentSecond} />
            </AppDropdown>

        </>
    )
}

export default UpdateableTime