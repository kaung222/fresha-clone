'use client'
import { useState } from 'react'
import { Bell, Building2, Camera, Home, Loader2, MapPin, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ProfileDropdown from '@/components/layout/ProfileDropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "react-datepicker/dist/react-datepicker.css";
import { Card } from '@/components/ui/card'
import DatePicker from 'react-datepicker'
import { CreateAppointment } from '@/api/appointment/create-appointment'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { generateTimeArray } from '@/lib/data'
import { Textarea } from '@/components/ui/textarea'
import { GetTeamMember } from '@/api/member/get-teammember'
import { GetAllClients } from '@/api/client/get-all-clients'
import { Member } from '@/types/member'
import { Client } from '@/types/client'
import { shortName } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import MemberDropdown from '../../appointment/create/member-dropdown'
import ClientDropDown from '../../appointment/create/client-dropdown'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'


const PaymentQuickAdd = () => {
    const { mutate, isPending } = CreateAppointment()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const { data: allMembers } = GetTeamMember();
    const { data: allClients } = GetAllClients();
    const [selectedService, setSelectedServices] = useState<string[]>([]);
    const [client, SetClient] = useState<Client | null>(null)
    const [member, setMember] = useState<Member | null>(null)
    const [notes, setNotes] = useState<string>('');
    const [time, setTime] = useState<number>(3600)
    const form = useForm();
    const router = useRouter()
    const profileImage = form.watch('profilePicture');


    const handleSaveClient = (values: any) => {
        console.log(values);
        if (!client) {
            return toast({ title: 'need to choose client' })
        }
        if (!member) {
            return toast({ title: 'need to choose member' })
        }

        const payload = {
            date: format(currentDate, "yyyy-MM-dd"),
            clientId: client?.id,
            start: time,
            username: `${client.firstName} ${client.lastName}`,
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
            <div className="flex z-[60] bg-white flex-col h-screen fixed w-screen top-0 left-0">
                <header className="flex h-[80px] items-center justify-between px-10 py-5 bg-white border-[#E5E5E5] border-b">
                    <Link href={'/dashboard'} className="text-2xl leading-[20px] font-bold text-logo ">fresha</Link>
                    <div className="flex items-center gap-[10px] ">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <ProfileDropdown>
                            <Avatar className=' w-11 h-11 '>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PP" />
                                <AvatarFallback>PP</AvatarFallback>
                            </Avatar>
                        </ProfileDropdown>
                    </div>
                </header>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveClient)} className=' flex pb-0 flex-col gap-5 px-10 h-h-screen-minus-80  '>
                        <div className="flex justify-between items-center py-8 ">
                            <div>
                                <h1 className="text-2xl font-bold">Create appointment</h1>
                                {/* <p className="text-gray-500">Manage the personal profiles of your team members.</p> */}
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.push('/appointments/appointments')}>Cancel</Button>
                                <Button disabled={isPending} type='submit'>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            adding...
                                        </>
                                    ) : (
                                        'Add'
                                    )}
                                </Button>
                            </div>
                        </div>


                        <div className="flex gap-20 w-full max-h-full h-h-full-minus-96 max-w-[1038px]">
                            <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto p-3 pb-20 space-y-10 ">
                                {allMembers && (
                                    <Card className=' p-3 '>
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
                                    <Card className=' p-3 '>
                                        <h1 className=' font-semibold text-zinc-900 '>Select Client</h1>
                                        <ClientDropDown setClient={SetClient} allClients={allClients}>
                                            {client ? (
                                                <span className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
                                                    <Avatar className="h-16 w-16 ">
                                                        <AvatarImage src={client.profilePicture} alt={shortName(client.firstName)} className=' object-cover ' />
                                                        <AvatarFallback>{shortName(client.firstName)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-left flex flex-col">
                                                        <span className=' font-semibold
                                                         '>{client.firstName} {client.lastName}</span>
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
                                <Card className=' p-3 '>
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
                                                    <button style={{ background: 'white' }} className="  ">{format(currentDate, "MMMM d, yyyy")}</button>
                                                }
                                                className=''
                                                popperPlacement='right'
                                                popperClassName=' '
                                                calendarClassName=' '
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <FormInput
                                            form={form}
                                            name='amount'
                                            label='Total Amount'
                                            type='number'
                                        />
                                    </div>
                                    <div>
                                        <FormTextarea
                                            form={form}
                                            name='notes'
                                            label='Notes'
                                            placeholder='If you have something about this payment write here...'
                                        />
                                    </div>
                                </Card>
                                <Card className=' p-3 '>
                                    {/* <AppointmentServiceSelect selectedServices={selectedService} setSelectedServices={setSelectedServices} /> */}
                                </Card>

                            </div>
                        </div>
                    </form>
                </Form>

            </div>


        </>
    )
}

export default PaymentQuickAdd