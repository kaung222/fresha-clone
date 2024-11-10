'use client'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import React, { useEffect, useRef } from 'react'

type Props = {
    currentTime: number,
    appointmentId: string;
}

const TimeList = ({ currentTime, appointmentId }: Props) => {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const { mutate } = UpdateAppointment(appointmentId);


    const timeArray = generateTimeArray();

    const changeTime = (time: number) => {
        mutate({ start: time })
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
                        {time.value == currentTime && (
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