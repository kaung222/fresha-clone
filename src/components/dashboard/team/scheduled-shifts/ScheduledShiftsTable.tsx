'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Pencil, PlusCircle, ChevronsDown, ChevronDown } from 'lucide-react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppDropdown from '@/components/common/DropDown'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const shiftsData = {
    memberName: "Phwe Phwe",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "50hr",
    shifts: [
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '20:00' },
        { start: '10:00', end: '20:00' },
        { start: '', end: '' },
        { start: '', end: '' },
    ]
}

export default function ScheduledShifts() {
    const [currentWeek, setCurrentWeek] = useState(new Date(2024, 9, 13)) // October 13, 2024
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setCurrentDate(date);
        }
    }

    const formatDate = (date: Date) => {
        return `${weekDays[date.getDay()]}, ${date.getDate()} Oct`
    }

    const getWeekDates = () => {
        const dates = []
        for (let i = 1; i <= 7; i++) {
            const date = new Date(currentWeek)
            date.setDate(currentWeek.getDate() + i)
            dates.push(date)
        }
        return dates
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className=" text-2xl leading-[20px] font-semibold text-headingColor ">Scheduled Shifts</h1>
                <div className="flex space-x-2">
                    <AppDropdown trigger={(
                        <Button variant={'outline'}>Options <ChevronDown className=' h-4 w-4 ' /> </Button>
                    )} >
                        <div>
                            <Button variant={'outline'} className=' w-full '>Scheduling Settings</Button>
                        </div>
                    </AppDropdown>

                    <AppDropdown trigger={(
                        <Button>Add <ChevronDown className=' h-4 w-4 ' /> </Button>
                    )} >
                        <div className=' flex flex-col gap-1 '>
                            <Button variant={'outline'} className=' w-full '>Time off</Button>
                            <Button variant={'outline'} className=' w-full '>New Team member</Button>
                            <Button variant={'outline'} className=' w-full '>Business closed period</Button>
                        </div>
                    </AppDropdown>

                </div>
            </div>


            <div className="flex justify-between mb-4">
                <div className="rounded-lg h-10 flex items-center justify-start ">
                    <Button variant="ghost" size="icon" className=" border rounded-l-md rounded-r-none border-thinBorder ">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className=" border-thinBorder border rounded-none ">Today</Button>
                    <div className="text-sm p-2 font-medium border border-thinBorder flex justify-center items-center h-10 ">
                        <div>
                            <DatePicker className=" z-[30] "
                                selected={currentDate}
                                onChange={handleDateChange}
                                dateFormat={"MMMM d, yyyy"}
                                customInput={
                                    <button>

                                        {format(currentDate, "MMMM d, yyyy")}

                                    </button>
                                }
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className=" rounded-l-none border border-thinBorder rounded-r-md ">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <Button variant="link" className="text-blue-600 hover:no-underline ">
                    Edit opening hours
                </Button>
            </div>

            <div className="overflow-x-auto">
                <Table className="w-full border-collapse border border-zinc-300 ">
                    <TableHeader className=" ">
                        <TableRow className=" h-[60px] ">
                            <TableHead className="px-4 py-2 text-left w-[220px] border-r  ">Member <Button variant={'link'} className=' text-blue-600 hover:no-underline  '>Change</Button></TableHead>
                            {getWeekDates().map((date, index) => (
                                <TableHead key={index} className="px-4 py-2 text-center border-r">
                                    <div className=" text-text font-[500] leading-text text-zinc-900 ">{formatDate(date)}</div>
                                    <div className="text-[12px] leading-text text-zinc-500 font-text ">10h</div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className=' border-b h-[60px] '>
                            <TableCell className="px-4 py-2 w-[220px] border-r ">
                                <div className="flex items-center justify-between h-10 w-full">
                                    <div className=" flex gap-2 items-center ">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={shiftsData.avatar} alt={shiftsData.memberName} />
                                            <AvatarFallback>{shiftsData.memberName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className=" text-text font-medium leading-text text-zinc-900 " >{shiftsData.memberName}</div>
                                            <div className="text-[12px] leading-text font-[400] text-zinc-500">{shiftsData.role}</div>
                                        </div>
                                    </div>

                                    <AppDropdown trigger={(
                                        <span className=' bg-gray-100 w-7 h-7  rounded-full '>
                                            <Pencil className="h-4 w-4" />
                                        </span>
                                    )}>
                                        <div className=" flex flex-col gap-1 ">
                                            <Button className=' w-full ' variant={'outline'}>Set regular shift</Button>
                                            <Button className=' w-full ' variant={'outline'}>Unassign from location</Button>
                                            <Button className=' w-full ' variant={'outline'}>Edit team member</Button>
                                            <Button className=' w-full text-delete ' variant={'outline'}>Delete all shift</Button>
                                        </div>
                                    </AppDropdown>
                                </div>
                            </TableCell>
                            {shiftsData.shifts.map((shift, index) => (
                                <TableCell key={index} className="px-4 py-2 text-center border-r group ">
                                    {shift.start && shift.end ? (
                                        <AppDropdown trigger={(
                                            <div className="bg-blue-100 text-zinc-900 text-[12px] h-10 leading-[14px] font-medium rounded-md p-1 flex justify-center items-center ">
                                                {shift.start} - {shift.end}
                                            </div>
                                        )}>
                                            <div className=" flex flex-col gap-1 ">
                                                <Button className=' w-full ' variant={'outline'}>Edit this day</Button>
                                                <Button className=' w-full ' variant={'outline'}>Set regular shift</Button>
                                                <Button className=' w-full ' variant={'outline'}>Add time off</Button>
                                                <Button className=' w-full text-delete ' variant={'outline'}>Delete this shift</Button>
                                            </div>
                                        </AppDropdown>
                                    ) : (
                                        <>
                                            <div className=" h-10 flex justify-center items-center " >
                                                <div className="text-gray-400 group-hover:hidden ">-</div>
                                                <AppDropdown trigger={(
                                                    <div className=' hidden group-hover:block cursor-pointer '>
                                                        <PlusCircle className='  w-5 h-5' />
                                                    </div>
                                                )}>
                                                    <div className=" flex flex-col gap-1 ">
                                                        <Button variant={'outline'} className=' w-full '>Add shift</Button>
                                                        <Button variant={'outline'} className=' w-full '>Set regular shift</Button>
                                                        <Button variant={'outline'} className=' w-full '>Add time off</Button>
                                                    </div>
                                                </AppDropdown>
                                            </div>
                                        </>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}