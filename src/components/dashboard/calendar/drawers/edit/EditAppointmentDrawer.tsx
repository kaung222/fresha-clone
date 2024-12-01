'use client'
import Modal from '@/components/modal/Modal'
import React, { Dispatch, useMemo, useState } from 'react'
import { NewAppointmentType } from '../../CalanderAppPage';
import { Member, MemberForAll } from '@/types/member';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, Loader2, Plus, Trash } from 'lucide-react';
import { CreateAppointment } from '@/api/appointment/create-appointment';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { colorOfStatus, secondFromStartOfDay, secondToHour, shortName } from '@/lib/utils';
import { format } from 'date-fns';
import { Client } from '@/types/client';
import { Service } from '@/types/service';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import EditAppointmentServiceSelect from './service-select';
import { GetSingleAppointment } from '@/api/appointment/get-single-appointment';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { Appointment, AppointmentService } from '@/types/appointment';
import UpdateableTime from './components/updateable-time';
import UpdateableDate from './components/updateable-date';
import { UpdateAppointment } from '@/api/appointment/update-appointment';
import { ScrollArea } from '@/components/ui/scroll-area';
import SelectClientDrawer from '../create/select-client';
import { MiniClient } from '../create/CreateAppointmentDrawer';
import { Card } from '@/components/ui/card';
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard';
import SelectServiceForAppointment from '../create/select-service-appointment';
import UpdateMemberDrawer from '../create/change-member-appointment';


type Props = {
    allMembers: MemberForAll[];
    singleAppointment: Appointment;
    appointmentId: string

}


