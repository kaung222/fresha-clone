'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MostServiceStatistics } from '@/api/statistics/most-service-statistics'
import CircleLoading from '@/components/layout/circle-loading'
import DateRangeSelect from '@/components/common/date-range-select'
import { format } from 'date-fns'
import { Calendar, List } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetAllServices } from '@/api/services/get-all-services'
import { Service } from '@/types/service'

type Props = {}

const BestServiceStatistics = (props: Props) => {
    const initialStartDateString = format(new Date(), 'yyyy-MM-dd')
    const initialEndDateString = format(new Date(), "yyyy-MM-dd")
    const [startDate, setStartDate] = React.useState<Date>(new Date(initialStartDateString))
    const [endDate, setEndDate] = React.useState<Date>(new Date(initialEndDateString));
    const { data: allServices, isLoading: serLoading } = GetAllServices()
    const { data: mostOrderedServices, isLoading } = MostServiceStatistics({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        status: 'completed'
    })

    const findService = (id: number, services: Service[]) => {
        return services.find(ser => ser.id == id)
    }


    return (
        <>
            <Card>
                <CardHeader className='p-3 border-b flex flex-row items-center justify-between border-zinc-200 h-[60px] '>
                    <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Best services</CardTitle>
                    <DateRangeSelect
                        initialEndDateString={initialEndDateString}
                        initialStartDateString={initialStartDateString}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        defaultValue='thisWeek'
                        dateRangePresets={([
                            { label: "Today", value: "today" },
                            { label: "Yesterday", value: "yesterday" },
                            { label: "Tomorrow", value: "tomorrow" },
                            { label: "This Week", value: "thisWeek" },
                            { label: "Last Week", value: "lastWeek" },
                            { label: "Next Week", value: "nextWeek" },
                            { label: "This Month", value: "thisMonth" },
                            { label: "Last Month", value: "lastMonth" },
                            { label: "Next Month", value: "nextMonth" },
                        ])}
                    />
                </CardHeader>
                <ScrollArea className=' p-3  h-[300px] '>
                    <Table className={`${mostOrderedServices && mostOrderedServices.length > 0 ? " mb-[200px] " : ""}`}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Total Sale</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading || serLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : mostOrderedServices?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div className="flex flex-col items-center justify-center h-[300px]">
                                            <Calendar className="h-10 w-10 text-gray-400 mb-2" />
                                            <p className="text-sm font-medium">No appointments!</p>
                                            <p className="text-xs text-muted-foreground">No appointment on these day!</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : allServices && (

                                mostOrderedServices?.map((service, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{String(service.serviceId)}</TableCell>
                                        <TableCell>{findService(service.serviceId, allServices)?.name}</TableCell>
                                        <TableCell>{service.totalOrders}</TableCell>
                                    </TableRow>
                                ))
                            )}

                        </TableBody>
                    </Table>
                </ScrollArea>
            </Card>
        </>
    )
}

export default BestServiceStatistics