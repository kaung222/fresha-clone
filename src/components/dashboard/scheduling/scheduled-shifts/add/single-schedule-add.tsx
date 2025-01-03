'use client'
import { CreateSingleMemberSchedule } from '@/api/member-schedule/create-single-schedule'
import ControllableDialog from '@/components/common/control-dialog'
import { Button } from '@/components/ui/button'
import { generateTimeArray } from '@/lib/data'
import { secondToHour } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode;
    dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    memberId: number
}

const SingleScheduleCreate = ({ children, memberId, dayOfWeek }: Props) => {
    const { mutate, isPending } = CreateSingleMemberSchedule();
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(28800);
    const [end, setEnd] = useState(64800);

    const addSchedule = () => {
        mutate({
            memberId: memberId,
            startTime: start,
            endTime: end,
            dayOfWeek: dayOfWeek,
        }, {
            onSuccess() {
                setOpen(false)
            }
        })
    }

    return (
        <>
            <ControllableDialog title='Date' open={open} setOpen={setOpen} trigger={children}>
                <div className="max-w-2xl mx-auto p-6">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="space-y-1.5 flex-1">
                                <label htmlFor="start-time" className="font-medium">
                                    Start time
                                </label>
                                <select value={start} onChange={(e) => setStart(Number(e.target.value))} className=" flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 " name="" id="">
                                    {generateTimeArray().map((item, index) => (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="flex items-end pb-2.5">
                                <span className="text-gray-500">-</span>
                            </div>

                            <div className="space-y-1.5 flex-1">
                                <label htmlFor="end-time" className="font-medium">
                                    End time
                                </label>
                                <select value={end} onChange={(e) => setEnd(Number(e.target.value))} className=" flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 " name="" id="">
                                    {generateTimeArray().map((item, index) => (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="flex items-end pb-2">
                                <span className="text-sm font-medium">{secondToHour((end - start))}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm">
                            You are editing this day&apos;s shifts only. To set regular shifts, go to{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                scheduled shifts
                            </a>
                            .
                        </p>

                        <div className="flex justify-between pt-4">
                            <div></div>
                            <div className="flex gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button type="button" disabled={isPending} onClick={() => addSchedule()} >
                                    {isPending ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                                            saving...
                                        </>
                                    ) : "Save"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </ControllableDialog>
        </>
    )
}

export default SingleScheduleCreate