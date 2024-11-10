'use client'
import { GetOrgSchedule } from "@/api/org-schedule/get-org-schedule"
import AppDialog from "@/components/common/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from 'lucide-react'
import EditOpeningHour from "./EditOpeningHours"
import ControllableDialog from "@/components/common/control-dialog"
import { useState } from "react"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import PageLoading from "@/components/common/page-loading"
import { OrgSchedule } from "@/types/org-schedule"
import { intervalToDuration } from "date-fns"
import { secondToHour } from "@/lib/utils"

interface OpeningHour {
    day: string
    hours: string
    isOpen: boolean
}

const openingHours: OpeningHour[] = [
    { day: 'Monday', hours: '08:00 - 17:00', isOpen: true },
    { day: 'Tuesday', hours: '08:00 - 17:00', isOpen: true },
    { day: 'Wednesday', hours: '08:00 - 16:00', isOpen: true },
    { day: 'Thursday', hours: '08:00 - 17:00', isOpen: true },
    { day: 'Friday', hours: '08:00 - 17:00', isOpen: true },
    { day: 'Saturday', hours: '08:00 - 17:00', isOpen: true },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
]

type Props = {
    orgSchedule: OrgSchedule;
}

export default function OpeningHours() {
    const { data: orgSchedule, isLoading } = GetOrgSchedule();
    const { setQuery, getQuery } = useSetUrlParams();
    const drawer = getQuery('drawer');


    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : orgSchedule ? (
                <>
                    <main className="flex-1 p-6 h-full overflow-auto pb-20 ">
                        <div className=" flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-nbold">Business Open Hours</h2>
                            <Button onClick={() => setQuery({ key: 'drawer', value: '1' })} variant={'outline'} >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </Button>

                        </div>

                        <Card className=" w-full p-10 ">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Opening times</CardTitle>

                            </CardHeader>
                            <CardContent>
                                {orgSchedule && (
                                    <div className="space-y-5">
                                        {orgSchedule.map((schedule, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${true ? 'bg-green-500' : 'bg-gray-300'
                                                            }`}
                                                    />
                                                    <span className={true ? 'font-medium' : 'text-gray-500'}>
                                                        {schedule.dayOfWeek}
                                                    </span>
                                                </div>
                                                <span className={true ? 'font-medium' : 'text-gray-500'}>
                                                    {true ? (
                                                        <>
                                                            {
                                                                //@ts-ignore
                                                                secondToHour(Number(schedule.startTime))
                                                            } - {
                                                                //@ts-ignore
                                                                secondToHour(Number(schedule.endTime))
                                                            }
                                                        </>
                                                    ) : (
                                                        'closed'
                                                    )}
                                                </span>
                                            </div>

                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>


                    </main>
                    {
                        drawer && (
                            <EditOpeningHour orgSchedule={orgSchedule} />
                        )
                    }
                </>
            ) : (
                <div>
                    no
                </div>
            )}



        </>

    )
}