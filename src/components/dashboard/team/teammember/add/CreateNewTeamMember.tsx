'use client'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Bell, Camera, ChevronDown, Search, X } from 'lucide-react'
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

type SectionDataType = {
    id: string;
    name: string;
    section: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}



export default function CreateNewTeamMember() {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams();
    const profileRef = useRef<HTMLDivElement | null>(null);
    const employeeRef = useRef<HTMLDivElement | null>(null);
    const serviceRef = useRef<HTMLDivElement | null>(null);
    const [activeSection, setActiveSection] = useState<string>('')
    const router = useRouter();
    const form = useForm();

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

    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        console.log(activeSection)
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from(Array(101).keys(), t => t / 100)
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

    }, [sectionData, activeSection]);

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
            <div className="flex w-full max-h-full h-h-full-minus-96 max-w-[1038px] ">
                <Form {...form}>
                    <form className=' flex gap-20 w-full h-full' action="">

                        <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto  ">

                            <Profile profileRef={profileRef} form={form} />
                            <div className=" h-20"></div>
                            <EmployeeData employeeRef={employeeRef} form={form} />
                            <div className=" h-20"></div>
                            <AddTeamMemberService serviceRef={serviceRef} form={form} />
                        </div>

                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 flex flex-col gap-5 h-full overflow-auto ">
                            <div className="space-y-4 flex-grow flex flex-col gap-[88px]">
                                {sectionData.map((data) => (
                                    <div key={data.id} onClick={() => scrollToSection(data.ref)} className="flex cursor-pointer items-center">
                                        <div className={`w-8 h-8  text-gray-500 ${(data.section == activeSection) ? "bg-black text-white " : ""}  rounded-full flex items-center justify-center mr-4`}>{data.id}</div>
                                        <span className={`  ${(data.section == activeSection ? " font-medium" : 'text-gray-500')} `} >{data.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between space-x-4 gap-5 mt-auto">
                                <Button type="button" className=" w-full " onClick={() => router.push('/team/teammember')} variant="outline">Cancel</Button>
                                <Button type="button" className=" w-full " >Save</Button>


                            </div>
                            <div className=" h-5"></div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}