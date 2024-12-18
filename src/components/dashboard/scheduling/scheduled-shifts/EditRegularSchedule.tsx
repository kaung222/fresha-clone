'use client'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import Modal from '@/components/modal/Modal'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetOrgSchedule } from '@/api/org-schedule/get-org-schedule'
import { OrgSchedule } from '@/types/org-schedule'
import { UpdateOrgMultipleSchedule } from '@/api/org-schedule/update-org-multiple-schedule'
import TimeSelectBox from './add/time-select-box'
import { MemberSchedule } from '@/types/member-schedule'
import { UpdateMemberMultipleSchedule } from '@/api/member-schedule/update-multiple-schedule'
import { useGetSingleMemberSchedules } from '@/api/member-schedule/get-single-member-schedule'
import { Label } from '@/components/ui/label'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { useRouter } from 'next/navigation'

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

type Props = {
    memberId: string;

}

export default function EditRegularSchedule({ memberId }: Props) {
    const [schedule, setSchedule] = useState<DayShift[]>(defaultSchedule);
    const { data: memberSchedule, isLoading } = useGetSingleMemberSchedules(memberId)
    const form = useForm();
    const { deleteQuery, getQuery } = useSetUrlParams();
    const { mutate, isPending } = UpdateMemberMultipleSchedule()
    const router = useRouter();

    const handleClose = () => {
        deleteQuery({ key: 'member' })
    }

    useEffect(() => {
        if (memberSchedule) {
            // orgSchedule.map((item) => {
            //     setSchedule(prev => prev.map((item) => item.dayOfWeek.toLowerCase() == item.dayOfWeek.toLowerCase() ? ({ ...item, id: item.id, enabled: true, startTime: item.startTime, endTime: item.endTime }) : item))
            // })
            setSchedule(prev => prev.map((item) => {
                const scheduleInOrg = memberSchedule.find((sche) => sche.dayOfWeek.toLowerCase() == item.dayOfWeek.toLowerCase())
                return scheduleInOrg ? ({ ...item, id: scheduleInOrg.id, enabled: true, startTime: scheduleInOrg.startTime, endTime: scheduleInOrg.endTime }) : item;
            }))
        }
    }, [memberSchedule])

    const handleDayToggle = (day: string) => {
        setSchedule(prev => prev.map((item) => item.dayOfWeek == day ? ({ ...item, enabled: !item.enabled }) : item))
    };
    console.log(memberSchedule)
    const saveSchedule = (values: any) => {
        // console.log(Object.entries(schedule))
        const newSchedule = schedule.filter((item) => item.enabled).map((day) => ({ id: day.id, startTime: day.startTime, endTime: day.endTime, dayOfWeek: day.dayOfWeek, memberId: memberId }))
        const payload = {
            schedules: newSchedule,
            memberId: memberId
        }
        console.log(payload)
        //@ts-ignore
        mutate(payload, {
            onSuccess() {
                handleClose()
            }
        });
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())




    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" w-full h-full overflow-hidden">
                    <div className="flex justify-between items-center  w-full h-[80px] border-b shadow-dialog bg-white border-gray-200 px-5 lg:px-10 ">
                        <div>
                            <h1 className=" text-xl md:text-2xl font-bold">Edit Regular Shifts</h1>
                        </div>
                        <div className=" flex items-center gap-2 ">
                            {
                                notChanged ? (
                                    <Button variant="brandOutline" className=" " onClick={() => handleClose()} >Close</Button>
                                ) : (
                                    <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => handleClose()}>
                                        <Button variant={'brandOutline'} className=''>Close</Button>
                                    </ConfirmDialog>
                                )
                            }
                            <Button disabled={isPending} form='schedule-form' type='submit' variant="brandDefault" className="  " >
                                {isPending ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin ' />
                                        saving...
                                    </>
                                ) : "Saves"}
                            </Button>
                        </div>

                    </div>

                    <Form {...form}>
                        <form id='schedule-form' onSubmit={form.handleSubmit(saveSchedule)} className='overflow-auto h-h-full-minus-80 ' >
                            <div className=' space-y-6 py-6 px-5 lg:px-10 '>

                                {/* <div className="text-center px-5 flex flex-col items-center ">
                                    <h1 className="text-2xl font-bold">Edit Regular Shifts</h1>
                                    <p className="text-gray-500">Edit weekly regular shift of team member.</p>
                                </div> */}
                                <div className="flex gap-6">

                                    <Card className="space-y-2 p-5 w-full overflow-auto ">
                                        {schedule.map((shift) => (
                                            <div key={shift.id} className="flex items-center justify-between w-full gap-4 h-[120px] border-b ">
                                                <div className=" flex items-center gap-2">
                                                    <Checkbox
                                                        id={shift.dayOfWeek}
                                                        checked={shift.enabled}
                                                        onCheckedChange={() => handleDayToggle(shift.dayOfWeek)}
                                                    />
                                                    <Label htmlFor={shift.dayOfWeek} className=' text-[15px] font-semibold '>{shift.dayOfWeek}</Label>
                                                </div>

                                                {shift.enabled ? (
                                                    <>
                                                        <div className=' flex items-center justify-between gap-5 '>

                                                            <TimeSelectBox part='start' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.startTime} />

                                                            <span className="text-gray-400">—</span>

                                                            <TimeSelectBox part='end' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.endTime} />
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
                </div>
            </Modal>
        </>
    )
}