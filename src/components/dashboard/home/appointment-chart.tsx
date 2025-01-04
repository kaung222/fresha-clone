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
import { AppointmentStatusStats } from './appointment-status-stats'

type Props = {
    currency: string;
}

const dateRangePresets = [
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Next Month", value: "nextMonth" },
]

type Status = 'pending' | 'confirmed' | 'completed' | 'cancelled'

const AppointmentChart = ({ currency }: Props) => {
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

    const statisticsResult = (statistic: OverallStatistics[], result: "count" | "amount") => {
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

    const statisticsByStatus = (statistics: OverallStatistics[], status: Status): OverallStatistics[] => {
        return statistics.filter((stat) => stat.status == status)
    }



    const data: ChartData<'bar'> = {
        labels: dayLabel,
        datasets: [
            {
                label: 'Completed',
                data: statistics ? statisticsData(statisticsByStatus(statistics, 'completed'), dayLabel) : thirtyOneZeroData,
                backgroundColor: '#11182720',
                borderColor: '#111827',
                borderWidth: 1,
                base: 0,
            },
            {
                label: 'Confirmed',
                data: statistics ? statisticsData(statisticsByStatus(statistics, 'confirmed'), dayLabel) : thirtyOneZeroData,
                backgroundColor: '#10B98120',
                borderColor: '#10B981',
                borderWidth: 1,
                base: 0,
            },
            {
                label: 'Pending',
                data: statistics ? statisticsData(statisticsByStatus(statistics, 'pending'), dayLabel) : thirtyOneZeroData,
                backgroundColor: '#2563EB20',
                borderColor: '#2563EB',
                borderWidth: 1,
                base: 0,
            },
            {
                label: 'Cancelled',
                data: statistics ? statisticsData(statisticsByStatus(statistics, 'cancelled'), dayLabel) : thirtyOneZeroData,
                backgroundColor: '#EF444420',
                borderColor: '#EF4444',
                borderWidth: 1,
                base: 0,
            },
        ],
    };

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'black', // Custom color for x-axis labels
                },
            },
            y: {
                ticks: {
                    callback: (value) => Number(value).toFixed(0), // Force integers
                    stepSize: 1, // Ensure each step is 1 unit
                    precision: 0, // Remove decimal points (just in case)
                    color: "black"
                },
            },
        },
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

    const appointmentStats = {
        completed: { count: 12, value: 45000 },
        cancelled: { count: 3, value: 15000 },
        pending: { count: 5, value: 20000 },
        confirmed: { count: 8, value: 35000 }
    }


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center h-[60px] border-b border-zinc-200 justify-between space-y-0 p-3">
                    <CardTitle className="text-[20px] leading-[28px] font-semibold text-zinc-900">Recent Appointments</CardTitle>
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

                <CardContent className=" pt-6">
                    <AppointmentStatusStats stats={
                        ({
                            completed: {
                                count: statistics ? statisticsResult(statisticsByStatus(statistics, "completed"), "count") : 0,
                                value: statistics ? statisticsResult(statisticsByStatus(statistics, 'completed'), "amount") : 0
                            },
                            cancelled: {
                                count: statistics ? statisticsResult(statisticsByStatus(statistics, "cancelled"), "count") : 0,
                                value: statistics ? statisticsResult(statisticsByStatus(statistics, 'cancelled'), "amount") : 0
                            },
                            pending: {
                                count: statistics ? statisticsResult(statisticsByStatus(statistics, "pending"), "count") : 0,
                                value: statistics ? statisticsResult(statisticsByStatus(statistics, 'pending'), "amount") : 0
                            },
                            confirmed: {
                                count: statistics ? statisticsResult(statisticsByStatus(statistics, "confirmed"), "count") : 0,
                                value: statistics ? statisticsResult(statisticsByStatus(statistics, 'confirmed'), "amount") : 0
                            }
                        })
                    } />
                    <div className=" h-[300px] md:h-[500px] w-full bg-gray-50 rounded-lg ">
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