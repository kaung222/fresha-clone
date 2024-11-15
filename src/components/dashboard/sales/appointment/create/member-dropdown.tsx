'client'
import ControllableDropdown from '@/components/common/control-dropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { shortName } from '@/lib/utils'
import { Member } from '@/types/member'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    allMembers: Member[];
    children: React.ReactNode;
    setMember: Dispatch<SetStateAction<Member | null>>;
}



const MemberDropdown = ({ allMembers, children, setMember }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const chooseMember = (member: Member) => {
        setMember(member)
        setOpen(false)
    }
    return (
        <>
            <ControllableDropdown open={open} setOpen={setOpen} trigger={children}>
                <div className=' flex flex-col gap-2 '>
                    {allMembers.map((member) => (
                        <Button key={member.id} variant="ghost" onClick={() => chooseMember(member)} className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
                            <Avatar className="h-16 w-16 ">
                                <AvatarImage src={member.profilePictureUrl} alt={shortName(member.firstName)} className=' object-cover ' />
                                <AvatarFallback>{shortName(member.firstName)}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <div className=' font-semibold
                                     '>{member.firstName} {member.lastName}</div>
                                <div className=" font-text text-gray-500">{member.email}</div>
                            </div>
                        </Button>
                    ))}
                </div>
            </ControllableDropdown>
        </>
    )
}

export default MemberDropdown