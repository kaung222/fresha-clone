'use client'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import React, { useEffect, useRef } from 'react'

type Props = {
    currentTime: Date,
    appointmentId: string;
}

const TimeList = ({ currentTime, appointmentId }: Props) => {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const { mutate } = UpdateAppointment(appointmentId);


    const rightTime = new Date(currentTime);
    rightTime.setHours(0, 0, 0, 0);

    const differenceSecond = currentTime.getTime() - rightTime.getTime();
    // console.log(differenceSecond);

    const timeArray = generateTimeArray();

    const changeTime = (time: number) => {
        const newStartTime = rightTime.getTime() + time;
        mutate({ start: newStartTime })
        console.log(time)
    }

    useEffect(() => {
        if (spanRef) {
            spanRef.current?.scrollIntoView()
        }
    }, [spanRef])

    return (
        <>
            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" w-[100px] h-[300px] overflow-auto ">
                {timeArray.map((time, index) => (
                    <Button
                        key={index}
                        variant={'ghost'}
                        onClick={() => {
                            changeTime(time.value)
                        }}
                        className=' w-full flex justify-between '

                    >
                        <span className=' text-sm font-medium '>{time.name}</span>
                        {time.value == differenceSecond && (
                            <span ref={spanRef}>
                                <IconMark className=' size-5 stroke-green-500 ' />
                            </span>
                        )}
                    </Button>
                ))}
            </div>
        </>
    )
}

export default TimeList