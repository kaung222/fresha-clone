'use client'
import { useState } from 'react'
import { Bell, Building2, Camera, Home, Loader2, MapPin, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ProfileDropdown from '@/components/layout/ProfileDropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { CreateClient } from '@/api/client/create-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "react-datepicker/dist/react-datepicker.css";
import { Card } from '@/components/ui/card'
import DatePicker from 'react-datepicker'
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
import { Member } from '@/types/member'
import { Client } from '@/types/client'
import { shortName } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { MiniClient } from '@/components/dashboard/calendar/drawers/create/CreateAppointmentDrawer'


const CreateAppointmentPage = () => {
    const { mutate, isPending } = CreateAppointment()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { data: allMembers } = GetTeamMember();
    const { data: allClients } = GetAllClients();
    const [selectedService, setSelectedServices] = useState<string[]>([]);
    const [client, SetClient] = useState<MiniClient | null>(null)
    const [member, setMember] = useState<Member | null>(null)
    const [notes, setNotes] = useState<string>('');
    const [time, setTime] = useState<number>(3600)
    const form = useForm();
    const router = useRouter()
    const profileImage = form.watch('profilePicture');


    const handleSaveAppointment = (values: any) => {
        console.log(values);
        if (!client) {
            return toast({ title: 'need to choose client' })
        }
        if (!member) {
            return toast({ title: 'need to choose member' })
        }

        const payload = {
            date: format(currentDate, "yyyy-MM-dd"),
            // clientId: client?.id,
            startTime: time,
            username: `${client?.username}`,
            notes: notes,
            status: 'pending',
            phone: client.phone,
            gender: client.gender,
            email: client.email,
            memberId: member.id,
            serviceIds: selectedService.map((ser) => Number(ser))
        }
        mutate(payload)
    }


    return (
        <>
            <StepperScrollLayout
                title='Create Appointment'
                handlerComponent={(
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => router.push('/sales/appointments')}>Cancel</Button>
                        <Button disabled={isPending} form='create-appointment-form' type='submit'>
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
                sectionData={[{ id: 'member', name: 'Member' }, { id: 'client', name: 'Client' }, { id: 'date', name: 'Date/Time' }, { id: 'services', name: "Services" }]}
                threshold={1}
                editData={{
                    member: allMembers,
                    client: allClients
                }}
            >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveAppointment)} id='create-appointment-form' className='space-y-10 pb-40 w-ful '>
                        {allMembers && (
                            <Card id='member' className=' p-3 '>
                                <h1 className=' font-semibold text-zinc-900 '>Select team member</h1>
                                <MemberDropdown setMember={setMember} allMembers={allMembers}>
                                    {member ? (
                                        <span className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
                                            <Avatar className="h-16 w-16 ">
                                                <AvatarImage src={member.profilePictureUrl} alt={shortName(member.firstName)} className=' object-cover ' />
                                                <AvatarFallback>{shortName(member.firstName)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-left flex flex-col">
                                                <span className=' font-semibold
                                                     '>{member.firstName} {member.lastName}</span>
                                                <span className=" font-text text-gray-500">{member.email}</span>
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="w-full hover:bg-gray-100 flex items-center sm:w-[350px] justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                            <span className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                                <Plus className="h-5 w-5 inline-block " />
                                            </span>
                                            <span>Select team member</span>
                                        </span>
                                    )}
                                </MemberDropdown>
                            </Card>
                        )}
                        {allClients && (
                            <Card id='client' className=' p-3 '>
                                <h1 className=' font-semibold text-zinc-900 '>Select Client</h1>
                                <ClientDropDown setClient={SetClient} allClients={allClients}>
                                    {client ? (
                                        <span className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
                                            <Avatar className="h-16 w-16 ">
                                                <AvatarImage src={client.profilePicture} alt={shortName(client.username)} className=' object-cover ' />
                                                <AvatarFallback>{shortName(client.username)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-left flex flex-col">
                                                <span className=' font-semibold
                                                         '>{client.username}</span>
                                                <span className=" font-text text-gray-500">{client.email}</span>
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="w-full sm:w-[350px] flex items-center hover:bg-gray-100 justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                                            <span className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                                <Plus className="h-5 w-5 inline-block " />
                                            </span>
                                            <span>Select client</span>
                                        </span>
                                    )}
                                </ClientDropDown>
                            </Card>
                        )}

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
                        <Card className=' p-3 '>
                            <div id="services"></div>
                            <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedServices} />
                        </Card>
                    </form>
                </Form>
            </StepperScrollLayout>

        </>
    )
}

export default CreateAppointmentPage
