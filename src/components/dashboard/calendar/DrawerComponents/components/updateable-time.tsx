'use client'
import AppDropdown from '@/components/common/DropDown'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import TimeList from './time-list'

type Props = {
    currentTime: Date;
    appointmentId: string;
}


const UpdateableTime = ({ currentTime, appointmentId }: Props) => {

    // const rightTime = new Date(currentTime);
    // rightTime.setHours(0, 0, 0, 0);

    // const differenceSecond = currentTime.getTime() - rightTime.getTime();
    // // console.log(differenceSecond);

    // const timeArray = generateTimeArray();

    // const changeTime = (time: number) => {
    //     console.log(time)
    // }


    return (
        <>
            {/* <Button variant={'link'} className=' text-white '>{format(currentTime, 'HH:mm')}</Button> */}
            <AppDropdown trigger={(
                <span className=' inline-block text-white hover:underline px-4 py-2 '>
                    {format(currentTime, 'HH:mm')}
                </span>
            )}>
                <TimeList appointmentId={appointmentId} currentTime={currentTime} />
            </AppDropdown>

        </>
    )
}

export default UpdateableTime