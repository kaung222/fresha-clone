'use client'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/navigation'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, MoreHorizontal, MoreVertical, Star, Trash, X } from 'lucide-react'
import AppDropdown from '@/components/common/DropDown'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { DeleteMember } from '@/api/member/delete-member'
import Link from 'next/link'
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import ServiceOverView from './drawer-components/OverView'
import ServiceDetail from './drawer-components/Profile'
import MembersOfServices from './drawer-components/MemberService'
import { GetSingleServiceById } from '@/api/services/get-single-service'
import { shortName } from '@/lib/utils'
import { DeleteService } from '@/api/services/delete-service'
import Image from 'next/image'


type Props = {
    serviceId: string;
}

export default function ServiceDetailDrawer({ serviceId }: Props) {
    const [timeFrame, setTimeFrame] = useState('Last 7 days');
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams();
    const [profileTab, setProfileTab] = useState<'overView' | 'detail' | 'members'>('overView');
    const { data: singleService, isLoading } = GetSingleServiceById(serviceId)
    const { mutate } = DeleteService();
    const router = useRouter();
    const handleClose = () => {
        deleteQuery({ key: 'service-detail' })
        // deleteQuery({ key: 'detail' })
    }

    const deleteService = (id: string) => {
        mutate({ id })
    };


    return (
        <>
            {singleService && (
                <Modal onClose={handleClose}>
                    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
                        <Button className=' absolute top-1 right-1 hidden md:block lg:hidden rounded-full ' onClick={handleClose} variant={'brandGhost'}>
                            <X className=' size-5' />
                        </Button>
                        <div className=" w-full md:w-64 flex-shrink-0 bg-white p-3 md:p-6 border-r relative">
                            <Button className=' absolute top-1 right-1 rounded-full block md:hidden ' onClick={handleClose} variant={'brandGhost'}>
                                <X className=' size-5' />
                            </Button>
                            <div className="flex items-center flex-row md:flex-col space-x-4 mb-6 w-full ">
                                <div className=" w-20 md:w-full h-20 md:h-40 overflow-hidden flex-shrink-0 ">
                                    {singleService.thumbnailUrl ? (
                                        <PhotoView src={singleService?.thumbnailUrl}>
                                            <Image
                                                src={singleService.thumbnailUrl}
                                                alt={shortName(singleService.name)}
                                                width={500}
                                                height={300}
                                                className=' object-cover bg-brandColorLight/40 w-full h-full object-center '
                                            />
                                        </PhotoView>
                                    ) : (
                                        <Image
                                            src={singleService.thumbnailUrl || ''}
                                            alt={shortName(singleService.name)}
                                            width={500}
                                            height={300}
                                            className=' object-cover bg-brandColorLight/40 '
                                        />
                                    )}
                                </div>
                                <div className=' flex items-center w-full justify-between '>
                                    <div>
                                        <h2 className="font-semibold">{`${singleService.name}`}</h2>
                                        <p className="text-sm text-gray-500"><Badge variant={'outline'}>For {singleService.targetGender}</Badge></p>
                                    </div>
                                    <div className=' ml-auto ms-auto justify-self-end '>
                                        <AppDropdown trigger={(
                                            <Button variant={'brandGhost'} className=" px-2 ">
                                                <MoreVertical className=' w-4 h-4 ' />
                                            </Button>
                                        )}>
                                            <div className=''>
                                                <Link href={`/services/${serviceId}/edit`} className=' flex justify-start w-full text-sm px-4 items-center h-10 hover:bg-gray-100 rounded-lg '>
                                                    <Edit className=" w-4 h-4 " /> Edit
                                                </Link>
                                                <ConfirmDialog onConfirm={() => deleteService(String(serviceId))} title='Delete Team Member?' description='Data of ths member in everywhere will also be deleted.'>
                                                    <Button variant="ghost" className=' text-delete w-full flex items-center justify-start'>
                                                        <Trash className=" w-4 h-4 " /> Delete
                                                    </Button>
                                                </ConfirmDialog>
                                            </div>

                                        </AppDropdown>
                                    </div>
                                </div>
                            </div>
                            <nav className="gap-2 flex flex-row md:flex-col">
                                <Button type="button" onClick={() => setProfileTab('overView')} variant={profileTab == 'overView' ? 'brandDefault' : 'brandGhost'} className={`w-full justify-start`}>Overview</Button>
                                <Button type="button" onClick={() => setProfileTab('detail')} variant={profileTab == 'detail' ? 'brandDefault' : 'brandGhost'} className={`w-full justify-start`}>Detail</Button>
                                <Button type="button" onClick={() => setProfileTab('members')} variant={profileTab == 'members' ? 'brandDefault' : 'brandGhost'} className={`w-full justify-start`}>Members</Button>
                            </nav>
                        </div>

                        {
                            profileTab == 'overView' && <ServiceOverView />
                        }
                        {
                            profileTab == 'detail' && <ServiceDetail service={singleService} />
                        }
                        {
                            profileTab == 'members' && <MembersOfServices members={singleService.members} />
                        }
                    </div>
                    {/* image viewer  */}
                </Modal>
            )}
        </>
    )
}