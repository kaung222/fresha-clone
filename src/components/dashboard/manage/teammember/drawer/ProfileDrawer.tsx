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
import { GetSingleMember } from '@/api/member/get-single-member'
import { Badge } from '@/components/ui/badge'
import { Edit, MoreHorizontal, MoreVertical, Star, Trash } from 'lucide-react'
import MemberService from './profile-drawer-components/MemberService'
import AppDropdown from '@/components/common/DropDown'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { DeleteMember } from '@/api/member/delete-member'
import Link from 'next/link'


type Props = {
    memberId: string;
}

export default function ProfileDrawer({ memberId }: Props) {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams();
    const [profileTab, setProfileTab] = useState<'overView' | 'personal' | 'service'>('overView');
    const { data: singleMember, isLoading } = GetSingleMember(memberId)
    const appointmentIdOfMember = getQuery('detail')
    const { mutate } = DeleteMember();
    const router = useRouter();
    const handleClose = () => {
        deleteQuery({ key: 'member-drawer' })
        deleteQuery({ key: 'detail' })
    }

    const deleteMember = (id: string) => {
        mutate({ id })
    };


    return (
        <>
            {singleMember && (
                <Modal onClose={handleClose}>
                    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
                        <div className=" w-full md:w-64 bg-white p-6 border-r">
                            <div className="flex items-center space-x-4 mb-6 w-full ">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={singleMember?.profilePictureUrl} alt={singleMember?.firstName} />
                                    <AvatarFallback>{singleMember?.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold">{`${singleMember?.firstName + ' ' + singleMember?.lastName}`}</h2>
                                    <p className="text-sm text-gray-500">{singleMember.ratingCount > 0 ? (<Badge variant={'outline'}>{singleMember.rating} <Star className=' w-4 h-4 ' /></Badge>) : 'no review'}</p>
                                </div>
                                <div className=' ml-auto ms-auto '>
                                    <AppDropdown trigger={(
                                        <Button className='' variant={'ghost'}>
                                            <MoreVertical className=' w-4 h-4 ' />
                                        </Button>
                                    )}>
                                        <div>
                                            <Link href={`/teammembers/${memberId}/edit`} className=' flex justify-center w-full px-4 items-center h-10 hover:bg-gray-100 rounded-lg '>
                                                <Edit className=" w-4 h-4 " /> Edit
                                            </Link>
                                            <ConfirmDialog onConfirm={() => deleteMember(String(memberId))} title='Delete Team Member?' description='Data of ths member in everywhere will also be deleted.'>
                                                <Button disabled={singleMember.role == 'organization'} variant="ghost" className=' text-delete w-full'>
                                                    <Trash className=" w-4 h-4 " /> Delete
                                                </Button>
                                            </ConfirmDialog>
                                        </div>

                                    </AppDropdown>
                                </div>
                            </div>
                            <nav className="gap-2 flex flex-row md:flex-col">
                                <Button type="button" onClick={() => setProfileTab('overView')} variant={profileTab == 'overView' ? 'default' : 'ghost'} className={`w-full justify-start`}>Overview</Button>
                                <Button type="button" onClick={() => setProfileTab('personal')} variant={profileTab == 'personal' ? 'default' : 'ghost'} className={`w-full justify-start`}>Personal</Button>
                                <Button type="button" onClick={() => setProfileTab('service')} variant={profileTab == 'service' ? 'default' : 'ghost'} className={`w-full justify-start`}>Services</Button>
                            </nav>
                        </div>

                        {
                            profileTab == 'overView' && <OverViewData />
                        }
                        {
                            profileTab == 'personal' && <PersonalData member={singleMember} />
                        }
                        {
                            profileTab == 'service' && <MemberService services={singleMember.services} />
                        }
                    </div>
                    {/* image viewer  */}
                </Modal>
            )}
        </>
    )
}