const EditAppointmentDrawer = ({ appointmentId, singleAppointment, allMembers }: Props) => {
    const { mutate, isPending } = UpdateAppointment(appointmentId);
    const { deleteQuery } = useSetUrlParams()
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false);
    const [memberUpdateService, setMemberUpdateService] = useState<AppointmentService | null>(null);
    const [chooseClient, setChooseClient] = useState<MiniClient | null>({ profilePicture: singleAppointment.profilePicture, username: singleAppointment.username, email: singleAppointment.email, phone: singleAppointment.phone, gender: singleAppointment.gender });
    const [selectedService, setSelectedService] = useState<AppointmentService[]>(singleAppointment.bookingItems.flatMap(i => ({ ...i.service, providedMember: i.member })));
    const [startSecond, setStartSecond] = useState<number>(singleAppointment.startTime);
    const [currentDate, setCurrentDate] = useState<Date>(new Date(singleAppointment.date));
    const [note, setNote] = useState<string>(singleAppointment.notes || '');
    const handleClose = () => {
        deleteQuery({ key: 'appointment-detail' })
    };

    const currentMember = singleAppointment.bookingItems[0].member || allMembers[0];

    const totalDuration = (services: AppointmentService[]) => {
        const totalSeconds = services.reduce((pv, cv) => pv + Number(cv.duration), 0);
        return secondToHour(totalSeconds, 'duration')
    }
    const totalPrice = (services: AppointmentService[]) => {
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.discountPrice), 0)
        return totalPrice
    }

    const removeSelectedServices = (service: AppointmentService) => {
        setSelectedService((pre) => pre.filter((ser) => ser.id != service.id))
    }

    const updateAppointment = () => {
        if (chooseClient) {
            const payload = {
                date: format(currentDate, "yyyy-MM-dd"),
                username: `${chooseClient?.username}`,
                notes: note,
                status: 'pending',
                phone: chooseClient?.phone,
                email: chooseClient?.email,
                profilePicture: chooseClient.profilePicture,
                gender: chooseClient?.gender,
                startTime: startSecond,
                bookingItems: selectedService.map((ser) => ({ serviceId: ser.id, memberId: ser.providedMember.id })),
            }
            console.log(payload)
            mutate(payload, {
                onSuccess() {
                    handleClose()
                }
            })
        } else {
            toast({ title: "Choose Client to make appointment" })
        }
    }
    // const watchedValues = useMemo(() => form.watch(), []);

    // const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())

    const isMemberProvideService = (members: MemberForAll, serviceId: number) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" flex w-full h-screen relative  bg-gray-100 overflow-x-hidden ">
                    <div className=" w-full bg-white h-full flex flex-col">
                        <div style={{ background: `${colorOfStatus(singleAppointment.status)}` }} className=" p-8 py-3 text-white flex justify-between items-center ">
                            <div className=" ">
                                {chooseClient ? (
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" relative group flex items-center gap-4 justify-start h-20 px-4 py-2">
                                        <Avatar className="h-16 w-16 ">
                                            <AvatarImage src={chooseClient.profilePicture} alt={shortName(chooseClient.username)} className=' object-cover ' />
                                            <AvatarFallback>{shortName(chooseClient.username)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <div className=' font-semibold
                                         '>{chooseClient.username}</div>
                                            <div className=" font-text text-white">{chooseClient.email}</div>
                                        </div>
                                        <div className=' absolute w-full h-full top-0 left-0 rounded-lg bg-[#ffffffa5] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100 '>
                                            <h2 className=' font-semibold '>Change Client</h2>
                                        </div>
                                    </Button>
                                ) : (
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" flex items-center justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                        <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                            <Plus className="h-5 w-5 inline-block " />
                                        </div>
                                        <h3>Select client</h3>
                                    </Button>
                                )}
                            </div>
                            <div className="flex flex-col">
                                {/* <h1 className=" font-semibold ">{format(new Date(singleAppointment.date), 'EEE dd LLL')}</h1> */}
                                <UpdateableDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
                                <UpdateableTime setCurrentSecond={setStartSecond} currentSecond={startSecond} />
                                {/* <p className=' text-white '>{secondToHour(singleAppointment.startTime)}</p> */}
                            </div>
                        </div>
                        <hr />
                        <ScrollArea className=' flex-grow  px-8 ' >
                            <div className=" space-y-4 pb-[50vh] py-4 ">
                                {/* {chooseClient ? (
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" relative group flex items-center gap-4 justify-start h-24 px-8 py-4">
                                        <Avatar className="h-16 w-16 ">
                                            <AvatarImage src={chooseClient.profilePicture} alt={shortName(chooseClient.username)} className=' object-cover ' />
                                            <AvatarFallback>{shortName(chooseClient.username)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <div className=' font-semibold
                                         '>{chooseClient.username}</div>
                                            <div className=" font-text text-gray-500">{chooseClient.email}</div>
                                        </div>
                                        <div className=' absolute w-full h-full top-0 left-0 rounded-lg bg-[#ffffffa5] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100 '>
                                            <h2 className=' font-semibold '>Change Client</h2>
                                        </div>
                                    </Button>
                                ) : (
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" flex items-center justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                        <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                            <Plus className="h-5 w-5 inline-block " />
                                        </div>
                                        <h3>Select client</h3>
                                    </Button>
                                )} */}

                                <Card id='services' className=' p-6 gap-5 flex flex-col '>
                                    <div>
                                        <h3 className="text-lg font-semibold">🏷️ Services</h3>
                                        <p className='text-sm pl-7 font-medium leading-text text-zinc-500 '>Select the services to include in this package.</p>

                                    </div>
                                    <div className=' flex flex-col gap-2 '>
                                        <div>
                                            <Button onClick={() => setShowServiceSelect(true)} type='button' variant="outline" className="mb-4">
                                                <Plus className="mr-2 h-4 w-4" /> Add service
                                            </Button>
                                        </div>
                                        {selectedService.length > 0 ? (
                                            selectedService.map((service) => (
                                                <div key={service.id} className=' flex gap-2 items-center '>
                                                    <div className=' flex-grow '>
                                                        <ServiceCard service={service} memberComponent={(
                                                            <div onClick={() => setMemberUpdateService(service)} className=" px-1 py-1 cursor-pointer border rounded-[18px] h-9 ">
                                                                <div className="w-full flex items-center gap-2 justify-start h-7">
                                                                    <Avatar className="h-7 w-7 ">
                                                                        <AvatarImage src={service.providedMember?.profilePictureUrl} alt={shortName(service.providedMember?.firstName)} className=' object-cover ' />
                                                                        <AvatarFallback>{shortName(service.providedMember?.firstName)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span className=' font-medium text-sm'>{service.providedMember?.firstName}</span>
                                                                    <ChevronDown className=' h-3 w-3 ' />
                                                                </div>
                                                            </div>
                                                        )}
                                                            notProvided={!isMemberProvideService(service.providedMember, service.id)}
                                                        />
                                                    </div>
                                                    <Button onClick={() => removeSelectedServices(service)} type='button' variant={'ghost'}>
                                                        <Trash className=' w-4 h-4 ' />
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <h2>No included services</h2>
                                        )}
                                    </div>
                                </Card>

                                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Notes for this appointment' />
                            </div>


                        </ScrollArea>
                        <div className=" mt-auto border-t px-8 py-3 space-y-2 ">

                            <div className="flex justify-between items-center mb-2">
                                <div className=" flex flex-col ">
                                    <span className=' text-xs font-medium '>{selectedService.length} services</span>
                                    <span className=' text-sm font-semibold '>{totalDuration(selectedService)}</span>
                                </div>
                                <div>{totalPrice(selectedService)} MMK</div>
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-grow">
                                    <Button variant="outline" className=" flex-1 " onClick={() => handleClose()} >Cancel</Button>
                                    <Button disabled={isPending} onClick={() => updateAppointment()} className=" flex-1 ">
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : 'Update'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showClientSelect && (
                        <SelectClientDrawer setChooseClient={setChooseClient} setShowClientSelect={setShowClientSelect} />
                    )
                }
                {
                    showServiceSelect && currentMember && (
                        <SelectServiceForAppointment defaultMember={currentMember} showServiceSelect={showServiceSelect} setShowServiceSelect={setShowServiceSelect} selectedServices={selectedService} setSelectedService={setSelectedService} />
                    )
                }
                {
                    memberUpdateService && (
                        <UpdateMemberDrawer serviceToUpdate={memberUpdateService} setMemberUpdateService={setMemberUpdateService} allMembers={allMembers} setSelectedService={setSelectedService} />
                    )
                }
            </Modal>
        </>
    )
}

export default EditAppointmentDrawer