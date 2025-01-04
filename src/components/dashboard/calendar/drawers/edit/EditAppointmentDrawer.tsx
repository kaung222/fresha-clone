'use client'
import Modal from '@/components/modal/Modal'
import React, { Dispatch, useMemo, useState } from 'react'
import { NewAppointmentType } from '../../CalanderAppPage';
import { Member, MemberForAll } from '@/types/member';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, Edit, Edit2, Loader2, Plus, ScrollText, Tag, Trash, User, X } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard';
import SelectServiceForAppointment from '../create/select-service-appointment';
import UpdateMemberDrawer from '../create/change-member-appointment';
import { anyMember } from '@/lib/data';


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
    const prevServices = singleAppointment.bookingItems.flatMap(i => i.service ? ({ ...i.service, providedMember: i.member || anyMember }) : null).filter(s => s != null)
    const [selectedService, setSelectedService] = useState<AppointmentService[]>(prevServices);
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
        if (!chooseClient) {
            return toast({ title: 'Need to choose client', variant: 'destructive' })
        }
        if (selectedService.length == 0) {
            return toast({ title: "Need to have one service in appointment", variant: 'destructive' })
        }
        if (selectedService.flatMap(s => s.providedMember.id).includes('-1')) {
            return toast({ title: "There is a service not assigned to  member.", variant: 'destructive' })
        }

        if (chooseClient) {
            const payload = {
                date: format(currentDate, "yyyy-MM-dd"),
                username: `${chooseClient?.username}`,
                notes: note,
                status: singleAppointment?.status,
                phone: chooseClient?.phone == '-' ? undefined : chooseClient?.phone,
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

    const isMemberProvideService = (members: MemberForAll, serviceId: string) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" flex w-full h-screen relative  bg-gray-100 overflow-x-hidden ">
                    <Button variant={"brandOutline"} onClick={handleClose} className=' size-8 px-2 bg-white hover:bg-pink-100 block lg:hidden rounded-full absolute top-1 right-1 '>
                        <X className=' w-4 h-4 ' />
                    </Button>
                    <div className=" w-full bg-white h-full flex flex-col">
                        <div style={{ background: `${colorOfStatus(singleAppointment.status)}` }} className=" px-3 md:px-8 py-3 h-20 flex-shrink-0 text-white flex justify-between items-center ">
                            <div className=" ">
                                <div className="text-2xl font-bold">Edit Appointment</div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <UpdateableDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
                                <UpdateableTime setCurrentSecond={setStartSecond} currentSecond={startSecond} />
                            </div>
                        </div>
                        <hr />
                        <ScrollArea className=' flex-grow px-3 md:px-8  ' >
                            <div className=" space-y-8  p-6 pb-20 ">

                                {chooseClient ? (
                                    <Card className="relative">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarFallback className="bg-primary/10">
                                                        {shortName(chooseClient.username)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-medium">{chooseClient.username}</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                {chooseClient.email}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => setShowClientSelect(true)}
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card className="border-dashed">
                                        <CardContent className="p-6">
                                            <button
                                                className="w-full flex items-center gap-4 text-left"
                                                onClick={() => setShowClientSelect(true)}
                                            >
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Add client</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Select or create a new client
                                                    </p>
                                                </div>
                                            </button>
                                        </CardContent>
                                    </Card>
                                )}


                                {/* <Card className=" ">
                                    {chooseClient ? (
                                        <div className=" relative inline-flex items-center gap-4 justify-start h-20 px-4 py-2">
                                            <Avatar className="h-16 w-16 ">
                                                <AvatarImage src={chooseClient.profilePicture} alt={shortName(chooseClient.username)} className=' object-cover bg-brandColorLight ' />
                                                <AvatarFallback className=' bg-brandColorLight '>{shortName(chooseClient.username)}</AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <div className=' font-semibold
                                         '>{chooseClient.username}</div>
                                                <div className=" font-text text-white">{chooseClient.email}</div>
                                            </div>
                                            <Button onClick={() => setShowClientSelect(true)} variant={'ghost'} className=' size-6 p-1 absolute top-2 right-2 '>
                                                <Edit className=' w-4 h-4 ' />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" flex items-center justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                            <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                                <Plus className="h-5 w-5 inline-block " />
                                            </div>
                                            <h3>Select client</h3>
                                        </Button>
                                    )}
                                </Card> */}

                                {/* Services Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 font-semibold ">
                                        <Tag className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg ">Services</h2>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Select the services to include in this appointment.
                                    </p>

                                    {selectedService.map((service) => (
                                        <div key={service.id} className=' w-full relative '>
                                            <div className=' w-full '>
                                                <ServiceCard service={service} memberComponent={(
                                                    <div onClick={() => setMemberUpdateService(service)} className=" px-1 py-1 w-[180px] cursor-pointer flex-shrink-0 flex-nowrap border rounded-[18px] h-9 ">
                                                        <div className="w-full flex items-center gap-2 justify-start h-7">
                                                            <Avatar className="h-7 w-7 ">
                                                                <AvatarImage src={service.providedMember?.profilePictureUrl} alt={shortName(service.providedMember?.firstName)} className=' object-cover ' />
                                                                <AvatarFallback>{shortName(service.providedMember?.firstName)}</AvatarFallback>
                                                            </Avatar>
                                                            <span className=' font-medium text-sm '>{service.providedMember?.firstName}</span>
                                                            <ChevronDown className=' h-3 w-3 ' />
                                                        </div>
                                                    </div>
                                                )}
                                                    notProvided={!isMemberProvideService(service.providedMember, service.id)}
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 absolute top-2 right-2"
                                                onClick={() => removeSelectedServices(service)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}


                                    <Card className="border-dashed">
                                        <CardContent className="p-6">
                                            <button
                                                className="w-full flex items-center gap-4 text-left"
                                                onClick={() => setShowServiceSelect(true)}
                                            >
                                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Plus className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">Add service</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Browse available services
                                                    </p>
                                                </div>
                                            </button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* <Card id='services' className=' p-6 gap-5 flex flex-col '>
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
                                                                        <AvatarFallback className=' '>{shortName(service.providedMember?.firstName)}</AvatarFallback>
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
                                </Card> */}

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <ScrollText className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg ">Notes for appointment</h2>
                                    </div>
                                    <Textarea
                                        placeholder="Add notes for this appointment"
                                        className="min-h-[120px] resize-none"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>

                                {/* <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Notes for this appointment' /> */}
                            </div>


                        </ScrollArea>
                        <div className=" mt-auto shadow-dialog px-3 md:px-8 py-3 space-y-2 border-t ">

                            <div className="flex justify-between items-center mb-2">
                                <div className=" flex flex-col ">
                                    <span className=' text-xs font-medium '>{selectedService.length} services</span>
                                    <span className=' text-sm font-semibold '>{totalDuration(selectedService)}</span>
                                </div>
                                <div>{totalPrice(selectedService)} MMK</div>
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-grow">
                                    <Button variant="brandOutline" className=" flex-1  " onClick={() => handleClose()} >Close</Button>
                                    <Button disabled={isPending} onClick={() => updateAppointment()} variant={'brandDefault'} className=" flex-1">
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