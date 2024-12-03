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
import { Card } from '@/components/ui/card';
import SelectServiceForAppointment from './select-service-appointment';
import { AppointmentService } from '@/types/appointment';
import UpdateMemberDrawer from './change-member-appointment';


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


const CreateAppointmentDrawer = ({ setMakeNewAppointment, makeNewAppointment, allMember }: Props) => {
    const { mutate, isPending } = CreateAppointment();
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [chooseClient, setChooseClient] = useState<MiniClient | null>(null);
    const [selectedService, setSelectedService] = useState<AppointmentService[]>([]);
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');
    const [memberUpdateService, setMemberUpdateService] = useState<AppointmentService | null>(null);
    const form = useForm()
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
        if (chooseClient) {
            const payload = {
                date: format(currentTime, "yyyy-MM-dd"),
                username: `${chooseClient?.username}`,
                notes: note,
                status: 'confirmed',
                phone: chooseClient?.phone,
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

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())

    const isMemberProvideService = (members: MemberForAll, serviceId: number) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" flex w-full h-screen relative  bg-gray-100 overflow-x-hidden ">
                    <div className=" w-full bg-white h-full flex flex-col">
                        <div className=" p-8 py-3 bg-blue-600 text-white flex justify-between items-center ">
                            <div className=" ">
                                {/* <Avatar className=' size-16 text-black '>
                                    <AvatarImage src={currentMember?.profilePictureUrl} alt={shortName(currentMember?.firstName)} className=' object-cover ' />
                                    <AvatarFallback>{shortName(currentMember?.firstName)}</AvatarFallback>
                                </Avatar> */}
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
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" flex items-center justify-start text-white h-24 px-8 py-4 gap-4 ">
                                        <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                            <Plus className="h-5 w-5 inline-block " />
                                        </div>
                                        <h3>Select client</h3>
                                    </Button>
                                )}
                            </div>
                            <div>
                                <h1 className=" font-semibold ">{format(currentTime, 'EEE dd LLL')}</h1>
                                <p className=' text-white '>{format(currentTime, 'HH:mm')}</p>
                            </div>
                        </div>
                        <ScrollArea className=' flex-grow   px-8 ' >
                            <div className="space-y-8 mb-[50vh] py-4">
                                {/* {chooseClient ? (
                                    <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" relative group flex items-center gap-4 justify-start h-24 px-8 py-4">
                                        <Avatar className="h-16 w-16 ">
                                            <AvatarImage src={chooseClient.profilePicture} alt={shortName(chooseClient?.username)} className=' object-cover ' />
                                            <AvatarFallback>{shortName(chooseClient?.username)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <div className=' font-semibold '>{chooseClient?.username}</div>
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
                                </Card>

                                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Notes for this appointment' className='focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0' />

                                {/* <div>
                                    <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedService} />
                                </div> */}
                            </div>

                        </ScrollArea>
                        <div className=" mt-auto border-t shadow-dialog px-8 py-3 space-y-2 ">

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
                                                <span className=' cursor-pointer  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                                            </ConfirmDialog>
                                        ) : (
                                            <Button variant="outline" className=" " onClick={() => setMakeNewAppointment(null)}>Close</Button>
                                        )
                                    }
                                    {/* <Button variant="outline" className=" flex-1 " onClick={() => setMakeNewAppointment(null)} >Close</Button> */}
                                    <Button disabled={isPending} onClick={() => createAppointment()} className=" flex-1 ">
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