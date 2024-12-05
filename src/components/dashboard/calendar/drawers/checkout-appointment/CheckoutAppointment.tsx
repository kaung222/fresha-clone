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
import { ArrowRight, ChevronDown, Trash } from 'lucide-react'
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



type Props = {
    appointmentId: string;
    allMembers: MemberForAll[];
    singleAppointment: Appointment
}

const CheckoutAppointmentDrawer = ({ appointmentId, allMembers, singleAppointment }: Props) => {
    const { deleteQuery, setQuery } = useSetUrlParams();
    const { mutate: complete } = CompleteAppointment();
    const defaultCommissionFees = (commissionType: 'percent' | 'fixed', amount: number, total: number) => {
        if (commissionType == 'percent') {
            return (total * (amount / 100)).toFixed(2)
        } else {
            return amount
        }
    }
    const getAppointmentMember = (memberId: number) => {
        return allMembers.find((member) => member.id == memberId)
    }

    const form = useForm({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            paymentMethod: 'Cash',
            notes: '',
        }
    })
    const handleClose = () => {
        deleteQuery({ key: 'checkout' })
    };


    const appointmentComplete = (values: z.infer<typeof CheckoutSchema>) => {
        complete({
            appointmentId: appointmentId,
            paymentMethod: values.paymentMethod,
            notes: values.notes,
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
                                    <Avatar className="h-16 w-16 ">
                                        <AvatarImage src={singleAppointment.profilePicture} alt={shortName(singleAppointment.username)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(singleAppointment.username)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <div className=' font-semibold
                                         '>{singleAppointment?.username}</div>
                                        <div className=" font-text text-white">{singleAppointment?.email}</div>
                                    </div>
                                </div>
                                <div className=" flex items-center gap-2 ">
                                    <div>
                                        <h1 className=" font-semibold ">{format(new Date(singleAppointment.date), 'EEE dd LLL')}</h1>
                                        {/* <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={currentTime} /> */}
                                        <p className=' text-white '>{secondToHour(singleAppointment.startTime, 'duration')}</p>
                                    </div>
                                </div>
                            </div>
                            <ScrollArea className=' flex-grow  px-8 ' >
                                <Form {...form}>
                                    <form id='checkout-form' onSubmit={form.handleSubmit(appointmentComplete)}>
                                        <FormRadio
                                            form={form}
                                            label='Pay method'
                                            name='paymentMethod'
                                            flowStyle="row"
                                            options={[{ id: 'cash', value: 'Cash', label: 'Cash' }, { id: 'kbz-pay', value: 'KBZ pay', label: 'KBZ pay' }, { id: 'wave-pay', value: 'Wave pay', label: 'Wave pay' }, { id: 'aya-pay', value: 'AYA pay', label: 'AYA pay' }]}
                                        />
                                        {/* <div className="  max-w-[500px] gap-4 grid grid-cols-1 sm:grid-cols-2  ">
                                            <FormInput
                                                form={form}
                                                name='commissionFees'
                                                label={`Commission to member`}
                                                type='number'
                                                placeholder='commission amount for member'
                                            />
                                            <FormInput
                                                form={form}
                                                name='tips'
                                                label={`Tips for member`}
                                                type='number'
                                                defaultValue={0}
                                                placeholder='0'
                                            />
                                        </div> */}
                                        <FormTextarea
                                            form={form}
                                            name='notes'
                                            label='Notes'
                                            placeholder='Write notes about payment here...'
                                        />
                                    </form>
                                </Form>

                                <div className=" mb-4 ">
                                    <h1 className=' font-bold text-zinc-900 '>Notes of Appointment</h1>
                                    <p className=' font-medium text-sm '>{singleAppointment.notes ? singleAppointment.notes : "no notes"}</p>
                                </div>

                                <Card className=' space-y-2 p-3 '>
                                    <h1 className=' font-bold text-zinc-900 '>Taken Services</h1>
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
                                            notProvided={!isMemberProvideService(item.member, item.service.id)}
                                        />
                                    ))}
                                </Card>

                            </ScrollArea>
                            <div className=" mt-auto border-t px-8 py-3 space-y-2 bg-gray-100 ">

                                <div className="flex justify-between items-center mb-2">
                                    <div className=" flex flex-col ">
                                        <span className=' text-xs font-medium '>
                                            {singleAppointment.bookingItems?.length} services
                                        </span>
                                        <span className=' text-sm font-semibold '>{totalDuration(singleAppointment.bookingItems.flatMap(i => i.service))}</span>
                                    </div>
                                    <div className=" font-semibold ">Total {totalPrice(singleAppointment.bookingItems.flatMap(i => i.service))} MMK</div>
                                </div>
                                <div className="">
                                    <div className="flex gap-2 flex-grow">
                                        <Button type='button' variant="outline" className=" " onClick={() => handleClose()} >Close</Button>
                                        <Button disabled={singleAppointment.status == 'completed'} type='submit' form='checkout-form' className=" flex-1 ">
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