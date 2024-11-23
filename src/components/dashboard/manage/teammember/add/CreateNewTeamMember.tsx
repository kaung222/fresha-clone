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
import AddTeamMemberService from './Service'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useCreateMember } from '@/api/member/create-member'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'

type SectionDataType = {
    id: string;
    name: string;
    section: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}



export default function CreateNewTeamMember() {
    // const profileRef = useRef<HTMLDivElement | null>(null);
    // const employeeRef = useRef<HTMLDivElement | null>(null);
    // const serviceRef = useRef<HTMLDivElement | null>(null);
    const [activeSection, setActiveSection] = useState<string>('profile');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const { mutate, isPending } = useCreateMember()
    const router = useRouter();
    const form = useForm();


    const handleSave = (values: any) => {
        const payload = { ...values, experience: Number(values.experience), serviceIds: selectedServices }
        mutate(payload, {
            onSuccess() {

            }
        })
    }



    return (
        <>
            <StepperScrollLayout
                title='Create new member'
                handlerComponent={(
                    <div className=" flex items-center ">
                        <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/teammember')}>Close</Button>
                        <Button type="submit" disabled={isPending} form="create-teammember">
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
            >

                <Form {...form}>
                    <form id='create-teammember' className='space-y-10 pb-40 w-full  ' onSubmit={form.handleSubmit(handleSave)}>
                        <div className=' ' id='profile'>
                            <Profile form={form} />
                            <div className=" h-20"></div>
                        </div>
                        <div className=' ' id='work'>
                            <EmployeeData form={form} />
                            <div className=" h-20"></div>
                        </div>
                        <div>

                            <AddTeamMemberService selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
                        </div>
                    </form>
                </Form>
            </StepperScrollLayout>

        </>
    )

}

