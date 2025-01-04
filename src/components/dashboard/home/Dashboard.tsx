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
import ErrorPage from '@/components/common/error-state'
import { Button } from '@/components/ui/button'



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
            ) : organization ? (
                <>
                    <div className=" mx-auto pb-[50vh]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className=" col-span-1 lg:col-span-2  ">
                                <AppointmentChart currency={organization?.currency} />
                            </div>
                            <div className=" col-span-1 lg:col-span-2  ">
                                <TodayAppointments />
                            </div>

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
            ) : (
                <ErrorPage />
            )}
        </>
    )
}