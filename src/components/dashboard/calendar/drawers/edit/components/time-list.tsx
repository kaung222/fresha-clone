'use client'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generateTimeArray } from '@/lib/data'
import React, { useEffect, useRef } from 'react'

type Props = {
    currentSecond: number,
    setCurrentSecond: React.Dispatch<React.SetStateAction<number>>;
}

const TimeList = ({ currentSecond, setCurrentSecond }: Props) => {
    const spanRef = useRef<HTMLSpanElement | null>(null);


    const timeArray = generateTimeArray();

    const changeTime = (time: number) => {
        setCurrentSecond(time)
    }

    useEffect(() => {
        if (spanRef) {
            spanRef.current?.scrollIntoView()
        }
    }, [spanRef])

    return (
        <>
            <ScrollArea className=" w-[100px] h-[300px] ">
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
                        {time.value == currentSecond && (
                            <span ref={spanRef}>
                                <IconMark className=' size-5 stroke-green-500 ' />
                            </span>
                        )}
                    </Button>
                ))}
            </ScrollArea>
        </>
    )
}

export default TimeList