'use client'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Bell, Camera, ChevronDown, Loader2, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import Profile from './Profile'
import EmployeeData from './EmployeeDetail'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { GetSingleMember } from '@/api/member/get-single-member'
import { zodResolver } from '@hookform/resolvers/zod'
import { MemberSchema } from '@/validation-schema/member.schema'
import { EditMember } from '@/api/member/edit-member'
import { Card } from '@/components/ui/card'
import AddTeamMemberService from '../add/Service'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import PageLoading from '@/components/common/page-loading'
import { z } from 'zod'
import { checkChange } from '@/lib/utils'
import ConfirmDialog from '@/components/common/confirm-dialog'

type SectionDataType = {
    id: string;
    name: string;
    section: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}



export default function EditTeamMember() {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams();
    const [activeSection, setActiveSection] = useState<string>('profile')
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const { teamId } = useParams();
    const { mutate: update, isPending } = EditMember(String(teamId))
    const { data: teamMember, isLoading } = GetSingleMember(String(teamId));
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            firstName: '',
            email: '',
            phone: '',
            type: 'employee',
            commissionFeesType: '',
            commissionFees: 0,
        }
    });

    useEffect(() => {
        if (teamMember) {
            const resetData: z.infer<typeof MemberSchema> = {
                firstName: teamMember?.firstName,
                languageProficiency: teamMember?.languageProficiency,
                lastName: teamMember?.lastName,
                email: teamMember?.email,
                phone: teamMember?.phone,
                dob: teamMember?.dob,
                profilePictureUrl: teamMember?.profilePictureUrl,
                gender: teamMember?.gender,
                jobTitle: teamMember?.jobTitle,
                notes: teamMember?.notes,
                startDate: teamMember?.startDate,
                experience: teamMember?.experience,
                memberId: teamMember?.memberId,
                type: teamMember?.type,
                country: teamMember?.country,
                commissionFees: teamMember.commissionFees,
                commissionFeesType: teamMember.commissionFeesType
            }
            form.reset(resetData);
            setSelectedServices(teamMember?.services.map((service) => String(service.id)))
        }
    }, [teamMember, form])

    const handleSave = (values: z.infer<typeof MemberSchema>) => {
        const payload = { ...values, experience: Number(values.experience), serviceIds: selectedServices };
        console.log(payload);
        update(payload);
    }

    return (
        <>
            <StepperScrollLayout
                title='Edit member'
                handlerComponent={(
                    <div className=" flex items-center gap-2 ">
                        {
                            teamMember && checkChange([
                                { first: teamMember.firstName, second: form.watch('firstName') },
                                { first: teamMember.email, second: form.watch('email') },
                                { first: teamMember.phone, second: form.watch('phone') },
                            ]) ? (
                                <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/manage/teammember`)}>
                                    <span className=' cursor-pointer  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                                </ConfirmDialog>
                            ) : (
                                <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/teammember')}>Close</Button>
                            )
                        }
                        <Button type="submit" disabled={isPending} form="edit-teammember">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'profile', name: "Profile" }, { id: "work", name: "Employee Detail" }, { id: 'services', name: "Services" }]}
                editData={teamMember}
                threshold={0.2}
            >
                {isLoading ? (
                    <PageLoading />
                ) : teamMember && (

                    <Form {...form}>
                        <form id='edit-teammember' className='space-y-10 pb-40 w-full  ' onSubmit={form.handleSubmit(handleSave)}>
                            <div id='profile'>
                                <Profile form={form} member={teamMember} />
                            </div>
                            <div id='work'>

                                <div className=" h-20"></div>
                                <EmployeeData form={form} member={teamMember} />
                            </div>


                            <div className=" h-20"></div>
                            <AddTeamMemberService selectedServices={selectedServices} setSelectedServices={setSelectedServices} previousServices={teamMember.services?.map(ser => ser.id.toString())} />

                        </form>
                    </Form>
                )}

            </StepperScrollLayout>



        </>
    )
}
