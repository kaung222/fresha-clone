import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

const teamMembers = [
    { id: 'all', name: 'All team members', count: 4 },
    { id: 'jm', name: 'James Marcus', initials: 'JM' },
    { id: 'mm', name: 'Melody Miss', role: 'Beauty care', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 'pp', name: 'Pyae PhyoNyo', initials: 'PP' },
    { id: 'ws', name: 'Wendy Smith (Demo)', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function TeamMember() {
    const [selectedMembers, setSelectedMembers] = useState<string[]>(teamMembers.map(m => m.id))

    const handleMemberToggle = (memberId: string) => {
        setSelectedMembers(prev => {
            if (memberId === 'all') {
                return prev.includes('all') ? [] : teamMembers.map(m => m.id)
            } else {
                const newSelection = prev.includes(memberId)
                    ? prev.filter(id => id !== memberId)
                    : [...prev, memberId]

                if (newSelection.length === teamMembers.length - 1) {
                    return teamMembers.map(m => m.id)
                } else if (newSelection.includes('all')) {
                    return newSelection.filter(id => id !== 'all')
                }
                return newSelection
            }
        })
    }

    return (
        <div className="w-full max-w-2xl  bg-white p-6">
            <h2 className="text-2xl font-bold mb-2">Team members required</h2>
            <p className="text-gray-500 mb-6">Choose which team members will perform this service</p>

            <div className="space-y-4">
                {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-4">
                        <Checkbox
                            id={member.id}
                            checked={selectedMembers.includes(member.id)}
                            onCheckedChange={() => handleMemberToggle(member.id)}
                            className="h-5 w-5 border-2 border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                        />
                        <label
                            htmlFor={member.id}
                            className="flex items-center space-x-4 cursor-pointer"
                        >
                            {member.id !== 'all' && (
                                <Avatar className="h-10 w-10">
                                    {member.avatar ? (
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                    ) : (
                                        <AvatarFallback className="bg-blue-100 text-blue-600">{member.initials}</AvatarFallback>
                                    )}
                                </Avatar>
                            )}
                            <div>
                                <div className="font-medium">{member.name}</div>
                                {member.role && <div className="text-sm text-gray-500">{member.role}</div>}
                                {member.count && <span className="ml-2 bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">{member.count}</span>}
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}