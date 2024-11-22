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
    const [activeSection, setActiveSection] = useState<string>('profile');
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
        console.log(activeSection)

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


            <div className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white  ">
                <div className="flex justify-between items-center w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
                    <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold">Create new member</h1>
                    <div className=" flex items-center ">
                        <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Cancel</Button>
                        <Button type="submit" disabled={isPending} form="add-service-form">
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
                </div>

                <div className=' h-h-full-minus-80 w-full ' >

                    {/* <div className=" flex gap-5 p-3 sticky top-0 z-[55] bg-[#ffffffb2] ">
                    <Button variant={activeTab == 'basic-details' ? 'default' : 'outline'} onClick={() => {
                        scrollToSection('basic-details');
                        setActiveTab('basic-details')
                    }} >Basic Details</Button>
                    <Button variant={activeTab == 'team-members' ? 'default' : 'outline'} onClick={() => {
                        scrollToSection('team-members');
                        setActiveTab('team-members')
                    }} >Team Members</Button>
                </div> */}

                    <Form {...form}>
                        <form className=' flex gap-20 w-full h-full p-10' onSubmit={form.handleSubmit(handleSave)}>
                            <Card style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto max-w-[886px] p-5 pb-10 ">
                                <Profile profileRef={profileRef} form={form} />
                                <div className=" h-20"></div>
                                <EmployeeData employeeRef={employeeRef} form={form} />
                                <div className=" h-20"></div>
                                <AddTeamMemberService serviceRef={serviceRef} selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
                            </Card>

                            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 hidden md:flex flex-col gap-5 h-full overflow-auto py-10 ">
                                <div className="flex-grow relative flex flex-col ">
                                    {sectionData.map((data, index) => (
                                        <div key={index} className={`${index == 0 ? " " : "flex-grow"} relative flex flex-col justify-end`}>
                                            <div onClick={() => scrollToSection(data.ref)} className={`flex cursor-pointer items-center `}>
                                                <div className={`w-8 h-8  text-gray-500 ${(data.section == activeSection) ? "bg-black text-white " : " bg-gray-200 "}  rounded-full flex items-center justify-center mr-4`}>{data.id}</div>
                                                <span className={`  ${(data.section == activeSection ? " font-medium" : 'text-gray-500')} `} >{data.name}</span>
                                            </div>
                                            {index != 0 && (
                                                <div className=' h-full bg-gray-400 w-1 absolute -top-1 left-[15px]  z-[-20] '></div>
                                            )}
                                        </div>
                                    ))}

                                </div>
                                {/* <div className="flex justify-between space-x-4 gap-5 mt-auto">
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


                            </div> */}
                                <div className=" h-5"></div>
                            </div>
                        </form>
                    </Form>

                </div>


            </div>
        </>
    )

}


