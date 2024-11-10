'use client'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import IconMark from '@/components/icons/IconMark'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { WeekSchedule } from '../timetable-setup'

type Props = {
    currentTime: number,
    setSchedule: Dispatch<SetStateAction<WeekSchedule>>;
    day: keyof WeekSchedule;
    part: "start" | "end";

}

const TimeTableList = ({ currentTime, day, setSchedule, part }: Props) => {
    const spanRef = useRef<HTMLSpanElement | null>(null);


    const rightTime = new Date(currentTime);
    rightTime.setHours(0, 0, 0, 0);


    const timeArray = generateTimeArray();

    const changeTime = (time: number) => {
        if (part == "start") {

            setSchedule((pre) => ({
                ...pre,
                [day]: { ...pre[day], startTime: time }
            }))
        } else {
            setSchedule((pre) => ({
                ...pre,
                [day]: { ...pre[day], endTime: time }
            }))

        }

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

export default TimeTableList