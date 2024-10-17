'use client'
import React from 'react'
import { Bell, BarChart2, Calendar, CreditCard, Home, MessageCircle, MoreVertical, Search, Settings, Users } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const data = [
    { name: "Tue 1", Sales: 0, Appointments: 0 },
    { name: "Wed 2", Sales: 0, Appointments: 0 },
    { name: "Thu 3", Sales: 0, Appointments: 0 },
    { name: "Fri 4", Sales: 0, Appointments: 0 },
    { name: "Sat 5", Sales: 0, Appointments: 0 },
    { name: "Sun 6", Sales: 0, Appointments: 0 },
    { name: "Mon 7", Sales: 0, Appointments: 0 },
    { name: "Tue 8", Sales: 190, Appointments: 172 },
]



type Props = {}

const page = (props: Props) => {
    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Recent sales</h2>
                                <p className="text-sm text-gray-500">Last 7 days</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-3xl font-bold">MMK 190.00</h3>
                            <p className="text-sm text-gray-500">Appointments 4</p>
                            <p className="text-sm text-gray-500">Appointments value MMK 172.00</p>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="Appointments" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Upcoming appointments</h2>
                                <p className="text-sm text-gray-500">Next 7 days</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-64">
                            <BarChart2 className="h-16 w-16 text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Your schedule is empty</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Make some appointments for schedule data to appear
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default page


