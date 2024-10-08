'use client'
import { useGetIncomeStatistics } from '@/api/statistics/get-income-statistics';
import { useGetPostStatistics } from '@/api/statistics/get-post-stastics';
import BarChart from '@/components/common/BarChart';
import { dayLabel, monthlyLabel } from '@/lib/data/chartData';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { ChartData, ChartOptions } from 'chart.js'
import React from 'react'
import { dailyDataFormat, monthDataFormat } from './commonFunction';

type Props = {
    className: string;
}

const PostChart = ({ className }: Props) => {
    const { getQuery } = useSetUrlParams();
    const type = getQuery('type');
    const { data: postAnalytics, isLoading } = useGetPostStatistics();
    if (isLoading) {
        return (
            <div className=' text-lg'>Loading...</div>
        )
    }








    //@ts-ignore
    const chartData = (type == "daily") ? dailyDataFormat(postAnalytics, dayLabel) : monthDataFormat(postAnalytics, monthlyLabel);


    const data: ChartData<'bar'> = {
        labels: type == "daily" ? dayLabel : monthlyLabel,
        datasets: [
            {
                label: 'Post',
                //@ts-ignore
                data: chartData,
                backgroundColor: chartData.map(value => value > 2 ? 'rgba(57, 108, 240, 0.2)' : 'rgba(188, 52, 51, 0.2)'),
                borderColor: chartData.map(value => value > 2 ? 'rgba(57,108,240, 1)' : 'rgba(188,52,51, 1)'),
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
            },
            title: {
                display: true,
                text: 'Post Bar Chart'
            }
        }
    }


    return (
        <div className={className}>
            <BarChart data={data} options={options} />
        </div>
    )
}

export default PostChart