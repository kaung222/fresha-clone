'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import OverViewData from './profile-drawer-components/OverView'
import PersonalData from './profile-drawer-components/Profile'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useLocalstorage } from '@/lib/helpers'
import { Member } from '@/types/member'


type Props = {
    teamMember: Member;
    setTeamMember: Dispatch<SetStateAction<Member | null>>;
}

export default function ProfileDrawer({ teamMember, setTeamMember }: Props) {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const { setQuery, getQuery } = useSetUrlParams();
    const [profileTab, setProfileTab] = useState<'overView' | 'personal'>('overView');
    const router = useRouter();
    const handleClose = () => {
        setTeamMember(null)

    }
    useEffect(() => {

    }, [teamMember])

    return (
        <>
            <Modal onClose={handleClose}>
                <div className="flex h-screen w-auto lg:w-[800px] bg-gray-100">
                    <div className="w-64 bg-white p-6 border-r">
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={teamMember?.profilePictureUrl} alt={teamMember?.firstName} />
                                <AvatarFallback>{teamMember?.firstName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-semibold">{`${teamMember?.firstName + ' ' + teamMember?.lastName}`}</h2>
                                <p className="text-sm text-gray-500">{teamMember?.jobTitle}</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            <Button type="button" onClick={() => setProfileTab('overView')} variant="ghost" className="w-full justify-start ">Overview</Button>
                            <Button type="button" onClick={() => setProfileTab('personal')} variant="ghost" className="w-full justify-start">Personal</Button>
                        </nav>
                    </div>
                    
                        {
                            profileTab == 'overView' && <OverViewData />
                        }
                        {
                            profileTab == 'personal' && <PersonalData member={teamMember} />
                        }
                    
                </div>
                {/* image viewer  */}



            </Modal>
        </>
    )
}