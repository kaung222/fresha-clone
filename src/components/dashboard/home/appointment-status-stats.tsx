'use client'

import { CheckCircle, XCircle, Clock, CalendarCheck, TrendingUp } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface AppointmentStats {
    completed: { count: number; value: number }
    cancelled: { count: number; value: number }
    pending: { count: number; value: number }
    confirmed: { count: number; value: number }
}

interface StatusCardProps {
    title: string
    count: number
    value: number
    icon: React.ReactNode
    colorClass: string
}

const StatusCard = ({ title, count, value, icon, colorClass }: StatusCardProps) => (
    <Card className="relative overflow-hidden">
        <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold">
                        {count}
                    </h3>
                </div>
                <div className={`p-3 rounded-full ${colorClass} bg-opacity-20`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">MMK {value.toLocaleString()}</span>
            </div>
        </CardContent>
    </Card>
)

export function AppointmentStatusStats({ stats }: { stats: AppointmentStats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatusCard
                title="Completed"
                count={stats.completed.count}
                value={stats.completed.value}
                icon={<CheckCircle className="h-6 w-6 text-gray-600" />}
                colorClass="bg-gray-600"
            />
            <StatusCard
                title="Confirmed"
                count={stats.confirmed.count}
                value={stats.confirmed.value}
                icon={<CalendarCheck className="h-6 w-6 text-green-600" />}
                colorClass="bg-green-600"
            />
            <StatusCard
                title="Pending"
                count={stats.pending.count}
                value={stats.pending.value}
                icon={<Clock className="h-6 w-6 text-blue-600" />}
                colorClass="bg-blue-600"
            />
            <StatusCard
                title="Cancelled"
                count={stats.cancelled.count}
                value={stats.cancelled.value}
                icon={<XCircle className="h-6 w-6 text-red-600" />}
                colorClass="bg-red-600"
            />
        </div>
    )
}

