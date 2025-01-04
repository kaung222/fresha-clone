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
import { CalendarDays, CheckCircle, CheckCircle2, ChevronDown, Clock, Mail, MessageSquare, MoreVertical, Pencil, Phone, Trash, X } from 'lucide-react'
import React, { useState } from 'react'
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'
import { useRouter } from 'next/navigation'
import { anyMember } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AppDropdown from '@/components/common/DropDown'
import ConfirmDialog from '@/components/common/confirm-dialog'
import CancelAppointmentDialog from '../cancel-appointment/CancelAppointmentDialog'
import CircleLoading from '@/components/layout/circle-loading'



type Props = {
    detailAppointmentId: string;
    allMembers: MemberForAll[];
    page?: 'calendar' | 'table'
}

const DetailAppointment = ({ detailAppointmentId, allMembers, page = 'calendar' }: Props) => {
    const { deleteQuery, setQuery } = useSetUrlParams();
    const { data: singleAppointment, isLoading } = GetSingleAppointment(detailAppointmentId);
    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const { mutate: confirm } = ConfirmAppointment()
    const { mutate: cancel } = CancelAppointment()
    const { mutate: deleteAppointment } = DeleteAppointment();
    const [showStatusEdit, setShowStatusEdit] = useState(false)
    const router = useRouter()
    const handleClose = () => {
        deleteQuery({ key: 'detail' })
    };

    const getAppointmentMember = (memberId: string) => {
        return allMembers.find((member) => member.id == memberId)
    }

    const appointmentConfirm = (id: string) => {
        confirm({ id }, {
            onSuccess() {
                setShowStatusEdit(false)
            }
        })
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


    const isMemberProvideService = (members: MemberForAll, serviceId: string) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center ">
                        <CircleLoading />
                    </div>
                ) : singleAppointment && (
                    <div className=" flex w-full h-screen relative  bg-gray-100  overflow-x-hidden ">
                        <Button variant={"brandOutline"} onClick={handleClose} className=' size-8 px-2 bg-white hover:bg-pink-100 block lg:hidden rounded-full absolute top-1 right-1 '>
                            <X className=' w-4 h-4 ' />
                        </Button>
                        <div className=" w-full h-full flex flex-col">
                            <div className=" px-3 md:px-8 py-6 border-b">
                                <div className=' w-full flex justify-between items-center '>
                                    <div className="text-2xl font-bold">Appointment Details</div>
                                    <AppDropdown trigger={(
                                        <Button variant={"brandGhost"} className="focus-visible:ring-offset-0 focus:border-none focus-visible:ring-0">
                                            <MoreVertical className='  w-6 h-6' />
                                        </Button>
                                    )}>
                                        <div className=" flex flex-col w-[120px]">
                                            <Button disabled={singleAppointment.status == "completed"} variant={'brandGhost'} onClick={() => handleToEditAppointment()} className=" flex justify-start items-center ">
                                                <Pencil className=" w-4 h-4 mr-2 " />
                                                Edit
                                            </Button>
                                            <Button disabled={singleAppointment.status == "completed"} variant={'brandGhost'} onClick={() => setShowStatusEdit(true)} className=" flex justify-start items-center ">
                                                <Pencil className=" w-4 h-4 mr-2 flex-shrink-0 " />
                                                Edit Status
                                            </Button>
                                            <ConfirmDialog title='Are you sure to delete this appointment?' description='This action cannot be undone' onConfirm={() => appointmentDelete(singleAppointment.id)}>
                                                <Button variant={'brandGhost'} onClick={() => handleToEditAppointment()} className=" text-delete flex justify-start items-start ">
                                                    <Trash className=" w-4 h-4 mr-2 " />
                                                    Delete
                                                </Button>
                                            </ConfirmDialog>
                                        </div>
                                    </AppDropdown>
                                    {/* {singleAppointment.status == "completed" ? (
                                        <Badge className={` bg-[#111827] text-white px-3 py-1 text-sm uppercase`}>
                                            {singleAppointment.status}
                                        </Badge>
                                    ) : (
                                        <Button variant={'brandGhost'} onClick={() => handleToEditAppointment()} className=" ">
                                            <Pencil className=" w-4 h-4 " />
                                            Edit
                                        </Button>
                                    )} */}
                                </div>
                                {(singleAppointment.status == 'pending' || showStatusEdit) && (
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <CancelAppointmentDialog setShowStatusEdit={setShowStatusEdit} appointmentId={singleAppointment.id} trigger={(
                                            <Button
                                                variant="outline"
                                                className="w-full bg-red-500 text-white hover:bg-red-500/90"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Cancel
                                            </Button>
                                        )} />
                                        <Button
                                            variant="outline"
                                            className="w-full bg-green-500 text-white hover:bg-green-500/90"
                                            onClick={() => appointmentConfirm(singleAppointment.id)}
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Confirm
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <ScrollArea className="flex-grow px-3 md:px-8">
                                <div className="p-6 space-y-6">
                                    {/* Date, Time, and Status */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-lg font-medium">
                                                <CalendarDays className="h-5 w-5 text-gray-500" />
                                                {format(new Date(singleAppointment.date), 'EEEE, MMMM d, yyyy')}
                                            </div>
                                            <div className="flex items-center gap-2 text-2xl font-bold mt-1">
                                                <Clock className="h-6 w-6 text-gray-500" />
                                                {secondToHour(singleAppointment.startTime, "duration")}
                                            </div>
                                        </div>
                                        <Badge style={{ backgroundColor: `${colorOfStatus(singleAppointment.status)}` }} className={` text-white px-3 py-1 text-sm uppercase`}>
                                            {singleAppointment.status}
                                        </Badge>
                                    </div>

                                    <Separator />

                                    {/* Client Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={singleAppointment.profilePicture} />
                                                <AvatarFallback className="bg-[#FF66A1] text-white text-xl">
                                                    {shortName(singleAppointment.username)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-2">
                                                <p className="font-medium text-lg">{singleAppointment.username}</p>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    {singleAppointment.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    {singleAppointment.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Services */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                                        <div className="space-y-4">
                                            {singleAppointment.bookingItems?.map((item) => (
                                                <div key={item.id}>
                                                    {item.service ? (
                                                        <ServiceCard key={item.id} service={item.service} memberComponent={(
                                                            <div className=" px-1 py-1 border rounded-[18px] w-[150px] h-9 ">
                                                                <div className="w-full flex items-center gap-2 justify-start h-7">
                                                                    <Avatar className="h-7 w-7 ">
                                                                        <AvatarImage src={item.member?.profilePictureUrl} alt={shortName(item.member?.firstName)} className=' object-cover ' />
                                                                        <AvatarFallback className=' bg-brandColorLight/80 '>{shortName(item.member?.firstName)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span className=' font-medium text-sm'>{item.member?.firstName}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                            notProvided={!isMemberProvideService(item.member || anyMember, item.service.id)}
                                                        />
                                                    ) : (
                                                        <div>Service is deleted!</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Notes */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Notes</h3>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-start">
                                                    <MessageSquare className="h-5 w-5 mr-2 mt-1 text-gray-500" />
                                                    <p className="text-gray-700">
                                                        {singleAppointment.notes || "No notes provided for this appointment."}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </ScrollArea>

                            {/* Footer */}
                            <div className="border-t px-3 md:px-8 py-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Duration</p>
                                        <p className="font-medium text-lg">{secondToHour(singleAppointment.totalTime, "duration")}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-2xl font-bold text-[#FF66A1]">{singleAppointment.discountPrice} MMK</p>
                                    </div>
                                </div>
                                {singleAppointment.status == "completed" ? (
                                    <Button
                                        className="w-full bg-[#111827] hover:bg-[#111827]/90 text-white"
                                        onClick={handleClose}
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Close
                                    </Button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleClose}
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Close
                                        </Button>
                                        <Button
                                            className="w-full bg-[#FF66A1] hover:bg-[#FF4D91]"
                                            onClick={() => handleToCheckoutAppointment()}
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Checkout & Pay
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default DetailAppointment


// <div className=" w-full bg-white h-full flex flex-col">
//                             <div style={{ background: `${colorOfStatus(singleAppointment.status)}` }} className=" px-3 md:px-8 py-3 text-white flex justify-between items-center ">
//                                 <div className=" flex items-center gap-2 ">
//                                     {/* <Avatar className=' size-16 text-black '>
//                                         <AvatarImage src={getAppointmentMember(singleAppointment.memberId)?.profilePictureUrl} alt={shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)} className=' object-cover ' />
//                                         <AvatarFallback>{shortName(getAppointmentMember(singleAppointment.memberId)?.firstName)}</AvatarFallback>
//                                     </Avatar> */}
//                                     <div>
//                                         <h1 className=" font-semibold ">{format(new Date(singleAppointment.date), 'EEE dd LLL')}</h1>
//                                         {/* <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={currentTime} /> */}
//                                         <p className=' text-white '>{secondToHour(singleAppointment.startTime)}</p>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     {singleAppointment.status == 'completed' ? (
//                                         <span className=' flex items-center px-4 py-2 rounded-lg border bg-white text-zinc-900 border-white'>
//                                             <span className=' capitalize '>{singleAppointment.status}</span>
//                                         </span>
//                                     ) : (
//                                         <ControllableDropdown open={openStatus} setOpen={setOpenStatus} zIndex={55} trigger={(
//                                             <span className='  flex items-center px-4 py-2 rounded-lg border border-white'>
//                                                 <span className=' capitalize '>{singleAppointment.status}</span>
//                                                 <ChevronDown className=' size-4 ' />
//                                             </span>
//                                         )}>
//                                             <div className='flex flex-col gap-1 w-[140px] '>
//                                                 {appointmentStatus.map((status, index) => (
//                                                     <Button key={index} onClick={() => status.action(singleAppointment.id.toString())} variant={'ghost'} className=' w-full flex justify-between '>
//                                                         <span className=' capitalize'>{status.name}</span>
//                                                         {status.name == singleAppointment.status && (
//                                                             <IconMark className=' size-5 stroke-green-600 ' />
//                                                         )}
//                                                     </Button>
//                                                 ))}
//                                                 <span key={"cancel"}>
//                                                     <CancelAppointmentDialog appointmentId={singleAppointment.id}>
//                                                         <span className=' w-full flex justify-between px-4 py-2 rounded-lg hover:bg-gray-100 '>
//                                                             <span className=' capitalize text-sm '>cancelled</span>
//                                                             {'cancelled' == singleAppointment.status && (
//                                                                 <IconMark className=' size-5 stroke-green-600 ' />
//                                                             )}
//                                                         </span>
//                                                     </CancelAppointmentDialog>
//                                                 </span>
//                                             </div>
//                                         </ControllableDropdown>
//                                     )}
//                                 </div>
//                             </div>
//                             <ScrollArea className=' flex-grow  space-y-4 px-3 md:px-8 mt-0 pt-3  ' >

//                                 <Card>
//                                     <h1 className=' font-bold text-zinc-900 '>Client</h1>
//                                     <div className=" relative group flex items-center gap-4 justify-start h-24 px-8 py-4 mb-5">
//                                         <Avatar className="h-16 w-16 ">
//                                             <AvatarImage src={singleAppointment.username} alt={shortName(singleAppointment.username)} className=' object-cover ' />
//                                             <AvatarFallback>{shortName(singleAppointment.username)}</AvatarFallback>
//                                         </Avatar>
//                                         <div className="text-left">
//                                             <div className=' font-semibold
//                                          '>{singleAppointment.username}</div>
//                                             <div className=" font-text text-gray-500">{singleAppointment.email}</div>
//                                         </div>
//                                     </div>
//                                 </Card>


//                                 <Card className=' space-y-2 mb-10 '>
//                                     <h1 className=' font-bold text-zinc-900 '>Services</h1>
//                                     {singleAppointment.bookingItems?.map((item) => (
//                                         <div key={item.id}>
//                                             {item.service ? (
//                                                 <ServiceCard key={item.id} service={item.service} memberComponent={(
//                                                     <div className=" px-1 py-1 border rounded-[18px] h-9 ">
//                                                         <div className="w-full flex items-center gap-2 justify-start h-7">
//                                                             <Avatar className="h-7 w-7 ">
//                                                                 <AvatarImage src={item.member?.profilePictureUrl} alt={shortName(item.member?.firstName)} className=' object-cover ' />
//                                                                 <AvatarFallback className=' bg-brandColorLight/80 '>{shortName(item.member?.firstName)}</AvatarFallback>
//                                                             </Avatar>
//                                                             <span className=' font-medium text-sm'>{item.member?.firstName}</span>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                     notProvided={!isMemberProvideService(item.member || anyMember, item.service.id)}
//                                                 />
//                                             ) : (
//                                                 <div>Service is deleted!</div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </Card>

//                                 <Card className=" mb-20 ">
//                                     <h1 className=' font-bold text-zinc-900 '>Notes</h1>
//                                     <p className=' font-medium text-sm '>{singleAppointment.notes ? singleAppointment.notes : "no notes"}</p>
//                                 </Card>

//                             </ScrollArea>
//                             <div className=" mt-auto shadow-dialog px-3 md:px-8 py-3 space-y-2 ">
//                                 <div className="flex justify-between items-center mb-2">
//                                     <div className=" flex flex-col ">
//                                         <span className=' text-xs font-medium '>
//                                             {singleAppointment.bookingItems?.length} services
//                                         </span>
//                                         <span className=' text-sm font-semibold '>{secondToHour(singleAppointment.totalTime, "duration")}</span>
//                                     </div>
//                                     <div className=' font-semibold '>{singleAppointment.totalPrice} MMK</div>
//                                 </div>
//                                 <div className="">
//                                     <div className="flex gap-2 flex-grow">
//                                         {singleAppointment.status == "completed" ? (

//                                             <Button variant="brandOutline" className="  " onClick={() => handleClose()} >Close</Button>
//                                         ) : (
//                                             <Button variant={'brandOutline'} onClick={() => handleToEditAppointment()} className=" flex-1 ">
//                                                 <Pencil className=" w-4 h-4 " />
//                                                 Edit
//                                             </Button>
//                                         )}
//                                         {singleAppointment.status == 'completed' ? (
//                                             <Button className=" flex-1 ">View in Sale List</Button>
//                                         ) : (
//                                             <Button onClick={() => handleToCheckoutAppointment()} variant={'brandDefault'} className=" flex-1 ">
//                                                 Checkout & Pay
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>