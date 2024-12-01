'use client'
import { GetAllClients } from '@/api/client/get-all-clients'
import CircleLoading from '@/components/layout/circle-loading'
import ChildModal from '@/components/modal/ChildModal'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultClient } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { MoveLeft, Plus, User } from 'lucide-react'
import React, { useState } from 'react'
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { MiniClient } from './CreateAppointmentDrawer'
import { AppointmentService } from '@/types/appointment'
import { Member, MemberForAll } from '@/types/member'

type Props = {
    serviceToUpdate: AppointmentService;
    setMemberUpdateService: React.Dispatch<React.SetStateAction<AppointmentService | null>>;
    setSelectedService: React.Dispatch<React.SetStateAction<AppointmentService[]>>;
    allMembers: MemberForAll[]
}

const UpdateMemberDrawer = ({ serviceToUpdate, setSelectedService, allMembers, setMemberUpdateService }: Props) => {
    const [clientSearch, setClientSearch] = useState('')
    const { setQuery } = useSetUrlParams();


    const handleClose = () => {
        setMemberUpdateService(null)
    };

    const changeMember = (member: MemberForAll) => {
        setSelectedService(prev => prev.map((ser) => ser.id == serviceToUpdate.id ? ({ ...ser, providedMember: member }) : ser))
        setMemberUpdateService(null)
    }

    const handleSearch = useDebouncedCallback((query: string) => {
        setQuery({ key: 'qc', value: clientSearch })
    }, 500)

    const isMemberProvideService = (members: MemberForAll, serviceId: number) => {
        return members.services.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <div className=' w-full h-full  bg-[#14141450]  shadow-dialog absolute z-10 top-0 right-0  '>
                <div onClick={handleClose} className=' w-full h-full'></div>
                <div className={` w-[350px] z-10 p-8 pt-0 bg-white h-full animate__animated animate__backInRight shadow-dialog border border-[#E5E5E5] absolute top-0 right-0 `}>
                    <div className=' py-4 bg-white top-0 border-b h-[120px] border-gray-300 '>
                        <div className=' flex items-center justify-between '>
                            <Button variant={'ghost'} onClick={handleClose} className=' top-5 left-5 '>
                                <MoveLeft className=' w-4 h-4 ' />
                            </Button>
                            <h2 className="text-2xl font-bold">Select a Client</h2>
                        </div>
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Search by first name or full email name"
                                value={clientSearch}
                                onChange={(e) => {
                                    setClientSearch(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                className="w-full h-12 p-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                            />
                        </div>
                    </div>
                    <ScrollArea className=' h-h-full-minus-120 '>

                        {/* <Button onClick={() => chooseClient(defaultClient)} variant="ghost" className="w-full border-b border-zinc-300 flex items-center justify-start gap-4 text-purple-600 h-24 px-4 py-3 ">
                            <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                <User className="h-5 w-5 inline-block " />
                            </div>
                            <h3>Walk-In</h3>
                        </Button> */}
                        {allMembers?.map((member) => (
                            <Button key={member.id} onClick={() => changeMember(member)} variant="ghost" className="w-full flex items-center gap-4 justify-start h-24 px-4 py-3">
                                <Avatar className="h-16 w-16 ">
                                    <AvatarImage src={member.profilePictureUrl} alt={shortName(member.firstName)} className=' object-cover ' />
                                    <AvatarFallback>{shortName(member.firstName)}</AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <div className=' font-semibold
                                         '>{member.firstName} {member.lastName}</div>
                                    <div className=" font-text text-gray-500">{member.email}</div>
                                    {isMemberProvideService(member, serviceToUpdate.id) ? null : (
                                        <div className=' font-text text-delete '>Not provided by this member!</div>
                                    )}
                                </div>
                            </Button>
                        ))}
                    </ScrollArea>

                </div>
            </div>
        </>
    )
}

export default UpdateMemberDrawer