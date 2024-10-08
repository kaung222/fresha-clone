// components/BarChart.tsx
import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { FC } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


type Props = {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
}

const BarChart = ({ data, options }: Props) => {
    return (
        <Bar data={data} options={options} />
    )
}

export default BarChart