'use client'
import React, { useState } from 'react'
import WideSchedulePage from './WideScheduled'
import ScheduledShiftsByWeek from './AsignByWeek'
import { ArrowLeft, ChevronDown, MoreVertical, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import ScheduledShiftsTeam from './AssignByTeam'

type Props = {}

const SchedulePage = (props: Props) => {
    const [view, setView] = useState('week')
    return (
        <>
            <WideSchedulePage />
            <div className=' z-[60] fixed top-0 left-0 w-full h-screen bg-white lg:hidden ' >

                <div className="max-w-2xl mx-auto p-6 h-full overflow-auto ">
                    <header className="flex justify-between items-center w-full mb-6 h-[70px] fixed top-0 left-0 bg-white ">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-2xl font-bold">Scheduled shifts</h1>
                        <div className="flex items-center space-x-2">
                            <Select defaultValue="2-8 Sep, 2024">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2-8 Sep, 2024">2 - 8 Sep, 2024</SelectItem>
                                    <SelectItem value="9-15 Sep, 2024">9 - 15 Sep, 2024</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-6 w-6" />
                            </Button>
                        </div>
                    </header>


                    <div className="space-y-4 mt-[70px] ">
                        <div className="flex justify-center mb-6 w-full ">
                            <Toggle
                                variant="outline"
                                pressed={view === 'team'}
                                onPressedChange={() => setView('team')}
                                className="rounded-r-none"
                            >
                                Team
                            </Toggle>
                            <Toggle
                                variant="outline"
                                pressed={view === 'week'}
                                onPressedChange={() => setView('week')}
                                className="rounded-l-none"
                            >
                                Week
                            </Toggle>
                        </div>
                        {view === 'week' ? (
                            <ScheduledShiftsByWeek />
                        ) : (
                            <ScheduledShiftsTeam />
                        )}


                    </div>

                    <Button className="fixed bottom-6 right-6 rounded-full" size="lg">
                        <Plus className="h-6 w-6 mr-2" />
                        Add
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SchedulePage