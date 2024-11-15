'use client'
import Modal from '@/components/modal/Modal'
import React, { Dispatch, useState } from 'react'
import { NewAppointmentType } from '../../CalanderAppPage';
import { Member } from '@/types/member';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
import { CreateAppointment } from '@/api/appointment/create-appointment';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { secondFromStartOfDay, secondToHour, shortName } from '@/lib/utils';
import { format } from 'date-fns';
import ChildModal from '@/components/modal/ChildModal';
import SelectClientDrawer from './select-client';
import { Client } from '@/types/client';
import AppointmentServiceSelect from './service-select';
import { Service } from '@/types/service';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';


type Props = {
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    makeNewAppointment: NewAppointmentType;
    allMember: Member[]

}


const CreateAppointmentDrawer = ({ setMakeNewAppointment, makeNewAppointment, allMember }: Props) => {
    const { mutate, isPending } = CreateAppointment();
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [chooseClient, setChooseClient] = useState<Client | null>(null);
    const [selectedService, setSelectedService] = useState<Service[]>([]);
    const [note, setNote] = useState<string>('');
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
        const totalPrice = services.reduce((pv, cv) => pv + Number(cv.price), 0)
        return totalPrice
    }



    const createAppointment = () => {
        if (chooseClient) {
            const payload = {
                date: format(currentTime, "yyyy-MM-dd"),
                username: `${chooseClient?.firstName} ${chooseClient?.lastName}`,
                notes: note,
                status: 'pending',
                phone: chooseClient?.phone,
                email: chooseClient?.email,
                gender: chooseClient?.gender,
                memberId: makeNewAppointment.resource,
                serviceIds: selectedService.map((ser) => ser.id),
                start: secondFromStartOfDay(currentTime),
                clientId: chooseClient?.id
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
    return (
        <>
            <Modal onClose={handleClose}>
                <div className=" flex w-full h-screen relative  bg-gray-100 lg:w-[500px] overflow-x-hidden ">
                    <div className=" w-full bg-white h-full flex flex-col">
                        <div className=" p-8 py-3 bg-blue-600 text-white flex justify-between items-center ">
                            <div className=" ">
                                <Avatar className=' size-16 text-black '>
                                    <AvatarImage src={currentMember?.profilePictureUrl} alt={shortName(currentMember?.firstName)} className=' object-cover ' />
                                    <AvatarFallback>{shortName(currentMember?.firstName)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h1 className=" font-semibold ">{format(currentTime, 'EEE dd LLL')}</h1>
                                {/* <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={currentTime} /> */}
                                <p className=' text-white '>{format(currentTime, 'HH:mm')}</p>
                            </div>
                        </div>
                        <hr />
                        <ScrollArea className=' flex-grow  space-y-4 p-8 ' >
                            {chooseClient ? (
                                <Button onClick={() => setShowClientSelect(true)} variant="ghost" className="w-full relative group flex items-center gap-4 justify-start h-24 px-8 py-4">
                                    <Avatar className="h-16 w-16 ">
                                        <AvatarImage src={chooseClient.profilePicture} alt={shortName(chooseClient.firstName)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(chooseClient.firstName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <div className=' font-semibold
                                         '>{chooseClient.firstName} {chooseClient.lastName}</div>
                                        <div className=" font-text text-gray-500">{chooseClient.email}</div>
                                    </div>
                                    <div className=' absolute w-full h-full top-0 left-0 rounded-lg bg-[#ffffffa5] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100 '>
                                        <h2 className=' font-semibold '>Change Client</h2>
                                    </div>
                                </Button>
                            ) : (
                                <Button onClick={() => setShowClientSelect(true)} variant="ghost" className="w-full flex items-center justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                    <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                        <Plus className="h-5 w-5 inline-block " />
                                    </div>
                                    <h3>Select client</h3>
                                </Button>
                            )}

                            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Notes for this appointment' />

                            <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedService} />



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
                                    <Button variant="outline" className=" flex-1 " onClick={() => setMakeNewAppointment(null)} >Cancel</Button>
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
            </Modal>
        </>
    )
}

export default CreateAppointmentDrawer