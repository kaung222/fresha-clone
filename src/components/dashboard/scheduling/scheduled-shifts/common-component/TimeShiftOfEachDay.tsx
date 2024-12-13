'use client'
import AppDropdown from '@/components/common/DropDown'
import { secondToHour } from '@/lib/utils';
import React, { useState } from 'react'
import EditSingleSchedule from '../edit-single/EditSingleSchedule';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { MemberSchedule } from '@/types/member-schedule';
import SingleScheduleCreate from '../add/single-schedule-add';
import { DeleteMemberSchedule } from '@/api/member-schedule/delete-single-schedule';
import ConfirmDialog from '@/components/common/confirm-dialog';
import ControllableDropdown from '@/components/common/control-dropdown';

type Props = {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    shift: MemberSchedule | null;
    memberId: string;
}

const TimeShiftOfEachDay = ({ day, shift, memberId }: Props) => {
    const { mutate } = DeleteMemberSchedule();

    const deleteSchedule = (id: number) => {
        mutate({ id: String(id) })
    }
    return (
        <>
            {shift?.dayOfWeek ? (
                <span className="bg-blue-100 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                    {secondToHour(shift.startTime)} - {secondToHour(shift.endTime)}
                </span>
            ) : (
                <div className=" h-10 flex justify-center items-center " >
                    <div className="text-gray-400  ">-</div>
                </div>
            )}
            {/* <AppDropdown trigger={(
                <>
                    {shift?.dayOfWeek ? (
                        <span className="bg-blue-100 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                            {secondToHour(shift.startTime)} - {secondToHour(shift.endTime)}
                        </span>
                    ) : (
                        <div className=" h-10 flex justify-center items-center " >
                            <div className="text-gray-400 group-hover:hidden ">-</div>
                            <span className=' hidden group-hover:block cursor-pointer '>
                                <PlusCircle className='  w-5 h-5' />
                            </span>
                        </div>
                    )}
                </>
            )}>
                {shift?.dayOfWeek ? (
                    <div className=" flex flex-col gap-1 ">
                        <EditSingleSchedule shift={shift} startTime={shift.startTime} endTime={shift.endTime}>
                            <span className=' w-full px-4 py-2 flex justify-start rounded-lg text-sm font-medium hover:bg-gray-100 '>Edit this day</span>
                        </EditSingleSchedule>

                        <Button className=' w-full flex justify-start ' variant={'ghost'}>Add time off</Button>
                        <ConfirmDialog title='Are you sure to delete this shift' description='After delete you can create new one here!' onConfirm={() => deleteSchedule(shift.id)}>
                            <span className=' w-full px-4 py-2 text-start rounded-lg text-sm font-medium hover:bg-gray-100 text-delete '>Delete this shift</span>
                        </ConfirmDialog>
                    </div>
                ) : (
                    <div className=" flex flex-col gap-1 ">
                        <SingleScheduleCreate dayOfWeek={day} memberId={memberId} >
                            <span className=' w-full px-4 py-2 text-start rounded-lg hover:bg-gray-100 '>Add shift</span>
                        </SingleScheduleCreate>
                        <Button variant={'ghost'} className=' w-full '>Add time off</Button>
                    </div>
                )}
            </AppDropdown> */}
        </>
    )
}

export default TimeShiftOfEachDay