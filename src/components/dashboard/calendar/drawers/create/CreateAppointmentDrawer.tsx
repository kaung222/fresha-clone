'use client'
import Modal from '@/components/modal/Modal'
import React, { Dispatch, useMemo, useState } from 'react'
import { NewAppointmentType } from '../../CalanderAppPage';
import { Member, MemberForAll } from '@/types/member';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CalendarDays, ChevronDown, Clock, Edit, Edit2, Loader2, Plus, ScrollText, Tag, Trash, User, X } from 'lucide-react';
import { CreateAppointment } from '@/api/appointment/create-appointment';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { checkChange, secondFromStartOfDay, secondToHour, shortName } from '@/lib/utils';
import { format } from 'date-fns';
import ChildModal from '@/components/modal/ChildModal';
import SelectClientDrawer from './select-client';
import { Client } from '@/types/client';
import { Service } from '@/types/service';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import ConfirmDialog from '@/components/common/confirm-dialog';
import SelectServiceForPackage from '@/components/dashboard/manage/package/create/select-service';
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import SelectServiceForAppointment from './select-service-appointment';
import { AppointmentService } from '@/types/appointment';
import UpdateMemberDrawer from './change-member-appointment';
import { defaultClient } from '@/lib/data';


type Props = {
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    makeNewAppointment: NewAppointmentType;
    allMember: MemberForAll[];
}

export type MiniClient = {
    profilePicture: string;
    username: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'none';
}

export const initialMiniClient: MiniClient = {
    profilePicture: defaultClient.profilePicture,
    username: `${defaultClient.firstName} ${defaultClient.lastName}`,
    email: defaultClient.email,
    phone: defaultClient.phone,
    gender: defaultClient.gender
}


const CreateAppointmentDrawer = ({ setMakeNewAppointment, makeNewAppointment, allMember }: Props) => {
    const { mutate, isPending } = CreateAppointment();
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [chooseClient, setChooseClient] = useState<MiniClient | null>(initialMiniClient);
    const [selectedService, setSelectedService] = useState<AppointmentService[]>([]);
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(true);
    const [note, setNote] = useState<string>('');
    const [memberUpdateService, setMemberUpdateService] = useState<AppointmentService | null>(null);
    const handleClose = () => {
        setMakeNewAppointment(null)
    };

    const currentTime = new Date(makeNewAppointment.value);
    const currentMember = allMember.find((member) => member.id == makeNewAppointment.resource);

    const totalDuration = (services: Service[]) => {
        const totalSeconds = services.reduce((pv, cv) => pv + Number(cv.duration), 0);
        return secondToHour(totalSeconds, 'duration')
    }
    const totalPrice = (services: Service[]) => {
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.discountPrice), 0)
        return totalPrice
    }

    const createAppointment = () => {
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
                date: format(currentTime, "yyyy-MM-dd"),
                username: `${chooseClient?.username}`,
                notes: note,
                status: 'confirmed',
                phone: chooseClient?.phone == '-' ? undefined : chooseClient?.phone,
                email: chooseClient?.email,
                gender: chooseClient?.gender,
                profilePicture: chooseClient.profilePicture,
                memberId: makeNewAppointment.resource,
                startTime: secondFromStartOfDay(currentTime),
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

    const removeSelectedServices = (service: Service) => {
        setSelectedService((pre) => pre.filter((ser) => ser.id != service.id))
    }



    const isMemberProvideService = (members: MemberForAll, serviceId: string) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" flex w-full h-screen relative  bg-gray-100 overflow-x-hidden ">
                    <Button variant={"brandOutline"} onClick={handleClose} className=' size-8 px-2 bg-white  block lg:hidden rounded-full absolute top-1 right-1 '>
                        <X className=' w-4 h-4 ' />
                    </Button>
                    <div className=" w-full bg-white h-full flex flex-col">
                        <div className="px-3 md:px-8 py-3 flex h-20 flex-shrink-0 bg-blue-600 text-white  justify-between items-center ">
                            <div className=" ">
                                <div className="text-2xl font-bold">Create Appointment</div>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-6 w-6" />
                                    <span className="text-sm font-bold">
                                        {format(currentTime, 'EEE dd MMM')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-6 w-6" />
                                    <span className="text-sm font-bold">{format(currentTime, "HH:mm")}</span>
                                </div>
                            </div>
                            {/* <div>
                                <div className="flex items-center gap-2 text-lg font-medium">
                                    <CalendarDays className="h-5 w-5 text-white" />
                                    {format(currentTime, 'EEE dd LLL')}
                                </div>
                                <div className="flex items-center gap-2 text-2xl font-bold mt-1">
                                    <Clock className="h-6 w-6 text-white" />
                                    {format(currentTime, 'HH:mm')}
                                </div>
                                
                            </div> */}
                        </div>
                        <ScrollArea className=' flex-grow  px-3 md:px-8 ' >
                            <div className="space-y-8  p-6 pb-20">

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
                                                            type="button"
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
                                            {/* <Button onClick={() => removeSelectedServices(service)} type='button' variant={'ghost'}>
                                                    <Trash className=' w-4 h-4 ' />
                                                </Button> */}
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
                                                            <div onClick={() => setMemberUpdateService(service)} className=" px-1 py-1 cursor-pointer flex-shrink-0 flex-nowrap border rounded-[18px] h-9 ">
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

                                {/* Notes Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <ScrollText className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg font-medium">Notes for appointment</h2>
                                    </div>
                                    <Textarea
                                        placeholder="Add notes for this appointment"
                                        className="min-h-[120px] resize-none"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>

                                {/* <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Notes for this appointment' className='focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0' /> */}

                                {/* <div>
                                    <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedService} />
                                </div> */}
                            </div>

                        </ScrollArea>
                        <div className=" mt-auto border-t shadow-dialog px-3 md:px-8 py-3 space-y-2 ">

                            <div className="flex justify-between items-center mb-2">
                                <div className=" flex flex-col ">
                                    <span className=' text-xs font-medium '>{selectedService.length} services</span>
                                    <span className=' text-sm font-semibold '>{totalDuration(selectedService)}</span>
                                </div>
                                <div> <span className=' font-semibold text-sm '>Total - </span> {totalPrice(selectedService)} MMK</div>
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-grow">
                                    {
                                        (chooseClient || selectedService.length > 0) ? (
                                            <ConfirmDialog button="Leave" title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => setMakeNewAppointment(null)}>
                                                <span className=' cursor-pointer flex-1 text-center  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                                            </ConfirmDialog>
                                        ) : (
                                            <Button variant="brandOutline" className=" flex-1 " onClick={() => setMakeNewAppointment(null)}>Close</Button>
                                        )
                                    }
                                    {/* <Button variant="outline" className=" flex-1 " onClick={() => setMakeNewAppointment(null)} >Close</Button> */}
                                    <Button disabled={isPending} variant={'brandDefault'} onClick={() => createAppointment()} className=" flex-1  ">
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : 'Save'}
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
                        <UpdateMemberDrawer serviceToUpdate={memberUpdateService} setMemberUpdateService={setMemberUpdateService} allMembers={allMember} setSelectedService={setSelectedService} />
                    )
                }
            </Modal>
        </>
    )
}

export default CreateAppointmentDrawer