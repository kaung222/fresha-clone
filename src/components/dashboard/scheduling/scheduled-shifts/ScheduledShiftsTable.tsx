'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Pencil, PlusCircle, ChevronsDown, ChevronDown } from 'lucide-react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { addDays, format, startOfWeek } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppDropdown from '@/components/common/DropDown'
import { GetTeamMember } from '@/api/member/get-teammember'
import { secondToHour, shortName } from '@/lib/utils'
import Link from 'next/link'
import EditSingleSchedule from './edit-single/EditSingleSchedule'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { GetMembersSchedules } from '@/api/member-schedule/get-member-schedule'
import TimeShiftOfEachDay from './common-component/TimeShiftOfEachDay'
import { MemberSchedule } from '@/types/member-schedule'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import EditRegularSchedule from './EditRegularSchedule'
import ControllableDropdown from '@/components/common/control-dropdown'
import PencilDropdown from './common-component/PencilDropdown'
import DateController from './common-component/DateController'
import { GetFormatClosedPeriods } from '@/api/closed-period/get-format-closed-period'
import CircleLoading from '@/components/layout/circle-loading'
import ErrorPage from '@/components/common/error-state'


export default function ScheduledShiftsTable() {
    const { getQuery } = useSetUrlParams()
    const memberId = getQuery("member");
    const [currentWeek, setCurrentWeek] = useState(new Date(2024, 9, 13)); // October 13, 2024
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { data: allTeamMember } = GetTeamMember();
    const { data: memberWithSchedules, isLoading } = GetMembersSchedules(currentDate);
    const { data: closedPeriods } = GetFormatClosedPeriods();

    const getWeekDates = () => {
        const dates = []
        for (let i = 0; i <= 6; i++) {
            const startDate = startOfWeek(currentDate, { weekStartsOn: 0 })
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i);
            dates.push(date)
        }
        return dates
    };

    const oneShiftOfMemberByDay = (day: string, shift: MemberSchedule[] | undefined) => {
        if (shift) {
            const resultShift = shift.find((shift) => shift.dayOfWeek == day)
            return resultShift ? resultShift : null;
        } else {
            return null;
        }
    };
    const workHourOfWeek = (schedules: MemberSchedule[]) => {
        const dailySeconds = schedules.map((item) => (item.endTime - item.startTime));
        const totalSeconds = dailySeconds.reduce((pv, cv) => pv + cv, 0);
        const hourAndMin = (totalSeconds / 3600).toFixed(2).toString().split('.');
        const hours = hourAndMin[0];
        const minute = ((Number(hourAndMin[1]) * 60) / 100).toFixed(0).padStart(2, '0');
        return `${hours}h ${minute}min`;
    }

    const closedDay = (date: Date) => {
        if (closedPeriods) {
            const closeDay = closedPeriods.find((item) => format(new Date(item.date), "ddd MM yyyy") == format(date, "ddd MM yyyy"));
            return closeDay;
        } else {
            return null;
        }
    }

    return (
        <>
            <div className=" ">
                <div className="flex justify-between items-center mb-6">
                    <h1 className=" text-2xl leading-[20px] font-semibold text-headingColor ">Scheduled Shifts</h1>
                    <div className="flex space-x-2">
                        {/* <AppDropdown zIndex={10} trigger={(
                            <span className=' px-4 py-2 hover:bg-gray-100 rounded-lg border inline-flex items-center '>Options <ChevronDown className=' h-4 w-4 ' /> </span>
                        )} >
                            <div>
                                <Button variant={'ghost'} className=' w-full '>Scheduling Settings</Button>
                            </div>
                        </AppDropdown> */}
                        {/* <AppDropdown trigger={(
                            <span className=" px-4 py-2 hover:bg-gray-700 bg-gray-900 text-white rounded-lg inline-flex items-center ">Add <ChevronDown className=' h-4 w-4 ' /> </span>
                        )} >
                            <div className=' flex flex-col gap-1 '>
                                <Button variant={'ghost'} className=' w-full flex justify-start '>Time off</Button>
                                <Button variant={'ghost'} className=' w-full flex justify-start '>Business closed period</Button>
                            </div>
                        </AppDropdown> */}
                    </div>
                </div>
                {/* <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <DateController currentDate={currentDate} setCurrentDate={setCurrentDate} />
                    <Button variant="link" className="text-blue-600 hover:no-underline ">
                        Edit opening hours
                    </Button>
                </div> */}
                <div className="overflow-x-auto">
                    <Table className="w-full border-collapse border border-zinc-300 ">
                        <TableHeader className=" ">
                            <TableRow className=" h-[60px] ">
                                <TableHead className="px-4 py-2 text-left w-[220px] border-r font-semibold ">Team Members</TableHead>
                                {getWeekDates().map((date, index) => (
                                    <TableHead key={index} className="px-4 py-2 text-center border-r">
                                        <div className=" text-text font-[500] leading-text text-zinc-900 ">{format(date, 'EEE, d MMM')}</div>
                                        {/* <div className="text-[12px] leading-text text-zinc-500 font-text ">10h</div> */}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className=' mb-[50vh] '>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : memberWithSchedules ? (
                                memberWithSchedules?.map((member) => (
                                    <TableRow key={member.id} className=' border-b h-[60px] '>
                                        <TableCell className="px-4 py-2 w-[220px] border-r ">
                                            <div className="flex items-center justify-between h-10 w-full">
                                                <div className=" flex gap-2 items-center ">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={member.profilePictureUrl} alt={shortName(member.firstName)} />
                                                        <AvatarFallback>{shortName(member.firstName)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className=" text-text font-medium leading-text text-zinc-900 " >{member.firstName} {member.lastName}</div>
                                                        <div className="text-[12px] leading-text font-[400] text-zinc-500">{workHourOfWeek(member.schedules)}</div>
                                                    </div>
                                                </div>
                                                <PencilDropdown memberId={member.id} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[0]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[0])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Sunday' shift={oneShiftOfMemberByDay("Sunday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[1]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[1])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Monday' shift={oneShiftOfMemberByDay("Monday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[2]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[2])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Tuesday' shift={oneShiftOfMemberByDay("Tuesday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[3]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[3])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Wednesday' shift={oneShiftOfMemberByDay("Wednesday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[4]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[4])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Thursday' shift={oneShiftOfMemberByDay("Thursday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[5]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[5])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Friday' shift={oneShiftOfMemberByDay("Friday", member.schedules)} />
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center border-r group ">
                                            {closedDay(getWeekDates()[6]) ? (
                                                <span className="bg-red-200 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                    {closedDay(getWeekDates()[6])?.type}
                                                </span>
                                            ) : (
                                                <TimeShiftOfEachDay memberId={member.id} day='Saturday' shift={oneShiftOfMemberByDay("Saturday", member.schedules)} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className=' h-[450px] '>
                                    <TableCell colSpan={8}>
                                        <ErrorPage isScreen={false} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {memberId && (
                <EditRegularSchedule memberId={memberId} />
            )}
        </>
    )
}