'use client'
import { useState } from 'react'
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
}

const sectionData: SectionDataType[] = [
    {
        id: '1',
        name: 'Profile',
        section: 'profile'
    },
    {
        id: '2',
        name: 'Employment Details',
        section: 'work',
    },
    {
        id: '3',
        name: 'Service',
        section: 'service'
    }
]

export default function CreateNewTeamMember() {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams();
    const section = getQuery('section');
    const router = useRouter();
    const formProfile = useForm();
    const formTwo = useForm();

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

    return (
        <>
            <div className="flex gap-20 w-full max-h-full h-h-full-minus-96 max-w-[1038px] ">
                {section == 'service' ? (
                    <AddTeamMemberService />
                ) : section == "work" ? (
                    <EmployeeData />
                ) : (
                    <Profile form={formProfile} handleSave={handleSave} />
                )}
                <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 flex flex-col h-full overflow-auto ">
                    <div className="space-y-4 flex-grow flex flex-col gap-[88px]">
                        {sectionData.map((data) => (
                            <div key={data.id} onClick={() => setQuery({ key: 'section', value: data.section })} className="flex cursor-pointer items-center">
                                <div className={`w-8 h-8 ${section == data.section ? "bg-black text-white " : " "} text-gray-500 ${(!section && data.section == 'profile') ? "bg-black text-white " : ""}  rounded-full flex items-center justify-center mr-4`}>{data.id}</div>
                                <span className={` ${section == data.section ? " font-medium" : ' text-gray-500 '} ${(!section && data.section == 'profile' ? " font-medium" : '')} `} >{data.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4 mt-auto">
                        {section == 'service' ? (
                            <Button type="button" onClick={() => setQuery({ key: 'section', value: 'work' })} variant="outline">Back</Button>
                        ) : section == 'work' ? (
                            <Button type="button" onClick={() => setQuery({ key: 'section', value: 'profile' })} variant="outline">Back</Button>
                        ) : (
                            <Button type="button" onClick={() => router.push('/team/teammember')} variant="outline">Cancel</Button>
                        )}
                        {section == "service" ? (
                            <Button type="button" >Save</Button>
                        ) : section == 'work' ? (
                            <Button type="button" onClick={() => setQuery({ key: 'section', value: 'service' })}>Next</Button>
                        ) : (
                            <Button type="button" onClick={formProfile.handleSubmit(handleSave)} >Next</Button>
                        )}
                    </div>
                    <div className=" h-5"></div>
                </div>
            </div>
        </>
    )
}