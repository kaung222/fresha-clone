'use client'
import ControllableDropdown from '@/components/common/control-dropdown';
import { Button } from '@/components/ui/button';
import { MemberSchedule } from '@/types/member-schedule';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    schedule: MemberSchedule[];
    setEditDrawer: Dispatch<SetStateAction<MemberSchedule[] | null>>
}

const PencilDropdown = ({ setEditDrawer, schedule }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <ControllableDropdown open={open} setOpen={setOpen} zIndex={10} trigger={(
                <span className=' bg-gray-100 w-7 h-7  rounded-full '>
                    <Pencil className="h-4 w-4" />
                </span>
            )}>
                <div className=" flex flex-col gap-1 ">
                    {/* <Link href={`/team/scheduled-shifts/${member.id}/add`} className=' w-full px-4 py-2 hover:bg-gray-100 ' >Set regular shift</Link> */}

                    <Button onClick={() => {
                        setEditDrawer(schedule);
                        setOpen(false)
                    }} className=' w-full flex justify-start' variant={'ghost'}>Set regular shift</Button>
                    <Button className=' w-full flex justify-start ' variant={'ghost'}>Edit team member</Button>
                </div>
            </ControllableDropdown>
        </>
    )
}

export default PencilDropdown