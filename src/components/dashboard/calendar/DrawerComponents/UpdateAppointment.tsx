'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Cake, Calendar, ChevronDown, Loader2, MoreVertical, MoveLeft, Plus, Search, Trash, User, UserPlus } from 'lucide-react'
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
import { Appointment } from '@/types/appointment'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import AppDropdown from '@/components/common/DropDown'
import AppDialog from '@/components/common/dialog'
import { Input } from '@/components/ui/input'
import IconMark from '@/components/icons/IconMark'
import { ConfirmAppointment } from '@/api/appointment/confirm-appointment'
import { CancelAppointment } from '@/api/appointment/cancel-appointment'
import { DeleteAppointment } from '@/api/appointment/delete-appointment'
import { CompleteAppointment } from '@/api/appointment/complete-appointment'
import AddNotes from './event-create-component/add-notes'
import UpdateableTime from './components/updateable-time'
import EditNotes from './event-create-component/edit-notes'
import { getDateByDayAndDuration, secondToHour } from '@/lib/utils'


type Props = {
    appointmentId: string;
    singleAppointment: Appointment;
}



export default function UpdateAppointmentDrawer({ appointmentId, singleAppointment }: Props) {
    const [clientSearch, setClientSearch] = useState('')
    const [serviceSearch, setServiceSearch] = useState('');
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false)
    const { deleteQuery } = useSetUrlParams();
    const [hasChosenClient, setHasChosenClient] = useState<Client | null>(singleAppointment.client);
    const [selectServices, setSelectServices] = useState<Service[]>(singleAppointment.bookingItems.flatMap((item) => item.service));
    const { mutate, isPending: isUpdating } = UpdateAppointment(appointmentId);
    const { mutate: confirm, isPending: isConfirming } = ConfirmAppointment();
    const { mutate: cancel, isPending: isCanceling } = CancelAppointment();
    const { mutate: deleteAppointment, isPending: isDeleting } = DeleteAppointment();
    const { mutate: complete, isPending: isCompleting } = CompleteAppointment();

    const handleClose = () => {
        deleteQuery({ key: "appointment-detail" })
    }
    const updateAppointmentHandler = () => {
        if (hasChosenClient) {
            const memberId = singleAppointment.memberId;
            const start = Number(singleAppointment.startTime);
            const newEvent = {
                clientId: hasChosenClient.id,
                date: singleAppointment.date,
                username: hasChosenClient.firstName,
                gender: hasChosenClient.gender,
                memberId,
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

    const currentTime = new Date(Number(singleAppointment.startTime))

    const addSelectService = (service: Service) => {
        setSelectServices((pre) => [...pre, service]);
        setShowServiceSelect(false);
    }
    const removeSelectedService = (service: Service) => {
        setSelectServices((pre) => pre.filter((item) => item.id != service.id))
    }

    const totalDuration = selectServices.reduce((pv, cv) => pv + cv.duration, 0)
    const totalPrice = selectServices.reduce((acc, service) => acc + parseInt(String(service?.price)), 0)

    // const allStatus = ['pending', 'confirmed', 'canceled', 'completed']
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


    return (
        <Modal onClose={() => handleClose()}>
            <div className=" flex w-auto h-screen relative  bg-gray-100 max-w-[800px] overflow-x-hidden ">
                <ChosenClient setHasChosenClient={setHasChosenClient} hasChosenClient={hasChosenClient} />
                <SelectClient setHasChosenClient={setHasChosenClient} />
                <SelectServiceForAppointment addSelectService={addSelectService} showServiceSelect={showServiceSelect} setShowServiceSelect={setShowServiceSelect} />



                <div className="w-[480px] bg-white h-full flex flex-col">
                    <div className=" p-8 bg-blue-600 text-white flex justify-between items-center ">
                        <div>
                            <h1 className=" text-xl font-bold ">{format(getDateByDayAndDuration(singleAppointment.date, singleAppointment.startTime), 'EEE dd LLL HH:mm')}</h1>
                            <UpdateableTime appointmentId={String(singleAppointment.id)} currentTime={singleAppointment.startTime} />
                            {/* <Button variant={'link'} className=' text-white '>{format(currentTime, 'HH:mm')}</Button> */}
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
                        <h2 className="text-xl font-semibold mb-4">Services</h2>
                        {selectServices?.map((service, index) => (
                            <Card key={index} className="  ">
                                <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                    <div>
                                        <h3 className="font-medium">{service.name}</h3>
                                        <p className="text-sm text-gray-500">{secondToHour(service.duration)} • miss</p>
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

                        {singleAppointment.notes?.length > 0 && (
                            <div className=' py-5 space-y-2 '>
                                <h1 className=' font-semibold '>Notes</h1>
                                <EditNotes title='Edit Note' label={singleAppointment.notes} appointmentId={appointmentId} previousNote={singleAppointment.notes} />
                                {/* <Button variant={'ghost'} className=' w-full justify-start '>{singleAppointment.notes}</Button> */}
                            </div>
                        )}
                    </div>
                    <div className=" mt-auto border-t px-8 py-3 space-y-3 ">

                        <div className="flex justify-between items-center mb-4">
                            <div>Total</div>
                            <div>{secondToHour(totalDuration)} From MMK {totalPrice.toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between">
                            <AppDropdown trigger={(
                                <span className=' px-4 py-2 hover:bg-gray-100 flex justify-center items-center '>
                                    <MoreVertical className="h-4 w-4 inline-block " />
                                </span>
                            )}>
                                <div className=' flex flex-col gap-1 '>
                                    <EditNotes previousNote={singleAppointment.notes} appointmentId={appointmentId} title='Edit note' label='Edit note' />
                                    <Button variant={'ghost'} onClick={() => appointmentDelete(singleAppointment.id.toString())} className=' text-delete flex justify-start '>delete </Button>
                                </div>
                            </AppDropdown>
                            <div className="flex gap-2 flex-grow">
                                <Button variant="outline" className=" flex-1 ">Checkout</Button>
                                <Button onClick={() => updateAppointmentHandler()} className=" flex-1 ">
                                    {isUpdating ? (
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
        </Modal>
    )
}