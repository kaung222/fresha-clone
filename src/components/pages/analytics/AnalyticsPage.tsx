'use client'
import React from 'react'
import PostChart from './PostChart'
import { AppBreadcrumb } from '@/components/common/breadcrumb'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import IconChart from '@/components/icons/IconChart'
import IconCalendar from '@/components/icons/IconCalendar'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import OrderChart from './OrderChart'
import IncomeChart from './IncomeChart'
import LikeChart from './LikeChart'
import BookingChart from './BookingChart'

type Props = {}

const AnalyticsPage = (props: Props) => {
    const { setQuery, deleteQuery, getQuery } = useSetUrlParams();
    const chartType = getQuery('chart');
    return (
        <div className='  '>
            <AppBreadcrumb page='analytics' />


            <Card className="h-full w-full max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Select value={chartType} onValueChange={(e) => setQuery({ key: 'chart', value: e })}>
                                <SelectTrigger className="flex items-center gap-2">
                                    <IconChart className="h-4 w-4" />
                                    <SelectValue placeholder="Income" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="post">Post</SelectItem>
                                    <SelectItem value="booking">Booking</SelectItem>
                                    <SelectItem value="order">Order</SelectItem>
                                    {/* <SelectItem value="like">Like</SelectItem> */}
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(e) => setQuery({ key: 'type', value: e })}>
                                <SelectTrigger className="flex items-center gap-2">
                                    <IconCalendar className="h-4 w-4" />
                                    <SelectValue placeholder="monthly" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </CardHeader>
                <CardContent >
                    {!chartType && (
                        <IncomeChart className=' w-full aspect-video' />
                    )}
                    {chartType == "post" && (
                        <PostChart className=' w-full aspect-video' />
                    )}
                    {chartType == "order" && (
                        <OrderChart className=' w-full aspect-video' />
                    )}
                    {chartType == "income" && (
                        <IncomeChart className=' w-full aspect-video' />
                    )}
                    {chartType == "like" && (
                        <LikeChart className=' w-full aspect-video' />
                    )}
                    {chartType == "booking" && (
                        <BookingChart className=' w-full aspect-video' />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AnalyticsPage