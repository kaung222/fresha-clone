'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Cake, Calendar, ChevronDown, MoreVertical, MoveLeft, Plus, Search, Trash, User, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Modal from '@/components/modal/Modal'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { NewAppointmentType } from '../CalanderAppPage'
import { Card, CardContent } from '@/components/ui/card'
import { Client } from '@/types/client'
import SelectClient from './event-create-component/select-client'
import ChosenClient from './event-create-component/chosen-client'
import SelectServiceForAppointment from './event-create-component/select-service'
import { Service } from '@/types/service'
import { CreateAppointment } from '@/api/appointment/create-appointment'
import { format, intervalToDuration } from 'date-fns'
import { toast } from '@/components/ui/use-toast'
import AppDropdown from '@/components/common/DropDown'
import AddNotes from './event-create-component/add-notes'


type Props = {
    setMakeNewAppointment: Dispatch<NewAppointmentType | null>;
    makeNewAppointment: NewAppointmentType;

}



export default function NewAppointment({ setMakeNewAppointment, makeNewAppointment }: Props) {
    const [clientSearch, setClientSearch] = useState('')
    const [serviceSearch, setServiceSearch] = useState('');
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false)
    const { deleteQuery } = useSetUrlParams();
    const [hasChosenClient, setHasChosenClient] = useState<Client | null>(null);
    const [selectServices, setSelectServices] = useState<Service[]>([]);
    const [note, setNote] = useState<string>('');
    const { mutate, isPending } = CreateAppointment();

    const handleClose = () => {
        setMakeNewAppointment(null)
    }
    const addNewEvent = () => {
        if (hasChosenClient) {
            const memberId = makeNewAppointment.resource;
            const start = new Date(makeNewAppointment.value).getTime();

            const newEvent = {
                clientId: hasChosenClient.id,
                date: start,
                start,
                username: hasChosenClient.firstName,
                notes: "want to happy",
                gender: hasChosenClient.gender,
                memberId,
                status: 'pending',
                email: hasChosenClient.email,
                phone: hasChosenClient.phone,
                serviceIds: selectServices.map((service) => service.id),
            }
            mutate(newEvent);
            return;
        } else {
            toast({ title: "Select Client for appointment", className: ' text-white bg-red-600 ' });
        }
    };

    const currentTime = new Date(makeNewAppointment.value)

    const addSelectService = (service: Service) => {
        setSelectServices((pre) => [...pre, service]);
        setShowServiceSelect(false);
    }
    const removeSelectedService = (service: Service) => {
        setSelectServices((pre) => pre.filter((item) => item.id != service.id))
    }

    const totalDuration = intervalToDuration({ start: 0, end: selectServices.reduce((acc, service) => acc + parseInt(String(service.duration)), 0) })
    const totalPrice = selectServices.reduce((acc, service) => acc + parseInt(String(service.price)), 0)


    return (
        <Modal onClose={() => handleClose()}>
            <div className=" flex w-auto h-screen relative  bg-gray-100 max-w-[800px] overflow-x-hidden ">
                <ChosenClient setHasChosenClient={setHasChosenClient} hasChosenClient={hasChosenClient} />
                <SelectClient setHasChosenClient={setHasChosenClient} />
                <SelectServiceForAppointment addSelectService={addSelectService} showServiceSelect={showServiceSelect} setShowServiceSelect={setShowServiceSelect} />

                <div className="w-[480px] bg-white h-full flex flex-col">
                    <div className=" px-8 py-3 ">
                        <h1 className=" text-2xl font-bold ">{format(currentTime, 'EEE dd LLL HH:mm')}</h1>
                    </div>
                    <hr />
                    <div className=' flex-grow overflow-y-auto space-y-4 p-8 ' >
                        <h2 className="text-xl font-semibold mb-4">Services</h2>
                        {selectServices?.map((service, index) => (
                            <Card key={index} className="  ">
                                <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                    <div>
                                        <h3 className="font-medium">{service.name}</h3>
                                        <p className="text-sm text-gray-500">{service.duration} • miss</p>
                                    </div>
                                    <div className=' hidden group-hover:block '>
                                        <Button variant={'ghost'} onClick={() => removeSelectedService(service)}>
                                            <Trash className=' w-5 h-5 ' />
                                        </Button>
                                    </div>
                                    <div className="text-right block group-hover:hidden">
                                        <p>from MMK {service.price.toLocaleString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="outline" onClick={() => setShowServiceSelect(true)} className="mb-8">
                            <Plus className="mr-2 h-4 w-4" /> Add service
                        </Button>
                    </div>
                    <div className=" mt-auto border-t px-8 py-3 space-y-3 ">

                        <div className="flex justify-between items-center mb-4">
                            <div>Total</div>
                            <div>{totalDuration.hours} hr {totalDuration.minutes} min From MMK {totalPrice.toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between">
                            <AppDropdown trigger={(
                                <span className=' px-4 py-2 hover:bg-gray-100 flex justify-center items-center '>
                                    <MoreVertical className="h-4 w-4 inline-block " />
                                </span>
                            )}>
                                <div className=' flex flex-col gap-1 '>
                                    <AddNotes note={note} setNote={setNote} title='Add a note' label='add note' />
                                    <Button variant={'ghost'} className=' text-delete '>cancel </Button>
                                </div>
                            </AppDropdown>
                            <div className="flex gap-2 flex-grow">
                                <Button variant="outline" className=" flex-1 ">Cancel</Button>
                                <Button onClick={() => addNewEvent()} className=" flex-1 ">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}