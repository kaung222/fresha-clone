'use client'
import { useState } from 'react'
import { Bell, Camera, ChevronDown, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FormInput from '@/components/common/FormInput'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormSelect from '@/components/common/FormSelect'
import { useLocalstorage } from '@/lib/helpers'

type Props = {
    form: UseFormReturn<FieldValues, any, undefined>;
    handleSave: (value: any) => void;
}
export default function Profile({ form, handleSave }: Props) {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const { setData, getData } = useLocalstorage()
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

    const handleSecond = (values: any) => {
        console.log('heloo', values)
    }

    return (
        <>
            <div style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto  ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSecond)}>

                        <div className="mb-6 flex justify-center">
                            <div className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <Camera className="h-8 w-8 text-gray-400" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                form={form}
                                label='First Name *'
                                id='firstName'
                                name='firstName'
                            />
                            <FormInput
                                form={form}
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                            />
                            <FormInput
                                form={form}
                                label='Email*'
                                id='email'
                                name='email'
                            />
                            <FormInput
                                form={form}
                                label='Phone number'
                                id='phone'
                                type='tel'
                                name='phone'
                            />
                            <FormInput
                                form={form}
                                label='Date of birth'
                                id='dob'
                                type='date'
                                name='dob'
                            />
                            <FormSelect
                                form={form}
                                name='country'
                                label='Country'
                                options={[{ name: 'United States', value: 'us' }, { name: 'United Kingdom', value: 'uk' }, { name: "Canada", value: 'ca' }]}
                            />
                            <FormInput
                                form={form}
                                name='jobTitle'
                                label='Job Title'
                                id='jobTitle'
                            />

                            <Button type="submit">
                                save
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className=" h-5 "></div>

            </div>
        </>
    )
}