'use client'
import { UpdateMemberSingleSchedule } from '@/api/member-schedule/update-single-schedule'
import ControllableDialog from '@/components/common/control-dialog'
import FormSelect from '@/components/common/FormSelect'
import TimeSelectCommonBox from '@/components/common/time-select-box/TimeSelectBox'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { generateTimeArray } from '@/lib/data'
import { secondToHour } from '@/lib/utils'
import { MemberSchedule } from '@/types/member-schedule'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode;
    shift: MemberSchedule;
    startTime: number;
    endTime: number;
}

const EditSingleSchedule = ({ children, startTime, endTime, shift }: Props) => {
    const { mutate, isPending } = UpdateMemberSingleSchedule();
    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(startTime);
    const [end, setEnd] = useState(endTime);

    const updateSchedule = () => {
        mutate({
            id: shift.id,
            memberId: shift.memberId,
            startTime: start,
            endTime: end,
            //@ts-ignore
            dayOfWeek: shift.dayOfWeek,
        }, {
            onSuccess() {
                setOpen(false);
            }
        })
    }

    const timeArray = generateTimeArray().map((item) => ({ name: item.name, value: item.value.toString() }))
    return (
        <>
            <ControllableDialog title='date' open={open} setOpen={setOpen} trigger={children}>
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
                            <Button variant="ghost" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                                Delete
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button type="button" disabled={isPending} onClick={() => updateSchedule()} >
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

export default EditSingleSchedule