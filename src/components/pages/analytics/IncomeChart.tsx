'use client'
import { useGetIncomeStatistics } from '@/api/statistics/get-income-statistics';
import { useGetPostStatistics } from '@/api/statistics/get-post-stastics';
import BarChart from '@/components/common/BarChart';
import { dayLabel, monthlyLabel } from '@/lib/data/chartData';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { ChartData, ChartOptions } from 'chart.js'
import React from 'react'
import { dailyDataFormat, monthDataFormat } from './commonFunction';
import { useGetAllStatistics } from '@/api/statistics/get-all-statistics';

type Props = {
    className: string;
}

const IncomeChart = ({ className }: Props) => {
    const { getQuery } = useSetUrlParams();
    const type = getQuery('type');
    const { data: allSt } = useGetAllStatistics();
    const { data: income, isLoading } = useGetIncomeStatistics();
    if (isLoading) {
        return (
            <div className=' text-lg'>Loading...</div>
        )
    }




    //@ts-ignore
    const chartData = (type == "daily") ? dailyDataFormat(income, dayLabel) : monthDataFormat(income, monthlyLabel);

    const data: ChartData<'bar'> = {
        labels: type == "daily" ? dayLabel : monthlyLabel,
        datasets: [
            {
                label: 'Income',
                data: chartData,
                backgroundColor: chartData.map(value => value > 5000 ? 'rgba(57, 108, 240, 0.2)' : 'rgba(188, 52, 51, 0.2)'),
                borderColor: chartData.map(value => value > 5000 ? 'rgba(57,108,240, 1)' : 'rgba(188,52,51, 1)'),
                borderWidth: 1,
                base: 0,
            },
        ],
    };

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'green'
                }
            },
            title: {
                display: true,
                text: 'Income Bar Chart',
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(2,8,23)',
                },
                grid: {
                    color: "rgba(100,116,139,0.2)",

                }
            },
            y: {
                ticks: {
                    color: 'rgb(2,8,23)',
                },
                grid: {
                    color: "rgba(100,116,139,0.2)",

                }
            }
        }
    }


    return (
        <div className={className}>
            <BarChart data={data} options={options} />
        </div>
    )
}

export default IncomeChart