'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import { ArrowDownRight, ArrowUpRight, Calendar, Clock, Coins, Info, Percent, RefreshCcw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, colorOfStatus, secondToHour, shortName } from '@/lib/utils'
import { GetMemberAppointmentsById } from '@/api/appointment/get-member-appointments'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import CircleLoading from '@/components/layout/circle-loading'
import { Member } from '@/types/member'
import { ArgumentType, GetMemberStatisticsById } from '@/api/statistics/member-statistice-by-id'
import { addDays, addMonths, endOfDay, endOfMonth, format, startOfDay, startOfMonth, subDays } from 'date-fns'


interface Appointment {
    id: string
    client: {
        name: string
        image?: string
    }
    service: string
    date: string
    time: string
    status: "completed" | "upcoming" | "cancelled"
}

const appointments: Appointment[] = [
    {
        id: "1",
        client: { name: "Sarah Chen" },
        service: "Hair Cut",
        date: "2024-11-09",
        time: "10:00 AM",
        status: "completed"
    },
    // Add more appointments as needed
]

const dateRangePresets = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "ThisMonth", value: "thisMonth" },
    { label: "LastMonth", value: "lastMonth" },
    { label: "NextMonth", value: "nextMonth" },
]
type Stat = 'pending' | 'confirmed' | 'cancelled' | 'completed'
const allStatus: Stat[] = ['pending', 'confirmed', 'cancelled', 'completed']

export default function OverViewData() {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const [quickSelect, setQuickSelect] = useState<string>("today");
    const initialStartDateString = format(new Date(), 'yyyy-MM-dd')
    const initialEndDateString = format(new Date(), "yyyy-MM-dd")
    const { getQuery, setQuery } = useSetUrlParams();
    const [startDate, setStartDate] = useState<Date>(new Date(initialStartDateString))
    const [endDate, setEndDate] = useState<Date>(new Date(initialEndDateString))
    const [status, setStatus] = useState<"pending" | "confirmed" | "cancelled" | "completed">('completed');
    const memberId = getQuery("member-drawer");
    const router = useRouter();
    const arg: ArgumentType = {
        id: memberId,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        status: status
    }
    const { data: memberAppointments, isLoading } = GetMemberStatisticsById(arg)

    const handleClose = () => {
        router.back();
    }

    const handleQuickSelect = (value: string) => {
        setQuickSelect(value);
        const now = new Date();

        switch (value) {
            case "today":
                setStartDate(startOfDay(now));
                setEndDate(endOfDay(now));
                break;
            case "yesterday":
                setStartDate(startOfDay(subDays(now, 1)));
                setEndDate(endOfDay(subDays(now, 1)));
                break;
            case "tomorrow":
                setStartDate(startOfDay(addDays(now, 1)));
                setEndDate(endOfDay(addDays(now, 1)));
                break;
            case "thisMonth":
                setStartDate(startOfMonth(now));
                setEndDate(endOfMonth(now));
                break;
            case "lastMonth":
                const lastMonth = subDays(startOfMonth(now), 1);
                setStartDate(startOfMonth(lastMonth));
                setEndDate(endOfMonth(lastMonth));
                break;
            case "nextMonth":
                const nextMonth = addMonths(now, 1);
                setStartDate(startOfMonth(nextMonth));
                setEndDate(endOfMonth(nextMonth));
                break;
            default:
                setStartDate(new Date(initialStartDateString));
                setEndDate(new Date(initialEndDateString));
                break;
        }
    };

    return (
        <>
            <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-grow p-8 overflow-auto  ">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Overview</h1>
                            <p className="text-sm text-muted-foreground">Analytics dashboard</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Select value={status} onValueChange={(e: Stat) => setStatus(e)}>
                                <SelectTrigger style={{ color: `${colorOfStatus(status)}` }} className="w-full">
                                    <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allStatus.map((status) => (
                                        <SelectItem style={{ color: `${colorOfStatus(status)}` }} key={status} value={status} className=' capitalize '>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={quickSelect} onValueChange={(e) => handleQuickSelect(e)}>
                                <SelectTrigger className="w-full flex-nowrap ">
                                    <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dateRangePresets.map((preset) => (
                                        <SelectItem key={preset.value} value={preset.value}>
                                            {preset.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {isLoading ? (
                            <CircleLoading />
                        ) : memberAppointments && (
                            <Card >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div style={{ color: `${colorOfStatus(status)}` }} className="text-2xl font-bold">MMK {memberAppointments.data?.totalDiscountPrice || 0}</div>
                                    <div className="text-xs text-muted-foreground capitalize ">
                                        {quickSelect}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {isLoading ? (
                            <CircleLoading />
                        ) : memberAppointments && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Services Count</CardTitle>
                                    <Coins className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div style={{ color: `${colorOfStatus(status)}` }} className="text-2xl font-bold">{memberAppointments.data?.totalServiceCount || 0}</div>
                                    <div className="inline-flex items-center text-xs text-muted-foreground capitalize ">
                                        {quickSelect}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {isLoading ? (
                            <CircleLoading />
                        ) : memberAppointments && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Service Times</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div style={{ color: `${colorOfStatus(status)}` }} className="text-2xl font-bold">{memberAppointments.data?.totalDuration ? secondToHour(Number(memberAppointments.data?.totalDuration), 'duration') : '--'}</div>
                                    <div className="inline-flex items-center text-xs text-muted-foreground capitalize ">
                                        {quickSelect}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {isLoading ? (
                            <CircleLoading />
                        ) : memberAppointments && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Commissions</CardTitle>
                                    <Percent className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div style={{ color: `${colorOfStatus(status)}` }} className="text-2xl font-bold">MMK {memberAppointments.data?.totalCommissionFees || 0}</div>
                                    <div className="inline-flex items-center text-xs text-muted-foreground capitalize ">
                                        {quickSelect}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className=" capitalize ">{quickSelect} Appointments <span style={{ color: `${colorOfStatus(status)}` }} className=' text-xs '>{status}</span> </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ref#</TableHead>
                                        <TableHead>Schedule Date</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Commission Fees</TableHead>
                                        <TableHead>Total Price</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <CircleLoading />
                                            </TableCell>
                                        </TableRow>
                                    ) : memberAppointments?.bookingItems.length == 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={12}>
                                                <div className="flex flex-col items-center justify-center h-[300px]">
                                                    <Calendar className="h-20 w-20 text-gray-400 mb-2" />
                                                    <p className=" text-xl font-bold">No appointments </p>
                                                    <p className=" text-muted-foreground">Visit the calendar to book appointments</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        memberAppointments?.bookingItems?.map((appointment, index) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell className=" font-medium cursor-pointer ">#{index + 1}</TableCell>
                                                <TableCell>{appointment.date} {secondToHour(appointment.startTime)}</TableCell>
                                                <TableCell>{appointment.serviceName}</TableCell>
                                                <TableCell>{secondToHour(appointment.duration, 'duration')}</TableCell>
                                                <TableCell className=' text-end '>{appointment.commissionFees}</TableCell>
                                                <TableCell className=' text-end '>{appointment.price == appointment.discountPrice ? appointment.discountPrice : (<><span className=' text-xs line-through '>{appointment.price}</span> <span className=' font-medium'>{appointment.discountPrice}</span></>)}</TableCell>
                                                <TableCell>
                                                    <div style={{ background: `${colorOfStatus(appointment.appointment?.status)}10`, color: `${colorOfStatus(appointment.appointment.status)}` }} className={cn(
                                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",

                                                    )}>
                                                        {appointment.appointment?.status}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </>
    )
}