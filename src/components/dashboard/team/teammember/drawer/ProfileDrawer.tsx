'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import OverViewData from './profile-drawer-components/OverView'
import PersonalData from './profile-drawer-components/Profile'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'

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


export default function ProfileDrawer() {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const { setQuery, getQuery } = useSetUrlParams();
    const [profileTab, setProfileTab] = useState<'overView' | 'personal'>('overView');
    const router = useRouter();

    const handleClose = () => {
        router.push('/team/teammember');
    }

    return (
        <Modal onClose={handleClose}>
            <div className="flex h-screen w-auto lg:w-[800px] bg-gray-100">
                <aside className="w-64 bg-white p-6 border-r">
                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Phwe Phwe" />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-semibold">Phwe Phwe</h2>
                            <p className="text-sm text-gray-500">Beauty care</p>
                        </div>
                    </div>
                    <nav className="space-y-2">
                        <Button type="button" onClick={() => setProfileTab('overView')} variant="ghost" className="w-full justify-start ">Overview</Button>
                        <Button type="button" onClick={() => setProfileTab('personal')} variant="ghost" className="w-full justify-start">Personal</Button>
                    </nav>
                </aside>

                {
                    profileTab == 'overView' && <OverViewData />
                }
                {
                    profileTab == 'personal' && <PersonalData />
                }

            </div>
        </Modal>
    )
}