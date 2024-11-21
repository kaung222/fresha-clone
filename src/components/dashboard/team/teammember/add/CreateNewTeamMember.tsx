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

type SectionDataType = {
    id: string;
    name: string;
    section: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}



export default function CreateNewTeamMember() {
    const profileRef = useRef<HTMLDivElement | null>(null);
    const employeeRef = useRef<HTMLDivElement | null>(null);
    const serviceRef = useRef<HTMLDivElement | null>(null);
    const [activeSection, setActiveSection] = useState<string>('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const { mutate, isPending } = useCreateMember()
    const router = useRouter();
    const form = useForm();
    console.log(selectedServices)

    const sectionData: SectionDataType[] = [
        {
            id: '1',
            name: 'Profile',
            section: 'profile',
            ref: profileRef
        },
        {
            id: '2',
            name: 'Employment Details',
            section: 'work',
            ref: employeeRef
        },
        {
            id: '3',
            name: 'Service',
            section: 'service',
            ref: serviceRef
        }
    ]

    const handleSave = (values: any) => {
        console.log(values);
        const payload = { ...values, experience: Number(values.experience), serviceIds: selectedServices }
        mutate(payload, {
            onSuccess() {

            }
        })
    }

    useEffect(() => {
        console.log(activeSection)
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            })
        }, options);

        sectionData.forEach((section) => {
            if (section.ref.current) {
                observer.observe(section.ref.current);
            }
        });


        return () => {
            sectionData.forEach((section) => {
                if (section.ref.current) {
                    observer.unobserve(section.ref.current);
                }
            })
        }

    }, [activeSection]);

    const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {

        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <>
            <div className="flex w-full max-h-full h-h-full-minus-80 max-w-[1038px] ">
                <Form {...form}>
                    <form className=' flex gap-20 w-full h-full' onSubmit={form.handleSubmit(handleSave)}>
                        <Card style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto p-5 pb-10 ">

                            <Profile profileRef={profileRef} form={form} />
                            <div className=" h-20"></div>
                            <EmployeeData employeeRef={employeeRef} form={form} />
                            <div className=" h-20"></div>
                            <AddTeamMemberService serviceRef={serviceRef} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
                            <div className="flex justify-between space-x-4 gap-5 mt-auto md:hidden mb-10 ">
                                <Button type="button" className=" w-full " onClick={() => router.push('/manage/teammember')} variant="outline">Cancel</Button>
                                <Button disabled={isPending} type="submit" className=" w-full " >
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
                        </Card>

                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 hidden md:flex flex-col gap-5 h-full overflow-auto pb-10 ">
                            <div className="space-y-4 flex-grow relative flex flex-col gap-[88px]">
                                {sectionData.map((data) => (
                                    <div key={data.id} onClick={() => scrollToSection(data.ref)} className="flex cursor-pointer items-center">
                                        <div className={`w-8 h-8  text-gray-500 ${(data.section == activeSection) ? "bg-black text-white " : " bg-gray-200 "}  rounded-full flex items-center justify-center mr-4`}>{data.id}</div>
                                        <span className={`  ${(data.section == activeSection ? " font-medium" : 'text-gray-500')} `} >{data.name}</span>
                                    </div>
                                ))}
                                <div className=' absolute w-full h-full border-l-2 top-0 left-4 z-[-20] '></div>
                            </div>
                            <div className="flex justify-between space-x-4 gap-5 mt-auto">
                                <Button type="button" className=" w-full " onClick={() => router.push('/manage/teammember')} variant="outline">Cancel</Button>
                                <Button disabled={isPending} type="submit" className=" w-full " >
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
                            <div className=" h-5"></div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}