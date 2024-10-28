'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'

const salesData = [
    { day: 'Thu', amount: 1500 },
    { day: 'Fri', amount: 3000 },
    { day: 'Sat', amount: 3500 },
    { day: 'Sun', amount: 3700 },
    { day: 'Mon', amount: 4500 },
    { day: 'Tue', amount: 2500 },
    { day: 'Wed', amount: 2000 },
]

const kpis = [
    { title: 'Appointments', value: '1', change: '+5.2%' },
    { title: 'Clients', value: '0', change: '+3.1%' },
    { title: 'Occupancy', value: '25%', change: '+5.1%' },
    { title: 'Retention', value: '0%', change: '+2.1%' },
]

export default function OverViewData() {
    const [timeFrame, setTimeFrame] = useState('Last 7 days')
    const router = useRouter();

    const handleClose = () => {
        router.back();
    }

    return (
        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 overflow-auto  ">
            <h1 className="text-2xl font-bold mb-6">Overview</h1>
            <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Analytics dashboard</CardTitle>
                    <div className="flex items-center space-x-4">
                        {/* <Button variant="link" className="text-blue-600">View dashboard</Button> */}
                        <Select value={timeFrame} onValueChange={setTimeFrame}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select time frame" />
                            </SelectTrigger>
                            <SelectContent className=' z-[90] '>
                                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Sales</h3>
                        <div className="text-3xl font-bold mb-4">MMK 110</div>
                        <div className="h-64">
                            {/* <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis tickCount={7} stroke='#000' />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#4F46E5" />
                                </BarChart>
                            </ResponsiveContainer> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {kpis.map((kpi) => (
                            <Card key={kpi.title}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-500">{kpi.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{kpi.value}</div>
                                    <p className="text-xs text-green-500">{kpi.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}