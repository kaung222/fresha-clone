'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Info } from 'lucide-react'
import { GetAllAppointments } from '@/api/appointment/get-all-appointment'
import { colorOfStatus, secondToHour } from '@/lib/utils'
import CircleLoading from '@/components/layout/circle-loading'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Button } from '@/components/ui/button'

type Props = {}

const TodayAppointments = (props: Props) => {
    const { data: todayAppointments, isLoading } = GetAllAppointments();
    const { setQuery } = useSetUrlParams();

    const openAppointmentDrawer = (id: string) => {
        setQuery({ key: 'detail', value: id })
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-zinc-200 h-[60px]">
                    <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Today&apos;s appointments</CardTitle>
                </CardHeader>
                <CardContent className=' p-3 '>
                    <Table className={`${todayAppointments && todayAppointments?.length > 0 ? "mb-[200px] " : ""}`}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Bookings</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : todayAppointments?.length == 0 ? (
                                <TableRow className=' h-[80px] '>
                                    <TableCell colSpan={12}>
                                        <div className="flex flex-col items-center justify-center h-[300px]">
                                            <Calendar className="h-10 w-10 text-brandColor mb-2" />
                                            <p className="text-sm font-medium">No appointments!</p>
                                            <p className="text-xs text-muted-foreground">Visit calendar to book appointments.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                todayAppointments?.map((appointment, index) => (
                                    <TableRow key={index} className=' cursor-pointer ' >
                                        <TableCell>{appointment.username}</TableCell>
                                        <TableCell>{appointment.bookingItems.length} services</TableCell>
                                        <TableCell>{appointment.isOnlineBooking ? "Online" : "Local"}</TableCell>
                                        <TableCell>{secondToHour(appointment.startTime)}</TableCell>
                                        <TableCell>
                                            <span style={{ color: colorOfStatus(appointment.status), borderColor: colorOfStatus(appointment.status) }} className="px-2 py-1 rounded-full  font-bold bg-white border ">{appointment.status}</span>

                                        </TableCell>
                                        <TableCell >
                                            <Button variant={"ghost"} onClick={() => openAppointmentDrawer(String(appointment.id))}>
                                                <Info className=" w-4 h-4 " />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default TodayAppointments