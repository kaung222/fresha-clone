'use client'
import { useMemo, useState } from 'react'
import { Bell, Building2, CalendarIcon, Camera, ChevronDown, Home, Loader2, MapPin, MoreHorizontal, Plus, Search, Trash, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import "react-datepicker/dist/react-datepicker.css";
import { Card } from '@/components/ui/card'
import { CreateAppointment } from '@/api/appointment/create-appointment'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { generateTimeArray } from '@/lib/data'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import AppointmentServiceSelect from './appointment-service-select'
import { Textarea } from '@/components/ui/textarea'
import { GetTeamMember } from '@/api/member/get-teammember'
import { GetAllClients } from '@/api/client/get-all-clients'
import MemberDropdown from './member-dropdown'
import ClientDropDown from './client-dropdown'
import { Member, MemberForAll } from '@/types/member'
import { Client } from '@/types/client'
import { shortName } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { MiniClient } from '@/components/dashboard/calendar/drawers/create/CreateAppointmentDrawer'
import ConfirmDialog from '@/components/common/confirm-dialog'
import DatePicker from 'react-datepicker'
import SelectClientDrawer from '@/components/dashboard/calendar/drawers/create/select-client'
import SelectServiceForAppointment from '@/components/dashboard/calendar/drawers/create/select-service-appointment'
import UpdateMemberDrawer from '@/components/dashboard/calendar/drawers/create/change-member-appointment'
import { AppointmentService } from '@/types/appointment'
import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import { FormattedType, GetFormatClosedPeriods } from '@/api/closed-period/get-format-closed-period'
import { GetOrgSchedule } from '@/api/org-schedule/get-org-schedule'
import { OrgSchedule } from '@/types/org-schedule'


const CreateAppointmentPage = () => {
    const { mutate, isPending } = CreateAppointment()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { data: allMembers } = GetTeamMember();
    const { data: allClients } = GetAllClients();
    const { data: closeDays } = GetFormatClosedPeriods();
    const { data: schedules } = GetOrgSchedule()
    const [selectedService, setSelectedServices] = useState<AppointmentService[]>([]);
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [memberUpdateService, setMemberUpdateService] = useState<AppointmentService | null>(null);
    const [showServiceSelect, setShowServiceSelect] = useState<boolean>(false);
    const [client, SetClient] = useState<MiniClient | null>(null)
    const [member, setMember] = useState<Member | null>(null)
    const [notes, setNotes] = useState<string>('');
    const [time, setTime] = useState<number>(28800)
    const form = useForm();
    const router = useRouter()
    const profileImage = form.watch('profilePicture');


    const handleSaveAppointment = (values: any) => {
        console.log(values);
        if (!client) {
            return toast({ title: 'Need to choose client', variant: "destructive" })
        }
        if (selectedService.length == 0) {
            return toast({ title: "Need to add one service to make an appointment", variant: "destructive" })
        }

        const payload = {
            date: format(currentDate, "yyyy-MM-dd"),
            startTime: time,
            username: `${client?.username}`,
            notes: notes,
            status: 'confirmed',
            phone: client.phone,
            profilePicture: client.profilePicture,
            gender: client.gender,
            email: client.email,
            bookingItems: selectedService.map((ser) => ({ serviceId: ser.id, memberId: ser.providedMember.id }))
        }
        mutate(payload)
    }

    const removeSelectedServices = (service: AppointmentService) => {
        setSelectedServices((pre) => pre.filter((ser) => ser.id != service.id))
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())

    const isMemberProvideService = (members: MemberForAll, serviceId: string) => {
        return members.services?.flatMap(m => m.id).includes(serviceId)
    }

    const isAvailableSlot = (second: number, date: Date, schedules: OrgSchedule[] | undefined, closeDays: FormattedType[] | undefined) => {
        const today = format(date, "yyyy-MM-dd");
        const dayOfWeek = format(date, "EEEE"); // e.g., Monday

        // Check if it's a closed day
        const isClosed = closeDays?.some((d) => d.date === today);
        if (isClosed) return false;

        // Find today's schedule
        const scheduleForToday = schedules?.find((s) => s.dayOfWeek === dayOfWeek);
        if (!scheduleForToday) return false;

        // Check if the slot is within open hours
        return second >= scheduleForToday.startTime && second < scheduleForToday.endTime;
    };

    const CustomOption = ({ second, name, date }: { second: number, name: string, date: Date }) => {

        return (
            <>
                {isAvailableSlot(second, date, schedules, closeDays) ? (
                    <option value={second}>{name}</option>
                ) : (
                    <option value={second} className=' bg-gray-400 '>{name}</option>
                )}
            </>
        )
    }

    return (
        <>
            <StepperScrollLayout
                title='Create Appointment'
                handlerComponent={(
                    <div className="flex justify-end space-x-4">
                        {
                            notChanged ? (
                                <Button variant="brandOutline" className="mr-2" onClick={() => router.push('/sales/appointments')}>Close</Button>
                            ) : (
                                <ConfirmDialog button="Leave" title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/sales/appointments`)}>
                                    <Button variant="brandOutline" className=' '>Close</Button>
                                </ConfirmDialog>
                            )
                        }
                        <Button disabled={isPending} form='create-appointment-form' type='submit' variant="brandDefault" className='  '>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'client', name: 'Client' }, { id: 'services', name: "Services" }, { id: 'date', name: 'Date/Time' }]}
                threshold={0.5}
                editData={{
                    member: allMembers,
                    client: allClients,
                    closedDays: closeDays,
                    schedule: schedules,
                    currentDate: currentDate
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
                                <SelectServiceForAppointment defaultMember={allMembers[0]} showServiceSelect={showServiceSelect} setShowServiceSelect={setShowServiceSelect} selectedServices={selectedService} setSelectedService={setSelectedServices} />
                            )
                        }
                        {
                            memberUpdateService && allMembers && (
                                <UpdateMemberDrawer serviceToUpdate={memberUpdateService} setMemberUpdateService={setMemberUpdateService} allMembers={allMembers} setSelectedService={setSelectedServices} />
                            )
                        }
                    </>
                )}
            >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveAppointment)} id='create-appointment-form' className='space-y-10 pb-40 w-ful '>
                        {allClients && (
                            <Card id='client' className=' p-3 '>
                                <h1 className=' font-semibold text-zinc-900 '>Select Client</h1>
                                {client ? (
                                    <Button type="button" variant={'ghost'} onClick={() => setShowClientSelect(true)} className=" w-full sm:w-[350px] flex items-center gap-4 justify-start h-24 px-8 py-4">
                                        <Avatar className="h-16 w-16 ">
                                            <AvatarImage src={client.profilePicture} alt={shortName(client.username)} className=' object-cover ' />
                                            <AvatarFallback>{shortName(client.username)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-left flex flex-col">
                                            <span className=' font-semibold
                                                         '>{client.username}</span>
                                            <span className=" font-text text-gray-500">{client.email}</span>
                                        </span>
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={() => setShowClientSelect(true)} variant={'ghost'} className="w-full sm:w-[350px] flex items-center  justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
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
                                    <h2>No included services. Select at least one service.</h2>
                                )}
                            </div>
                        </Card>

                        <Card id='date' className=' p-3 '>
                            <div>
                                <Label>Date</Label>
                                <div className=' w-[200px] relative '>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                style={{ display: 'flex', gap: 2, alignItems: 'center' }}
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                id="start-date"
                                            >

                                                {currentDate ? (
                                                    <span>{format(currentDate, "PPP")}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">Today</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 relative z-[62] " align="start">
                                            <Calendar
                                                mode="single"
                                                selected={currentDate}
                                                onSelect={(e) => {
                                                    if (e) {
                                                        setCurrentDate(e)
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {/* <DatePicker
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
                                    /> */}
                                </div>
                            </div>
                            <div>
                                <Label>Time</Label>
                                <select value={time} onChange={(e) => setTime(Number(e.target.value))} name="" id="" className='flex w-[200px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground '>
                                    {generateTimeArray().map((time, index) => (
                                        <CustomOption key={index} second={time.value} name={time.name} date={currentDate} />
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label>Note</Label>
                                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Note to consider about this appointment..." />
                            </div>
                        </Card>

                    </form>
                </Form>
            </StepperScrollLayout>

        </>
    )
}

export default CreateAppointmentPage
