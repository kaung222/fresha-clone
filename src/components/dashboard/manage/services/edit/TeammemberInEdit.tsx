'use client'
import { GetTeamMember } from '@/api/member/get-teammember'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React, { Dispatch, useEffect, useState } from 'react'

type Props = {
    selectedMembers: string[];
    setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;
}

const TeamMemberAddInEdit = ({ selectedMembers, setSelectedMembers }: Props) => {
    const { data: teamMembers } = GetTeamMember();
    const handleMemberToggle = (memberId: string) => {
        setSelectedMembers(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        )
    };


    const handleAllMembersToggle = () => {
        if (teamMembers) {
            setSelectedMembers(prev =>
                prev.length === teamMembers.length ? [] : teamMembers.map(m => String(m.id))
            )
        }
    }

    return (
        <>
            {teamMembers && (
                <div className="space-y-4">
                    <div className="text-lg font-semibold">👥 Team Members</div>
                    <p className=' text-text font-medium leading-text text-zinc-500 mb-8 '>Assign team members who will provide this service.

                    </p>
                    <div className="space-y-8">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="all-members"
                                checked={selectedMembers.length === teamMembers.length}
                                onCheckedChange={handleAllMembersToggle}
                            />
                            <Label htmlFor="all-members" className=' font-bold '>All members ({teamMembers.length})</Label>
                        </div>
                        {teamMembers.map((member) => (
                            <div key={member.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`member-${member.id}`}
                                    checked={selectedMembers.includes(String(member.id))}
                                    onCheckedChange={() => handleMemberToggle(String(member.id))}
                                />
                                <Label htmlFor={`member-${member.id}`} className="flex items-center gap-4">
                                    <div className=' border-2 border-gray-300 p-1 rounded-full '>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={member.profilePictureUrl} alt={member.firstName} />
                                            <AvatarFallback>{member.firstName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {member.firstName + ' ' + member.lastName}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default TeamMemberAddInEdit