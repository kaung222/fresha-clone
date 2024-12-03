'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartData, ChartOptions } from 'chart.js'
import { dayLabel, monthlyLabel, thirtyOneZeroData } from '@/lib/data/chartData'
import BarChart from '@/components/common/BarChart'
import { GetOverAllStatistics, GetOverAllStatisticsSecond } from '@/api/statistics/get-overall-statistics'
import { addDays, addMonths, endOfDay, endOfMonth, format, getDate, startOfDay, startOfMonth, subDays } from 'date-fns'
import CircleLoading from '@/components/layout/circle-loading'
import { OverallStatistics } from '@/types/statistics'

type Props = {}

const dateRangePresets = [
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Next Month", value: "nextMonth" },
]

const AppointmentChart = (props: Props) => {
    const initialStartDateString = format(startOfMonth(new Date()), 'yyyy-MM-dd')
    const initialEndDateString = format(endOfMonth(new Date()), "yyyy-MM-dd")
    const [startDate, setStartDate] = React.useState<Date>(new Date(initialStartDateString))
    const [endDate, setEndDate] = React.useState<Date>(new Date(initialEndDateString))
    const [quickSelect, setQuickSelect] = React.useState<string>("thisMonth");
    const { data: statistics, isLoading } = GetOverAllStatistics({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        status: 'completed'
    })
    // const { data: cancelledStatistics } = GetOverAllStatisticsSecond({
    //     startDate: format(startDate, "yyyy-MM-dd"),
    //     endDate: format(endDate, "yyyy-MM-dd"),
    //     status: 'cancelled'
    // })

    const handleQuickSelect = (value: string) => {
        setQuickSelect(value);
        const now = new Date();

        switch (value) {
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

    const appointmentResult = (statistic: OverallStatistics[], result: "count" | "amount") => {
        const countArray = statistic.flatMap(m => m.totalAppointments);
        const amountArray = statistic.flatMap(m => m.totalDiscountPrice);
        return result == "count" ? countArray.reduce((pv, cv) => pv + Number(cv), 0) : amountArray.reduce((pv, cv) => pv + Number(cv), 0)
    }

    const statisticsData = (statistic: OverallStatistics[], dataContainer: string[]) => {
        const sampleData: number[] = [];
        dataContainer.map((day) => {
            const result = statistic.find((stat) => getDate(new Date(stat.date.slice(0, 10))) == Number(day))
            if (result) {
                sampleData.push(Number(result.totalAppointments));
            } else {
                sampleData.push(0);
            }
        })
        return sampleData;
    }



    const data: ChartData<'bar'> = {
        labels: dayLabel,
        datasets: [
            {
                label: 'Appointment',
                data: statistics ? statisticsData(statistics, dayLabel) : thirtyOneZeroData,
                backgroundColor: 'rgba(57, 108, 240, 0.2)',
                borderColor: 'rgba(57,108,240, 1)',
                borderWidth: 1,
                base: 0,
            },
            // {
            //     label: 'Cancelled',
            //     data: cancelledStatistics ? statisticsData(cancelledStatistics, dayLabel) : thirtyOneZeroData,
            //     backgroundColor: 'rgb(255, 102, 102,0.2)',
            //     borderColor: 'rgb(255, 102, 102,1)',
            //     borderWidth: 1,
            //     base: 0,
            // },

        ],
    };

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Appointment Chart(${format(startDate, "MMMM yyyy")})`
            }
        }
    }


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center h-[60px] border-b border-zinc-200 justify-between space-y-0 p-3">
                    <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Recent Sale</CardTitle>
                    <Select value={quickSelect} onValueChange={(e) => handleQuickSelect(e)}>
                        <SelectTrigger className="w-[180px]">
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
                </CardHeader>
                <CardContent>
                    <div className="text-[30px] leading-[36px] font-[500] mb-3 ">MMK {statistics && appointmentResult(statistics, "amount")}</div>
                    <p className="text-text text-muted-foreground mb-2">
                        Appointments: <span className=' font-heading '>{statistics && appointmentResult(statistics, "count")}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                        Appointment value: MMK <span className=" font-heading ">{statistics && appointmentResult(statistics, "amount")}</span>
                    </p>
                    <div className=" h-[300px] w-full ">
                        {isLoading ? (
                            <CircleLoading />
                        ) : statistics && (
                            <BarChart data={data} options={options} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AppointmentChart