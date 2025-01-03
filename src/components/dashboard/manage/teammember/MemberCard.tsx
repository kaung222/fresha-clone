import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone } from 'lucide-react'
import { Member } from '@/types/member'
import { shortName } from '@/lib/utils'


type Props = {
    member: Member
}

const MemberCard = ({ member }: Props) => {
    return (
        <>
            <Card className="w-full ">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={member.profilePictureUrl || ''} alt={shortName(member.firstName)} />
                            <AvatarFallback className="bg-[#FF66A1] text-white">{shortName(member.firstName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-lg">{member.firstName} {member.lastName}</h3>
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-[#FF66A1]" />
                                <span className="text-gray-600">{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4 text-[#FF66A1]" />
                                <span className="text-gray-600">{member.phone || "--"}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default MemberCard