'use client'
import ControllableDropdown from '@/components/common/control-dropdown';
import { Button } from '@/components/ui/button';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { MemberSchedule } from '@/types/member-schedule';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    memberId: number;
    // schedule: MemberSchedule[];
    // setEditDrawer: Dispatch<SetStateAction<MemberSchedule[] | null>>
}

const PencilDropdown = ({ memberId }: Props) => {
    const { setQuery } = useSetUrlParams();
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div>
                <Button onClick={() => {
                    setQuery({ key: "member", value: String(memberId) })
                    setOpen(false)
                }} className=' w-full flex justify-start text-brandColor hover:text-brandColor ' variant={'ghost'}>
                    <Pencil className="h-4 w-4  " />
                </Button>
            </div>
            {/* <ControllableDropdown open={open} setOpen={setOpen} zIndex={10} trigger={(
                <span className=' bg-gray-100 w-7 h-7  rounded-full group '>
                    <Pencil className="h-4 w-4 text-brandColor group-hover:underline " />
                </span>
            )}>
                <div className=" flex flex-col gap-1 ">
                    <Link href={`/scheduling/scheduled-shifts/${member.id}/add`} className=' w-full px-4 py-2 hover:bg-gray-100 ' >Set regular shift</Link>

                    <Button onClick={() => {
                        setQuery({ key: "member", value: String(memberId) })
                        setOpen(false)
                    }} className=' w-full flex justify-start' variant={'ghost'}>Set regular shift</Button>
                    <Button className=' w-full flex justify-start ' variant={'ghost'}>Edit team member</Button>
                </div>
            </ControllableDropdown> */}
        </>
    )
}

export default PencilDropdown