'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import { ArrowDownRight, ArrowUpRight, Calendar, Info, Percent, RefreshCcw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, secondToHour, shortName } from '@/lib/utils'
import { GetMemberAppointmentsById } from '@/api/appointment/get-member-appointments'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import CircleLoading from '@/components/layout/circle-loading'
import { Member } from '@/types/member'
import AppointmentDetailDrawer from './AppointmentDetailDrawer'


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


export default function OverViewData() {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const { getQuery, setQuery } = useSetUrlParams();
    const memberId = getQuery("member-drawer");
    const router = useRouter();
    const { data: memberAppointments, isLoading } = GetMemberAppointmentsById(memberId)

    const handleClose = () => {
        router.back();
    }

    return (
        <>
            <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-grow p-8 overflow-auto  ">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Overview</h1>
                            <p className="text-sm text-muted-foreground">Analytics dashboard</p>
                        </div>
                        <Select defaultValue="7days">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="90days">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                                <ArrowUpRight className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">MMK 110</div>
                                <div className="text-xs text-muted-foreground">
                                    +20% from last week
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <div className="inline-flex items-center text-xs text-muted-foreground">
                                    <ArrowUpRight className="mr-1 h-3 w-3" />
                                    0% from last week
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
                                <Percent className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25%</div>
                                <div className="inline-flex items-center text-xs text-muted-foreground">
                                    <ArrowDownRight className="mr-1 h-3 w-3" />
                                    0% from last week
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Retention</CardTitle>
                                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0%</div>
                                <div className="inline-flex items-center text-xs text-muted-foreground">
                                    <ArrowDownRight className="mr-1 h-3 w-3" />
                                    0% from last week
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className=" w-[40px] "></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <CircleLoading />
                                            </TableCell>
                                        </TableRow>
                                    ) : memberAppointments && (
                                        memberAppointments.map((appointment, index) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell className=" font-medium cursor-pointer ">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={'appointment'} alt={shortName(appointment.username)} />
                                                            <AvatarFallback>{shortName(appointment.username)}</AvatarFallback>
                                                        </Avatar>
                                                        {appointment.username}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{appointment.services.length} services</TableCell>
                                                <TableCell>{appointment.date}</TableCell>
                                                <TableCell>{secondToHour(appointment.startTime)}</TableCell>
                                                <TableCell>
                                                    <div className={cn(
                                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                        {
                                                            "bg-green-100 text-green-700": appointment.status === "completed",
                                                            "bg-blue-100 text-blue-700": appointment.status === "pending",
                                                            "bg-red-100 text-red-700": appointment.status === "cancelled",
                                                            "bg-yellow-100 text-yellow-700": appointment.status === "confirmed",
                                                        }
                                                    )}>
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </div>
                                                </TableCell>
                                                <TableCell className=" w-[40px] ">
                                                    <Button onClick={() => setQuery({ key: 'detail', value: appointment.id.toString() })} variant={'ghost'}>
                                                        <Info className=' w-4 h-4 ' />
                                                    </Button>
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