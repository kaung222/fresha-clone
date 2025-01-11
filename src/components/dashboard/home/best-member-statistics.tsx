'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MostOrderMemberStatistics } from '@/api/statistics/most-order-member-statitics'
import CircleLoading from '@/components/layout/circle-loading'
import { secondToHour } from '@/lib/utils'
import DateRangeSelect from '@/components/common/date-range-select'
import { endOfWeek, format, startOfWeek } from 'date-fns'
import { Calendar, List } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetTeamMember } from '@/api/member/get-teammember'
import { MemberForAll } from '@/types/member'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'

type Props = {}



const BestMemberStatistics = (props: Props) => {
    const initialStartDateString = format(startOfWeek(new Date()), 'yyyy-MM-dd')
    const initialEndDateString = format(endOfWeek(new Date()), "yyyy-MM-dd")
    const [startDate, setStartDate] = React.useState<Date>(new Date(initialStartDateString))
    const [endDate, setEndDate] = React.useState<Date>(new Date(initialEndDateString))
    const { data: allMembers, isLoading: memLoading } = GetTeamMember();
    const { data: organization } = GetOrganizationProfile()
    const { data: mostOrderedMembers, isLoading } = MostOrderMemberStatistics({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        status: 'completed'
    })

    const findMember = (members: MemberForAll[], id: string) => {
        return members.find(m => m.id == id)
    }


    return (
        <>
            <Card className=' '>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b border-zinc-200 h-[60px]">
                    <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Top Team Member</CardTitle>
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
                <ScrollArea className=" p-3 h-[300px] overflow-auto ">
                    <Table className={`${mostOrderedMembers && mostOrderedMembers?.length > 0 ? "mb-[200px] " : ""}`}>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Team member</TableHead>
                                <TableHead>Total Order</TableHead>
                                <TableHead>Work Time</TableHead>
                                <TableHead>Total Fees</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading || memLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : mostOrderedMembers?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div className="flex flex-col items-center justify-center h-[300px]">
                                            <Calendar className="h-10 w-10 text-brandColor mb-2" />
                                            <p className="text-sm font-medium">No appointments!</p>
                                            <p className="text-xs text-muted-foreground">No appointment on these day!</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : allMembers && (
                                mostOrderedMembers?.map((member, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{findMember(allMembers, member.memberId)?.firstName} {findMember(allMembers, member.memberId)?.lastName}</TableCell>
                                        <TableCell>{member.totalOrders}</TableCell>
                                        <TableCell>{secondToHour(Number(member.totalDuration), 'duration')}</TableCell>
                                        <TableCell>{organization?.currency || 'MMK'} {member.totalFees}</TableCell>
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

export default BestMemberStatistics