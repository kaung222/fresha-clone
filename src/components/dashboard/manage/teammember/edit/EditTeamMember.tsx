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
    // console.log(teamMember);
    const router = useRouter();
    const form = useForm({
        // resolver: zodResolver(MemberSchema),
        // defaultValues: {
        //     languageProficiency: [],
        //      firstName:'',
        //     lastName: '',
        //     email: '',
        //     phone: '', 
        //     dob: '',
        //     profilePictureUrl: '',
        //     gender: '',
        //     jobTitle: '',   
        //     notes: '',
        //     startDate: '',
        //     experience: null,
        //     memberId: '',
        //     type: '',
        //     address: '',
        //     country: ''
        // }
    });
    useEffect(() => {
        if (teamMember) {
            form.reset({
                languageProficiency: teamMember?.languageProficiency,
                firstName: teamMember?.firstName,
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
                country: teamMember?.country
            });

            setSelectedServices(teamMember?.services.map((service) => String(service.id)))
        }
    }, [teamMember, form])

    const handleSave = (values: any) => {
        const payload = { ...values, experience: Number(values.experience), serviceIds: selectedServices };
        console.log(payload);
        update(payload);
    }


    return (
        <>
            <StepperScrollLayout
                title='Edit member'
                handlerComponent={(
                    <div className=" flex items-center ">
                        <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/teammember')}>Close</Button>
                        <Button type="submit" disabled={isPending} form="edit-teammember">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'profile', name: "Profile" }, { id: "work", name: "Employee Detail" }, { id: 'services', name: "Services" }]}
                editData={teamMember}
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
                            <AddTeamMemberService selectedServices={selectedServices} setSelectedServices={setSelectedServices} />

                        </form>
                    </Form>
                )}

            </StepperScrollLayout>



        </>
    )
}
