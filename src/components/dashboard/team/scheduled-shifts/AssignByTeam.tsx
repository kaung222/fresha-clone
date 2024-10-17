'use client'
import { useState } from 'react'
import { ArrowLeft, ChevronDown, LightbulbIcon, MoreVertical, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"

const teamMembers = [
    { id: 1, name: "Pyae PhyoNyo", avatar: "PP" },
    { id: 2, name: "Wendy Smith (Demo)", avatar: "/placeholder.svg?height=40&width=40" }
]

export default function ScheduledShiftsTeam() {

    return (
        <>
            <div className="space-y-4 mb-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg">
                        <Button
                            variant="ghost"
                            className="w-full flex justify-between items-center p-4"
                        >
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                    {member.avatar.startsWith('/') ? (
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                    ) : (
                                        <AvatarFallback>{member.avatar}</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="text-left">
                                    <div className="font-semibold">{member.name}</div>
                                    <div className="text-sm text-gray-500">No shifts</div>
                                </div>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="text-center mb-6">
                <span className="text-gray-600">Can't see a team member? </span>
                <a href="#" className="text-indigo-600 hover:underline">Assign members</a>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start space-x-3 mb-6">
                <LightbulbIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                    The team roster shows your availability for bookings and is not linked to your business opening hours. To set your opening hours, <a href="#" className="font-medium underline">click here</a>.
                </p>
            </div>

        </>
    )
}