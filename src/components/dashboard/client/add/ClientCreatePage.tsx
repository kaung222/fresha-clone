'use client'
import { useState } from 'react'
import { Bell, Building2, Camera, Home, Loader2, MapPin, MoreHorizontal, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import ProfileDropdown from '@/components/layout/ProfileDropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FormInputFile from '@/components/common/FormInputFile'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/common/FormInput'
import { Form } from '@/components/ui/form'
import FormSelect from '@/components/common/FormSelect'
import { CreateClient } from '@/api/client/create-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
type AddressType = 'Home' | 'Work' | 'Other'
export default function AddNewClient() {
    const { mutate, isPending } = CreateClient()
    const form = useForm();
    const router = useRouter()
    const profileImage = form.watch('profilePicture')

    const handleSaveClient = (values: any) => {
        console.log(values);
        mutate(values)
    }


    return (
        <>
            <StepperScrollLayout
                title='Create new Client'
                handlerComponent={(
                    <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" onClick={() => router.push('/manage/client')}>Close</Button>
                        <Button disabled={isPending} type='submit' form='client-create-form'>
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
                )}
                sectionData={[]}
            >
                <Form {...form}>
                    <form id='client-create-form' onSubmit={form.handleSubmit(handleSaveClient)} className=' space-y-10 pb-40 w-full  '>

                        <div className="flex gap-20 w-full max-h-full h-h-full-minus-96 max-w-[1038px]">
                            <Card style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 h-full overflow-auto p-3 pb-20 space-y-10 ">
                                <h1 className=' text-xl font-medium text-zinc-900 '>Profile</h1>
                                <div className="mb-6 flex justify-start">
                                    <Label htmlFor="thumbnail" className="relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center ">
                                        {profileImage ? (
                                            <Image width={300} height={500} src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <Camera className="h-8 w-8 text-gray-400" />
                                        )}
                                        <FormInputFile
                                            form={form}
                                            name='profilePicture'
                                            id='thumbnail'
                                        />
                                    </Label>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        form={form}
                                        name='firstName'
                                        label='First Name *'
                                    />
                                    <FormInput
                                        form={form}
                                        name='lastName'
                                        label='Last Name'
                                    />
                                    <FormInput
                                        form={form}
                                        name='email'
                                        label='Email*'
                                        type='email'
                                    />
                                    <FormInput
                                        form={form}
                                        name='phone'
                                        label='Phone number'
                                    />
                                    <FormInput
                                        form={form}
                                        name='dob'
                                        label='Date Of Birth'
                                        type='date'
                                    />
                                    <FormSelect
                                        form={form}
                                        name='gender'
                                        label='Gender'
                                        options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'None', value: 'none' }]}
                                    />
                                </div>

                            </Card>
                        </div>
                    </form>
                </Form>

            </StepperScrollLayout>


        </>
    )
}