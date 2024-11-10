'use client'
import { GetOrgSchedule } from '@/api/org-schedule/get-org-schedule'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TimeTableSelectBox from '../../user-account/business-hours/time-select-box'

export interface DayShift {
    id: number;
    enabled: boolean;
    startTime: number;
    endTime: number;
    dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
}

const defaultSchedule: DayShift[] = [
    { id: 1, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Monday" },
    { id: 2, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Tuesday" },
    { id: 3, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Wednesday" },
    { id: 4, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Thursday" },
    { id: 5, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Friday" },
    { id: 6, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Saturday" },
    { id: 7, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Sunday" },
]

type Props = {}

const TimeTableSetup = (props: Props) => {
    const [schedule, setSchedule] = useState<DayShift[]>(defaultSchedule);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm();
    const { data: orgSchedule } = GetOrgSchedule();

    const saveTimetable = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        if (orgSchedule) {
            // orgSchedule.map((item) => {
            //     setSchedule(prev => prev.map((item) => item.dayOfWeek.toLowerCase() == item.dayOfWeek.toLowerCase() ? ({ ...item, id: item.id, enabled: true, startTime: item.startTime, endTime: item.endTime }) : item))
            // })
            setSchedule(prev => prev.map((item) => {
                const scheduleInOrg = orgSchedule.find((sche) => sche.dayOfWeek.toLowerCase() == item.dayOfWeek.toLowerCase())
                return scheduleInOrg ? ({ ...item, id: scheduleInOrg.id, enabled: true, startTime: scheduleInOrg.startTime, endTime: scheduleInOrg.endTime }) : item;
            }))
        }
    }, [orgSchedule]);

    const handleDayToggle = (day: string) => {
        setSchedule(prev => prev.map((item) => item.dayOfWeek == day ? ({ ...item, enabled: !item.enabled }) : item))
    };

    // const saveSchedule = (values: any) => {
    //     // console.log(Object.entries(schedule))
    //     const newSchedule = Object.fromEntries(
    //         Object.entries(schedule).map(([day, { enabled, startTime, endTime }]) => [
    //             day,
    //             enabled ? { startTime, endTime } : null
    //         ])
    //     );
    //     //@ts-ignore
    //     mutate(newSchedule);
    // }


    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button disabled={isLoading} type='submit' form="timetable-form">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </div>

            <Form {...form}>
                <form id='timetable-form' onSubmit={form.handleSubmit(saveTimetable)} className=' max-w-[796px] w-full mx-auto ' >
                    <div className=' space-y-6 py-6 px-5 lg:px-10 '>

                        <div className="text-center px-5 flex flex-col items-center ">
                            <h1 className="text-2xl font-bold">Set Business Open Hours</h1>
                            <p className="text-gray-500">Set weekly, biweekly, or custom shifts. Changes apply to all future shifts.</p>
                        </div>
                        <div className="flex gap-6">

                            <Card className="space-y-2 p-5 w-full overflow-auto ">
                                {schedule.map((shift) => (
                                    <div key={shift.id} className="flex items-center justify-between w-full gap-4 h-[120px] border-b ">
                                        <div className=" flex items-center gap-2">
                                            <Checkbox
                                                checked={shift.enabled}
                                                onCheckedChange={() => handleDayToggle(shift.dayOfWeek)}
                                            />
                                            <div className=' text-[15px] font-semibold '>{shift.dayOfWeek}</div>
                                        </div>

                                        {shift.enabled ? (
                                            <>
                                                <div className=' flex items-center justify-between gap-5 '>

                                                    <TimeTableSelectBox part='start' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.startTime} />

                                                    <span className="text-gray-400">—</span>

                                                    <TimeTableSelectBox part='end' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.endTime} />
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-gray-500">No shifts</span>
                                        )}
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default TimeTableSetup