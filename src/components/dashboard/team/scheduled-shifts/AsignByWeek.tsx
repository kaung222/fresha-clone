'use client'
import { useState } from 'react'
import { ArrowLeft, ChevronDown, MoreVertical, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"

const days = [
    "Monday, 2 Sep",
    "Tuesday, 3 Sep",
    "Wednesday, 4 Sep",
    "Thursday, 5 Sep",
    "Friday, 6 Sep",
    "Saturday, 7 Sep"
]

export default function ScheduledShiftsByWeek() {

    return (
        <>
            {days.map((day) => (
                <div key={day} className="border rounded-lg">
                    <Button
                        variant="ghost"
                        className="w-full flex justify-between items-center p-4"
                    >
                        <span className="font-semibold">{day}</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div className="p-4 border-t">
                        <p className="text-gray-500">No team members available</p>
                    </div>
                </div>
            ))}
        </>
    )
}