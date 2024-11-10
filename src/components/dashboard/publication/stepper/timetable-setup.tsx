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

interface DayShift {
    enabled: boolean;
    startTime: number;
    endTime: number;
}

export type WeekSchedule = {
    [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DayShift
}

type Props = {}

const TimeTableSetup = (props: Props) => {
    const [schedule, setSchedule] = useState<WeekSchedule>({
        monday: { enabled: true, startTime: 28800, endTime: 64800 },
        tuesday: { enabled: true, startTime: 28800, endTime: 64800 },
        wednesday: { enabled: true, startTime: 28800, endTime: 64800 },
        thursday: { enabled: true, startTime: 28800, endTime: 64800 },
        friday: { enabled: true, startTime: 28800, endTime: 64800 },
        saturday: { enabled: true, startTime: 28800, endTime: 64800 },
        sunday: { enabled: false, startTime: 28800, endTime: 64800 },
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm();
    const { data: orgSchedule } = GetOrgSchedule();

    const saveTimetable = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        if (orgSchedule) {
            Object.entries(orgSchedule).map(([day, times]) => {
                if (day != 'id') {
                    if (times) {
                        setSchedule(prev => ({
                            ...prev,
                            //@ts-ignore
                            [day]: { ...prev[day], enabled: true, startTime: times.startTime, endTime: times.endTime }
                        }))
                    } else {
                        setSchedule(prev => ({
                            ...prev,
                            //@ts-ignore
                            [day]: { ...prev[day], enabled: false }
                        }))
                    }
                }
            })
        }
    }, [orgSchedule]);

    const handleDayToggle = (day: keyof WeekSchedule) => {
        setSchedule(prev => ({
            ...prev,
            [day]: { ...prev[day], enabled: !prev[day].enabled }
        }))
    };
    const saveSchedule = (values: any) => {
        // console.log(Object.entries(schedule))
        const newSchedule = Object.fromEntries(
            Object.entries(schedule).map(([day, { enabled, startTime, endTime }]) => [
                day,
                enabled ? { startTime, endTime } : null
            ])
        );
        //@ts-ignore
        mutate(newSchedule);
    }


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
                                {Object.entries(schedule).map(([day, shift]) => (
                                    <div key={day} className="flex items-center justify-between w-full gap-4 h-[120px] border-b ">
                                        <div className=" flex items-center gap-2">
                                            <Checkbox
                                                checked={shift.enabled}
                                                onCheckedChange={() => handleDayToggle(day as keyof WeekSchedule)}
                                            />
                                            <div className=' text-[15px] font-semibold '>{day}</div>
                                        </div>

                                        {shift.enabled ? (
                                            <>
                                                <div className=' flex items-center justify-between gap-5 '>

                                                    <TimeTableSelectBox part='start' setSchedule={setSchedule} day={day as keyof WeekSchedule} defaultTime={shift.startTime} />

                                                    <span className="text-gray-400">—</span>

                                                    <TimeTableSelectBox part='end' setSchedule={setSchedule} day={day as keyof WeekSchedule} defaultTime={shift.endTime} />
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