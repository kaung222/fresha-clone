'use client'
import { CancelAppointment } from '@/api/appointment/cancel-appointment'
import { ConfirmAppointment } from '@/api/appointment/confirm-appointment'
import { DeleteAppointment } from '@/api/appointment/delete-appointment'
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment'
import IconMark from '@/components/icons/IconMark'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { colorOfStatus, secondToHour, shortName } from '@/lib/utils'
import { Member, MemberForAll } from '@/types/member'
import { Service } from '@/types/service'
import { format } from 'date-fns'
import { ChevronDown, Trash } from 'lucide-react'
import React, { useState } from 'react'
import CancelAppointmentDialog from '../cancel-appointment/CancelAppointmentDialog'
import ControllableDropdown from '@/components/common/control-dropdown'
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'
import { useRouter } from 'next/navigation'



type Props = {
    detailAppointmentId: string;
    allMembers: MemberForAll[];
    page?: 'calendar' | 'table'
}

const DetailAppointment = ({ detailAppointmentId, allMembers, page = 'calendar' }: Props) => {
    const { deleteQuery, setQuery } = useSetUrlParams();
    const { data: singleAppointment } = GetSingleAppointment(detailAppointmentId);
    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const { mutate: confirm } = ConfirmAppointment()
    const { mutate: cancel } = CancelAppointment()
    const { mutate: deleteAppointment } = DeleteAppointment();
    const router = useRouter()
    const handleClose = () => {
        deleteQuery({ key: 'detail' })
    };

    const getAppointmentMember = (memberId: number) => {
        return allMembers.find((member) => member.id == memberId)
    }

    const appointmentConfirm = (id: string) => {
        confirm({ id })
    }
    const appointmentDelete = (id: string) => {
        deleteAppointment({ id }, {
            onSuccess() {
                handleClose()
            }
        })
    }

    const appointmentStatus = [
        {
            name: 'pending',
            action: (id: string) => { }
        },
        {
            name: 'confirmed',
            action: appointmentConfirm
        }
    ]

    const totalDuration = (services: Service[]) => {
        const totalSecond = services.reduce((pv, cv) => pv + Number(cv.duration), 0)
        return secondToHour(totalSecond, 'duration')
    }
    const totalPrice = (services: Service[]) => {
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.discountPrice), 0)
        return totalPrice
    }

    const handleToEditAppointment = () => {
        if (singleAppointment) {
            deleteQuery({ key: 'detail' })
            if (page == 'calendar') {
                setQuery({ key: 'appointment-detail', value: singleAppointment?.id.toString() })
            } else {
                router.push(`/sales/appointments/${detailAppointmentId}/edit`)
            }

        }
    }
    const handleToCheckoutAppointment = () => {
        if (singleAppointment) {
            deleteQuery({ key: 'detail' })
            setQuery({ key: 'checkout', value: singleAppointment?.id.toString() })
        }
    }

    const isMemberProvideService = (members: MemberForAll, serviceId: number) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                {singleAppointment && (
                    <div className=" flex w-full h-screen relative  bg-gray-100  overflow-x-hidden ">
                        <div className=" w-full bg-white h-full flex flex-col">
                            <div style={{ background: `${colorOfStatus(singleAppointment.status)}` }} className=" p-8 py-3 text-white flex justify-between items-center ">
                                <div className=" flex items-center gap-2 ">
                                    {/* <Avatar className=' size-16 text-black '>
                                        <AvatarImage src={getAppointmentMember(singleAppointment.memberId)?.profilePictureUrl} alt={shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)}</AvatarFallback>
                                    </Avatar> */}
                                    <div>
                                        <h1 className=" font-semibold ">{format(new Date(singleAppointment.date), 'EEE dd LLL')}</h1>
                                        {/* <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={currentTime} /> */}
                                        <p className=' text-white '>{secondToHour(singleAppointment.startTime, 'duration')}</p>
                                    </div>
                                </div>
                                <div>
                                    {singleAppointment.status == 'completed' ? (
                                        <span className=' flex items-center px-4 py-2 rounded-lg border bg-white text-zinc-900 border-white'>
                                            <span className=' capitalize '>{singleAppointment.status}</span>
                                        </span>
                                    ) : (
                                        <ControllableDropdown open={openStatus} setOpen={setOpenStatus} zIndex={55} trigger={(
                                            <span className=' flex items-center px-4 py-2 rounded-lg border border-white'>
                                                <span className=' capitalize '>{singleAppointment.status}</span>
                                                <ChevronDown className=' size-4 ' />
                                            </span>
                                        )}>
                                            <div className='flex flex-col gap-1 w-[140px] '>
                                                {appointmentStatus.map((status, index) => (
                                                    <Button key={index} onClick={() => status.action(singleAppointment.id.toString())} variant={'ghost'} className=' w-full flex justify-between '>
                                                        <span className=' capitalize'>{status.name}</span>
                                                        {status.name == singleAppointment.status && (
                                                            <IconMark className=' size-5 stroke-green-600 ' />
                                                        )}
                                                    </Button>
                                                ))}
                                                <span key={"cancel"}>
                                                    <CancelAppointmentDialog appointmentId={singleAppointment.id}>
                                                        <span className=' w-full flex justify-between px-4 py-2 rounded-lg hover:bg-gray-100 '>
                                                            <span className=' capitalize text-sm '>cancelled</span>
                                                            {'cancelled' == singleAppointment.status && (
                                                                <IconMark className=' size-5 stroke-green-600 ' />
                                                            )}
                                                        </span>
                                                    </CancelAppointmentDialog>
                                                </span>
                                            </div>
                                        </ControllableDropdown>
                                    )}
                                </div>
                            </div>
                            <ScrollArea className=' flex-grow  space-y-4 px-8 ' >
                                <h1 className=' font-bold text-zinc-900 '>Client</h1>
                                <Button variant="ghost" className=" relative group flex items-center gap-4 justify-start h-24 px-8 py-4">
                                    <Avatar className="h-16 w-16 ">
                                        <AvatarImage src={singleAppointment.username} alt={shortName(singleAppointment.username)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(singleAppointment.username)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <div className=' font-semibold
                                         '>{singleAppointment.username}</div>
                                        <div className=" font-text text-gray-500">{singleAppointment.email}</div>
                                    </div>
                                </Button>


                                <div className=" mb-4 ">
                                    <h1 className=' font-bold text-zinc-900 '>Notes</h1>
                                    <p className=' font-medium text-sm '>{singleAppointment.notes ? singleAppointment.notes : "no notes"}</p>
                                </div>

                                <div className=' space-y-2 '>
                                    <h1 className=' font-bold text-zinc-900 '>Services</h1>
                                    {singleAppointment.bookingItems?.map((item) => (

                                        <ServiceCard key={item.id} service={item.service} memberComponent={(
                                            <div className=" px-1 py-1 border rounded-[18px] h-9 ">
                                                <div className="w-full flex items-center gap-2 justify-start h-7">
                                                    <Avatar className="h-7 w-7 ">
                                                        <AvatarImage src={item.member?.profilePictureUrl} alt={shortName(item.member?.firstName)} className=' object-cover ' />
                                                        <AvatarFallback>{shortName(item.member?.firstName)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className=' font-medium text-sm'>{item.member?.firstName}</span>
                                                </div>
                                            </div>
                                        )}
                                            //@ts-ignore
                                            notProvided={!isMemberProvideService(item.member, item.service.id)}
                                        />
                                    ))}
                                </div>

                            </ScrollArea>
                            <div className=" mt-auto border-t px-8 py-3 space-y-2 ">

                                <div className="flex justify-between items-center mb-2">
                                    <div className=" flex flex-col ">
                                        <span className=' text-xs font-medium '>
                                            {singleAppointment.bookingItems?.length} services
                                        </span>
                                        <span className=' text-sm font-semibold '>{totalDuration(singleAppointment.bookingItems?.flatMap(e => e.service))}</span>
                                    </div>
                                    <div>{totalPrice(singleAppointment.bookingItems?.flatMap(e => e.service))} MMK</div>
                                </div>
                                <div className="">
                                    <div className="flex gap-2 flex-grow">
                                        {/* <Button variant="outline" className=" flex-1 " onClick={() => handleClose()} >Close</Button> */}
                                        <Button disabled={singleAppointment.status == 'completed'} onClick={() => handleToEditAppointment()} className=" flex-1 ">
                                            Edit appointment
                                        </Button>
                                        <Button disabled={singleAppointment.status != 'confirmed'} onClick={() => handleToCheckoutAppointment()} className=" flex-1 ">
                                            Checkout & Pay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default DetailAppointment