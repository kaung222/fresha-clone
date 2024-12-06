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



const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function OpeningHours() {
    const { data: orgSchedule, isLoading } = GetOrgSchedule();
    const { setQuery, getQuery } = useSetUrlParams();
    const drawer = getQuery('drawer');

    const hasSchedule = (schedules: OrgSchedule[], day: string) => {
        return schedules.find(sc => sc.dayOfWeek == day)
    }

    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : orgSchedule ? (
                <>
                    <main className="flex-1 p-6 h-full overflow-auto pb-20 ">
                        <div className=" flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Business Opening Hours</h2>
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
                                        {dayArray.map((day, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${hasSchedule(orgSchedule, day) ? 'bg-green-500' : 'bg-gray-300'
                                                            }`}
                                                    />
                                                    <span className={true ? 'font-medium' : 'text-gray-500'}>
                                                        {day}
                                                    </span>
                                                </div>
                                                <span className={true ? 'font-medium' : 'text-gray-500'}>
                                                    {hasSchedule(orgSchedule, day) ? (
                                                        <>
                                                            {
                                                                secondToHour(Number(hasSchedule(orgSchedule, day)?.startTime))
                                                            } - {
                                                                secondToHour(Number(hasSchedule(orgSchedule, day)?.endTime))
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