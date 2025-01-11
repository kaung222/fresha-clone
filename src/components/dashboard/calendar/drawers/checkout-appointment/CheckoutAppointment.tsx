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
import { ScrollArea } from '@/components/ui/scroll-area'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { colorOfStatus, secondToHour, shortName } from '@/lib/utils'
import { Member, MemberForAll } from '@/types/member'
import { Service } from '@/types/service'
import { format } from 'date-fns'
import { ArrowRight, CheckCircle2, ChevronDown, Clock, DollarSign, Mail, Trash, X } from 'lucide-react'
import React, { useState } from 'react'
import CancelAppointmentDialog from '../cancel-appointment/CancelAppointmentDialog'
import ControllableDropdown from '@/components/common/control-dropdown'
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'
import { Appointment } from '@/types/appointment'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormRadio from '@/components/common/FormRadio'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckoutSchema } from '@/validation-schema/checkout.schema'
import { z } from 'zod'
import { anyMember } from '@/lib/data'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'



type Props = {
    appointmentId: string;
    allMembers: MemberForAll[];
    singleAppointment: Appointment
}

const CheckoutAppointmentDrawer = ({ appointmentId, allMembers, singleAppointment }: Props) => {
    const { deleteQuery, setQuery } = useSetUrlParams();
    const { mutate: complete } = CompleteAppointment();
    const [paymentMethod, setPaymentMethod] = useState('Cash')
    const [paymentNotes, setPaymentNotes] = useState('');
    const { data: organization } = GetOrganizationProfile()


    const getAppointmentMember = (memberId: string) => {
        return allMembers.find((member) => member.id == memberId)
    }


    const handleClose = () => {
        deleteQuery({ key: 'checkout' })
    };


    const appointmentComplete = () => {
        if (!paymentMethod) {
            return toast({ title: "Add a payment method", variant: "destructive" })
        }
        complete({
            appointmentId: appointmentId,
            paymentMethod: paymentMethod,
            notes: paymentNotes,
        }, {
            onSuccess() {
                handleClose()
            }
        })
    }


    const totalDuration = (services: Service[]) => {
        const totalSecond = services.reduce((pv, cv) => pv + Number(cv.duration), 0)
        return secondToHour(totalSecond, 'duration')
    }
    const totalPrice = (services: Service[]) => {
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.discountPrice), 0)
        return totalPrice
    }

    const isMemberProvideService = (members: MemberForAll, serviceId: string) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                {singleAppointment && (
                    <div className=" flex w-full h-screen relative  bg-gray-100  overflow-x-hidden ">
                        <Button variant={"brandOutline"} onClick={handleClose} className=' size-8 px-2 bg-white hover:bg-pink-100 block lg:hidden rounded-full absolute top-1 right-1 '>
                            <X className=' w-4 h-4 ' />
                        </Button>
                        <div className=" w-full bg-white h-full flex flex-col">
                            <div style={{ background: `${colorOfStatus(singleAppointment.status)}` }} className=" px-3 md:px-8 py-3 text-white flex justify-between items-center ">
                                <div className="text-2xl font-bold">Confirm Payment</div>

                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-white/20">
                                        <AvatarImage src={singleAppointment.profilePicture} />
                                        <AvatarFallback className="bg-white/10">
                                            {shortName(singleAppointment.username)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{singleAppointment.username}</h2>
                                        <div className="flex items-center gap-2 text-white/80 mt-1">
                                            <Mail className="h-4 w-4" />
                                            <span className="text-sm">{singleAppointment.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80 mt-1">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">
                                                {format(new Date(singleAppointment.date), "dd MMM yyyy")} at {secondToHour(singleAppointment.startTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <ScrollArea className=' flex-grow px-3 md:px-8  ' >
                                <div className="p-6 space-y-6">
                                    {/* Payment Method */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Payment method</h3>
                                        <RadioGroup
                                            defaultValue="Cash"
                                            onValueChange={setPaymentMethod}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <Label
                                                htmlFor="cash"
                                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-500"
                                            >
                                                <RadioGroupItem value="Cash" id="cash" className="sr-only" />
                                                <DollarSign className="mb-3 h-6 w-6" />
                                                Cash
                                            </Label>
                                            <Label
                                                htmlFor="kbz"
                                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-500"
                                            >
                                                <RadioGroupItem value="KBZ pay" id="kbz" className="sr-only" />
                                                <Image src="/img/kbz.png" alt='kbz' width={500} height={300} className="mb-3 h-6 w-6" />
                                                KBZ Pay
                                            </Label>
                                            <Label
                                                htmlFor="wave"
                                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-500"
                                            >
                                                <RadioGroupItem value="Wave pay" id="wave" className="sr-only" />
                                                <Image src="/img/wave.png" alt='wave' width={500} height={300} className="mb-3 h-6 w-6" />
                                                Wave Pay
                                            </Label>
                                            <Label
                                                htmlFor="aya"
                                                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-500"
                                            >
                                                <RadioGroupItem value="AYA pay" id="aya" className="sr-only" />
                                                <Image src="/img/aya.png" alt='aya' width={500} height={300} className="mb-3 h-6 w-6" />
                                                AYA Pay
                                            </Label>
                                        </RadioGroup>
                                    </div>

                                    {/* Payment Notes */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Notes</h3>
                                        <Textarea
                                            placeholder="Write notes about payment here..."
                                            className="min-h-[100px] resize-none"
                                            value={paymentNotes}
                                            onChange={(e) => setPaymentNotes(e.target.value)}
                                        />
                                    </div>

                                    <Separator />

                                    {/* Appointment Notes */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium">Notes of Appointment</h3>
                                            <Badge variant="outline" className="text-green-500">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                done
                                            </Badge>
                                        </div>
                                        <Card>
                                            <CardContent className="p-4">
                                                <p className="text-sm text-muted-foreground">
                                                    {singleAppointment.notes || "No notes provided"}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Taken Services */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Taken Services</h3>
                                        {singleAppointment.bookingItems?.map((item) => item.service ? (
                                            <ServiceCard key={item.id} service={item.service} memberComponent={(
                                                <div className=" px-1 py-1 border w-[180px] rounded-[18px] h-9 ">
                                                    <div className="w-full flex items-center gap-2 justify-start h-7">
                                                        <Avatar className="h-7 w-7 ">
                                                            <AvatarImage src={item.member?.profilePictureUrl} alt={shortName(item.member?.firstName)} className=' object-cover ' />
                                                            <AvatarFallback>{shortName(item.member?.firstName)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className=' font-medium text-sm'>{item.member?.firstName}</span>
                                                    </div>
                                                </div>
                                            )}
                                                notProvided={!isMemberProvideService(item.member || anyMember, item.service.id)}
                                            />
                                        ) : (
                                            <div key={item.id}>Service is deleted!</div>
                                        ))}
                                    </div>
                                </div>


                            </ScrollArea>
                            <div className=" mt-auto px-3 md:px-8 py-3 space-y-2 shadow-dialog ">
                                <div className="flex justify-between items-center mb-2">
                                    <div className=" flex flex-col ">
                                        <span className=' text-xs font-medium '>
                                            {singleAppointment.bookingItems?.length} services
                                        </span>
                                        <span className=' text-sm font-semibold '>{secondToHour(singleAppointment.totalTime, 'duration')}</span>
                                    </div>
                                    <div className=" font-semibold ">Total: {singleAppointment.discountPrice} {organization?.currency || 'MMK'}</div>
                                </div>

                                <div className="">
                                    <div className="flex gap-2 flex-grow">
                                        <Button type='button' variant="brandOutline" className=" flex-1 " onClick={() => handleClose()} >Close</Button>
                                        <Button disabled={singleAppointment.status == 'completed'} variant={'brandDefault'} type='button' onClick={() => appointmentComplete()} className=" flex-1 ">
                                            {
                                                singleAppointment.status == 'completed' ? "Already Paid" : "Complement Payment"
                                            }
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

export default CheckoutAppointmentDrawer