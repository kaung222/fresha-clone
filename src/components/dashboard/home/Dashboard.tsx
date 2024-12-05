'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, BarChart2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import BestServiceStatistics from './best-service-statistics'
import BestMemberStatistics from './best-member-statistics'
import AppointmentChart from './appointment-chart'
import TodayAppointments from './today-appointment'
import { GetTeamMember } from '@/api/member/get-teammember'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import DetailAppointment from '../calendar/drawers/detail/detail-appointment'
import CheckoutAppointmentDataProvider from '../calendar/drawers/checkout-appointment/CheckoutAppointmentDataProvider'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import PageLoading from '@/components/common/page-loading'



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
    const { getQuery } = useSetUrlParams()
    const [recentSalePeriod, setRecentSalePeriod] = useState('Last 7 days')
    const [upcomingPeriod, setUpcomingPeriod] = useState('Next 7 days')
    const [todayPeriod, setTodayPeriod] = useState('Next 7 days')
    const [topTeamPeriod, setTopTeamPeriod] = useState('Next 7 days')
    const { data: allMembers, isLoading: memLoading } = GetTeamMember();
    const detailAppointmentId = getQuery('detail');
    const checkoutId = getQuery('checkout');
    const { data: organization, isLoading } = GetOrganizationProfile()


    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : organization && (
                <>
                    <div className=" mx-auto pt-8 pb-[50vh]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <AppointmentChart currency={organization?.currency} />

                            {/* <Card>
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
                    </Card> */}

                            <TodayAppointments />

                            <BestServiceStatistics />

                            <BestMemberStatistics />
                        </div>
                    </div>
                    {
                        detailAppointmentId && allMembers && (
                            <DetailAppointment detailAppointmentId={detailAppointmentId} allMembers={allMembers} page="table" />
                        )
                    }
                    {
                        allMembers && checkoutId && (
                            <CheckoutAppointmentDataProvider appointmentId={checkoutId} allMembers={allMembers} />
                        )
                    }
                </>
            )}
        </>
    )
}