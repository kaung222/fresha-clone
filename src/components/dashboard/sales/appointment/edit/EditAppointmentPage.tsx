'use client'
import { useMemo, useState } from 'react'
import { Bell, Building2, Camera, ChevronDown, Home, Loader2, MapPin, MoreHorizontal, Plus, Search, Trash, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import "react-datepicker/dist/react-datepicker.css";
import { Card } from '@/components/ui/card'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { generateTimeArray } from '@/lib/data'
import { Textarea } from '@/components/ui/textarea'
import { GetAllClients } from '@/api/client/get-all-clients'
import { Member } from '@/types/member'
import { shortName } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { Appointment, AppointmentService } from '@/types/appointment'
import MemberDropdown from '../create/member-dropdown'
import ClientDropDown from '../create/client-dropdown'
import AppointmentServiceSelect from '../create/appointment-service-select'
import { UpdateAppointment } from '@/api/appointment/update-appointment'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { MiniClient } from '@/components/dashboard/calendar/drawers/create/CreateAppointmentDrawer'
import ConfirmDialog from '@/components/common/confirm-dialog'
import SelectClientDrawer from '@/components/dashboard/calendar/drawers/create/select-client'
import SelectServiceForAppointment from '@/components/dashboard/calendar/drawers/create/select-service-appointment'
import UpdateMemberDrawer from '@/components/dashboard/calendar/drawers/create/change-member-appointment'
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'


type Props = {
    singleAppointment: Appointment;
    allMembers: Member[];
    appointmentId: string;
}

const EditAppointmentPage = ({ singleAppointment, allMembers, appointmentId }: Props) => {
    const { mutate, isPending } = UpdateAppointment(appointmentId);
    const [currentDate, setCurrentDate] = useState<Date>(new Date(singleAppointment.date));
    const { data: allClients } = GetAllClients();
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false);
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [memberUpdateService, setMemberUpdateService] = useState<AppointmentService | null>(null);
    const [selectedService, setSelectedServices] = useState<AppointmentService[]>(singleAppointment.bookingItems.flatMap(i => ({ ...i.service, providedMember: i.member })));
    const [client, SetClient] = useState<MiniClient | null>({ profilePicture: singleAppointment.profilePicture, username: singleAppointment.username, email: singleAppointment.email, phone: singleAppointment.phone, gender: singleAppointment.gender })
    // const [member, setMember] = useState<Member | null>(single)
    const [notes, setNotes] = useState<string>(singleAppointment.notes || '');
    const [time, setTime] = useState<number>(singleAppointment.startTime)
    const form = useForm();
    const router = useRouter()
    const profileImage = form.watch('profilePicture');

    const currentMember = singleAppointment.bookingItems[0].member || allMembers[0]

    const handleSaveClient = (values: any) => {
        console.log(values);
        if (!client) {
            return toast({ title: 'need to choose client' })
        }

        const payload = {
            date: format(currentDate, "yyyy-MM-dd"),
            startTime: time,
            username: `${client.username}`,
            notes: notes,
            status: 'pending',
            phone: client.phone,
            profilePicture: client.profilePicture,
            gender: client.gender,
            email: client.email,
            bookingItems: selectedService.map((ser) => ({ serviceId: ser.id, memberId: ser.providedMember.id })),
        }
        mutate(payload, {
            onSuccess() {
                router.push('/sales/appointments')
            }
        })
    }

    const removeSelectedServices = (service: AppointmentService) => {
        console.log(service)
        setSelectedServices((pre) => pre.filter((ser) => ser.id != service.id))
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())


    return (
        <>
            <StepperScrollLayout
                title='Update Appointment'
                handlerComponent={(
                    <div className="flex justify-end space-x-4">
                        {
                            notChanged ? (
                                <Button variant="outline" className="mr-2" onClick={() => router.push('/sales/appointments')}>Close</Button>
                            ) : (
                                <ConfirmDialog button="Leave" title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/sales/appointments`)}>
                                    <span className=' cursor-pointer  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                                </ConfirmDialog>
                            )
                        }
                        <Button disabled={isPending} form='appointment-update-form' type='submit'>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    updating...
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'client', name: 'Client' }, { id: 'services', name: "Services" }, { id: 'date', name: 'Date/Time' }]}
                threshold={0.5}
                editData={{
                    member: allMembers,
                    client: allClients
                }}
                drawers={(
                    <>
                        {
                            showClientSelect && (
                                <SelectClientDrawer setChooseClient={SetClient} setShowClientSelect={setShowClientSelect} />
                            )
                        }
                        {
                            showServiceSelect && allMembers && (
                                <SelectServiceForAppointment defaultMember={currentMember} showServiceSelect={showServiceSelect} setShowServiceSelect={setShowServiceSelect} selectedServices={selectedService} setSelectedService={setSelectedServices} />
                            )
                        }
                        {
                            memberUpdateService && (
                                <UpdateMemberDrawer serviceToUpdate={memberUpdateService} setMemberUpdateService={setMemberUpdateService} allMembers={allMembers} setSelectedService={setSelectedServices} />
                            )
                        }
                    </>
                )}
            >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveClient)} id='appointment-update-form' className=' space-y-10 pb-40 w-ful '>
                        {allClients && (
                            <Card id='client' className=' p-3 '>
                                <h1 className=' font-semibold text-zinc-900 '>Select Client</h1>
                                {client ? (
                                    <Button type="button" onClick={() => setShowClientSelect(true)} variant="ghost" className="w-full max-w-[350px] flex items-center gap-4 justify-start h-24 px-8 py-4">
                                        <Avatar className="h-16 w-16 ">
                                            <AvatarImage src={client.profilePicture} alt={shortName(client?.username)} className=' object-cover ' />
                                            <AvatarFallback>{shortName(client.username)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-left flex flex-col">
                                            <span className=' font-semibold '>{client.username}</span>
                                            <span className=" font-text text-gray-500">{client.email}</span>
                                        </span>
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={() => setShowClientSelect(true)} variant="ghost" className="w-full sm:w-[350px] flex items-center hover:bg-gray-100 justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                        <span className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                            <Plus className="h-5 w-5 inline-block " />
                                        </span>
                                        <span>Select client</span>
                                    </Button>
                                )}
                            </Card>
                        )}

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
                                                )} />
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

                        <Card id='date' className=' p-3 '>
                            <div>
                                <Label>Date</Label>
                                <div className=' '>
                                    <DatePicker
                                        selected={currentDate}
                                        onChange={(e) => {
                                            if (e) {
                                                setCurrentDate(e)
                                            }
                                        }}
                                        dateFormat={'EEE dd LLL'}
                                        showWeekPicker={false}
                                        customInput={
                                            <h1 className=" font-semibold hover:underline flex items-center gap-2 ">{format(currentDate, 'EEE dd LLL')}</h1>
                                        }
                                        className=''
                                        popperPlacement='right'
                                        popperClassName=' '
                                        calendarClassName=' '
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Time</Label>
                                <select value={time} onChange={(e) => setTime(Number(e.target.value))} name="" id="" className='flex w-[350px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground '>
                                    {generateTimeArray().map((time, index) => (
                                        <option key={index} value={time.value}>{time.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label>Note</Label>
                                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                            </div>
                        </Card>
                        {/* <Card className=' p-3 '>
                            <div id="services"></div>
                            <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedServices} />
                        </Card> */}
                    </form>
                </Form>
            </StepperScrollLayout>
        </>
    )
}

export default EditAppointmentPage
