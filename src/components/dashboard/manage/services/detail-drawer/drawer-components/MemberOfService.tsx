import { Service } from '@/types/service'
import React from 'react'
import ServiceCard from '../../ServiceCard'
import { Card } from '@/components/ui/card'
import { Member } from '@/types/member'
import MemberCard from '../../../teammember/MemberCard'

type Props = {
    members: Member[]
}

const MembersOfServices = ({ members }: Props) => {
    return (
        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-grow p-3 md:p-8 overflow-auto  ">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Members</h1>
                        <p className="text-sm text-muted-foreground">Members who provided this service</p>
                    </div>
                </div>
                <Card className=" p-5 space-y-2 ">
                    {members.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </Card>
            </div>
        </main>
    )
}

export default MembersOfServices