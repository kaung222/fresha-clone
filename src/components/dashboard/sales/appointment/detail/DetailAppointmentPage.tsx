'use client'
import { CancelAppointment } from '@/api/appointment/cancel-appointment'
import { CompleteAppointment } from '@/api/appointment/complete-appointment'
import { ConfirmAppointment } from '@/api/appointment/confirm-appointment'
import { DeleteAppointment } from '@/api/appointment/delete-appointment'
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment'
import AppDropdown from '@/components/common/DropDown'
import IconMark from '@/components/icons/IconMark'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { secondToHour, shortName } from '@/lib/utils'
import { Member } from '@/types/member'
import { Service } from '@/types/service'
import { format } from 'date-fns'
import { ChevronDown, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    detailAppointmentId: string;
    allMembers: Member[]
}

const DetailAppointmentPage = ({ detailAppointmentId, allMembers }: Props) => {
    const { deleteQuery, setQuery } = useSetUrlParams();
    const { data: singleAppointment } = GetSingleAppointment(detailAppointmentId);
    const { mutate: confirm } = ConfirmAppointment();
    const { mutate: cancel } = CancelAppointment();
    const router = useRouter();
    const { mutate: deleteAppointment } = DeleteAppointment();
    const { mutate: complete } = CompleteAppointment();
    const handleClose = () => {
        deleteQuery({ key: 'detail' })
    };


    const getAppointmentMember = (memberId: number) => {
        return allMembers.find((member) => member.id == memberId)
    }

    const appointmentConfirm = (id: string) => {
        confirm({ id })
    }
    const appointmentCancel = (id: string) => {
        cancel({ id })
    }
    const appointmentDelete = (id: string) => {
        deleteAppointment({ id }, {
            onSuccess() {
                handleClose()
            }
        })
    }

    const appointmentComplete = (id: string) => {
        complete({ id })
    }

    const allStatus = [
        {
            name: 'pending',
            action: (id: string) => { }
        },
        {
            name: 'confirmed',
            action: appointmentConfirm
        },
        {
            name: 'cancelled',
            action: appointmentCancel
        },
        // {
        //     name: 'completed',
        //     action: appointmentComplete
        // }
    ]

    const totalDuration = (services: Service[]) => {
        const totalSecond = services.reduce((pv, cv) => pv + Number(cv.duration), 0)
        return secondToHour(totalSecond, 'duration')
    }
    const totalPrice = (services: Service[]) => {
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.price), 0)
        return totalPrice
    }

    const handleToEditAppointment = (appointmentId: string) => {
        if (singleAppointment) {
            deleteQuery({ key: 'detail' })
            router.push(`/sales/appointments/${appointmentId}/edit`)
        }
    }

    return (
        <>
            <Modal onClose={handleClose}>
                {singleAppointment && (
                    <div className=" flex w-full h-screen relative  bg-gray-100 lg:w-[500px] overflow-x-hidden ">
                        <div className=" w-full bg-white h-full flex flex-col">
                            <div className=" p-8 py-3 bg-blue-600 text-white flex justify-between items-center ">
                                <div className=" flex items-center gap-2 ">
                                    <Avatar className=' size-16 text-black '>
                                        <AvatarImage src={getAppointmentMember(singleAppointment.memberId)?.profilePictureUrl} alt={shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className=" font-semibold ">{format(new Date(singleAppointment.date), 'EEE dd LLL')}</h1>
                                        {/* <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={currentTime} /> */}
                                        <p className=' text-white '>{secondToHour(singleAppointment.startTime, 'duration')}</p>
                                    </div>
                                </div>
                                <div>
                                    <AppDropdown trigger={(
                                        <span className=' flex items-center px-4 py-2 rounded-lg border border-white'>
                                            <span>{singleAppointment.status}</span>
                                            <ChevronDown className=' size-4 ' />
                                        </span>
                                    )}>
                                        <div className='flex flex-col gap-1 w-[140px] '>
                                            {allStatus.map((status, index) => (
                                                <Button key={index} onClick={() => status.action(singleAppointment.id.toString())} variant={'ghost'} className=' w-full flex justify-between '>
                                                    <span>{status.name}</span>
                                                    {status.name == singleAppointment.status && (
                                                        <IconMark className=' size-5 stroke-green-600 ' />
                                                    )}
                                                </Button>
                                            ))}
                                        </div>
                                    </AppDropdown>
                                </div>
                            </div>
                            <hr />
                            <div className=' flex-grow overflow-y-auto space-y-4 p-8 ' >
                                <h1 className=' font-bold text-zinc-900 '>Client</h1>
                                <Button variant="ghost" className="w-full relative group flex items-center gap-4 justify-start h-24 px-8 py-4">
                                    <Avatar className="h-16 w-16 ">
                                        <AvatarImage src={singleAppointment.client?.profilePicture} alt={shortName(singleAppointment.client?.firstName)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(singleAppointment.client?.firstName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <div className=' font-semibold
                                         '>{singleAppointment.client?.firstName} {singleAppointment.client?.lastName}</div>
                                        <div className=" font-text text-gray-500">{singleAppointment.client?.email}</div>
                                    </div>
                                </Button>


                                <div>
                                    <h1 className=' font-bold text-zinc-900 '>Notes</h1>
                                    <p className=' font-medium text-sm '>{singleAppointment.notes}</p>
                                </div>

                                <div className=' space-y-2 '>
                                    <h1 className=' font-bold text-zinc-900 '>Services</h1>
                                    {singleAppointment.services?.map((service) => (

                                        <Card key={service.id} className="  ">
                                            <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                                <div>
                                                    <h3 className="font-medium">{service.name}</h3>
                                                    <p className="text-sm text-gray-500">{secondToHour(service.duration, 'duration')}</p>
                                                </div>
                                                <div className="text-right ">
                                                    <p>{service.price.toLocaleString()} <span className=' font-medium text-xs '>MMK</span> </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>


                            </div>
                            <div className=" mt-auto border-t px-8 py-3 space-y-2 ">

                                <div className="flex justify-between items-center mb-2">
                                    <div className=" flex flex-col ">
                                        <span className=' text-xs font-medium '>
                                            {singleAppointment.services.length} services
                                        </span>
                                        <span className=' text-sm font-semibold '>{totalDuration(singleAppointment.services)}</span>
                                    </div>
                                    <div>{totalPrice(singleAppointment.services)} MMK</div>
                                </div>
                                <div className="">
                                    <div className="flex gap-2 flex-grow">
                                        <Button variant="outline" className=" flex-1 " onClick={() => handleClose()} >Close</Button>
                                        <Button onClick={() => handleToEditAppointment(singleAppointment.id.toString())} className=" flex-1 ">
                                            Edit appointment
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

export default DetailAppointmentPage