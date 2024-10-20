'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, BarChart2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const recentSaleData = [
    { day: 'Thu', amount: 800 },
    { day: 'Fri', amount: 200 },
    { day: 'Sat', amount: 400 },
    { day: 'Sun', amount: 4000 },
    { day: 'Mon', amount: 600 },
    { day: 'Tue', amount: 2000 },
    { day: 'Wed', amount: 200 },
]

const appointmentsActivity = [
    { date: 'Wed, Oct 18 2024, 19:00', status: 'Booked', service: 'Consultation', price: 70 },
    { date: 'Wed, Oct 18 2024, 19:00', status: 'Booked', service: 'Tattoo', price: 70 },
    { date: 'Wed, Oct 18 2024, 19:00', status: 'Completed', service: 'Tattoo', price: 70 },
]

const bestServices = [
    { service: 'Consultation', thisMonth: 3, lastMonth: 0 },
    { service: 'Tattoo', thisMonth: 1, lastMonth: 0 },
]

const topTeamMember = {
    name: 'Hla Thaung',
    thisMonth: 110,
    lastMonth: 0,
}

export default function Dashboard() {
    const [recentSalePeriod, setRecentSalePeriod] = useState('Last 7 days')
    const [upcomingPeriod, setUpcomingPeriod] = useState('Next 7 days')
    const [todayPeriod, setTodayPeriod] = useState('Next 7 days')
    const [topTeamPeriod, setTopTeamPeriod] = useState('Next 7 days')

    return (
        <div className=" mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Card>
                    <CardHeader className="flex flex-row items-center h-[60px] border-b border-zinc-200 justify-between space-y-0 p-3">
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Recent Sale</CardTitle>
                        <Select value={recentSalePeriod} onValueChange={setRecentSalePeriod}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="text-[30px] leading-[36px] font-[500] mb-3 ">MMK 110.00</div>
                        <p className="text-text text-muted-foreground mb-2">
                            Appointments: <span className=' font-heading '>4</span>
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                            Appointment value: MMK <span className=" font-heading ">280.00</span>
                        </p>
                        <div className=" h-[300px] ">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={recentSaleData}  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" tick={{ fontSize: '11' }} />
                                    <YAxis tick={{ fontSize: '11' }} tickFormatter={(value) => `MMK ${value}`} />
                                    {/* <Tooltip /> */}
                                    <Tooltip formatter={(value) => `MMK ${value}`} /> {/* Tooltip formatting */}
                                    <Bar dataKey="amount" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-zinc-200 h-[60px] ">
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Upcoming appointments</CardTitle>
                        <Select value={upcomingPeriod} onValueChange={setUpcomingPeriod}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Next 7 days">Next 7 days</SelectItem>
                                <SelectItem value="Next 30 days">Next 30 days</SelectItem>
                                <SelectItem value="Next 90 days">Next 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className=' p-3 '>
                        <div className="flex flex-col items-center justify-center h-[300px]">
                            <BarChart2 className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm font-medium">No appointments</p>
                            <p className="text-xs text-muted-foreground">Add appointments for schedule details to show up</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='p-3 border-b border-zinc-200 h-[60px] flex items-center'>
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Appointments activity</CardTitle>
                    </CardHeader>
                    <CardContent style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" h-[329px] overflow-y-auto p-3 ">
                        <div >
                            {appointmentsActivity.map((appointment, index) => (
                                <div key={index} className=" py-4 px-3 ">
                                    <div className=' flex items-center gap-2 '>
                                        <p className="text-text leading-text font-medium text-zinc-500 ">{appointment.date}</p>
                                        <Badge variant={'outline'} className={` text-[12px] leading-[16px] font-semibold ${appointment.status === 'Completed' ? 'text-green-500' : 'text-blue-500'} `}>booked</Badge>
                                    </div>
                                    <div className=' flex justify-between items-center '>
                                        <p className="text-[18px] leading-[28px] font-semibold text-zinc-900 ">{appointment.service}</p>
                                        <p className="text-[18px] leading-[28px] font-semibold text-zinc-900 ">MMK {appointment.price}</p>
                                    </div>
                                    <div className="">
                                        <p className={`text-text leading-text font-text text-muted-foreground `}>
                                            Walk in, 30min with Aye Aye
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-zinc-200 h-[60px]">
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Today's appointments</CardTitle>
                        <Select value={todayPeriod} onValueChange={setTodayPeriod}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Next 7 days">Next 7 days</SelectItem>
                                <SelectItem value="Next 30 days">Next 30 days</SelectItem>
                                <SelectItem value="Next 90 days">Next 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className=' p-3 '>
                        <div className="flex flex-col items-center justify-center h-[300px]">
                            <Calendar className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm font-medium">No appointments today</p>
                            <p className="text-xs text-muted-foreground">Visit the calendar to book appointments</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='p-3 border-b border-zinc-200 h-[60px] flex items-center '>
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Best services</CardTitle>
                    </CardHeader>
                    <CardContent className=' p-3  h-[300px] overflow-auto '>
                        <Table className=''>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>This month</TableHead>
                                    <TableHead>Last month</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bestServices.map((service, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{service.service}</TableCell>
                                        <TableCell>{service.thisMonth}</TableCell>
                                        <TableCell>{service.lastMonth}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-zinc-200 h-[60px]">
                        <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Top team member</CardTitle>
                        <Select value={topTeamPeriod} onValueChange={setTopTeamPeriod}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Next 7 days">Next 7 days</SelectItem>
                                <SelectItem value="Next 30 days">Next 30 days</SelectItem>
                                <SelectItem value="Next 90 days">Next 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className=" p-3 h-[300px] overflow-auto ">
                        <Table className='  '>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Team member</TableHead>
                                    <TableHead>This month</TableHead>
                                    <TableHead>Last month</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{topTeamMember.name}</TableCell>
                                    <TableCell>MMK {topTeamMember.thisMonth}</TableCell>
                                    <TableCell>MMK {topTeamMember.lastMonth}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}