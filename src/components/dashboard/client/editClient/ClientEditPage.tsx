'use client'
import { useEffect, useState } from 'react'
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
import { useParams, useRouter } from 'next/navigation'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetSingleClient } from '@/api/client/get-single-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClientSchema } from '@/validation-schema/client.schema'
import { UpdateClient } from '@/api/client/update-client'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
type AddressType = 'Home' | 'Work' | 'Other'


export default function ClientEditPage() {
    const { clientId } = useParams()
    const { mutate, isPending } = UpdateClient(String(clientId));
    const form = useForm({
        resolver: zodResolver(ClientSchema),
        defaultValues: {
            profilePicture: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            dob: ''
        }
    });
    const router = useRouter();
    const profileImage = form.watch('profilePicture');
    const { data: clientData } = GetSingleClient(String(clientId));

    const handleSaveClient = (values: any) => {
        console.log(values);
        mutate(values)
    }

    useEffect(() => {
        if (clientData) {
            form.reset({
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                profilePicture: clientData.profilePicture,
                email: clientData.email,
                phone: clientData.phone,
                dob: clientData.dob,
                gender: clientData.gender
            })
        }
    }, [clientData])



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
                    <form onSubmit={form.handleSubmit(handleSaveClient)} className=' flex flex-col gap-5 px-10 pb-0 h-h-screen-minus-80  '>
                        <div className="flex justify-between items-center py-8">
                            <div>
                                <h1 className="text-2xl font-bold">Add new client</h1>
                                {/* <p className="text-gray-500">Manage the personal profiles of your team members.</p> */}
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={() => router.push('/client')}>Cancel</Button>
                                <Button type='submit'>
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
                        </div>

                        {clientData && (
                            <div className="flex gap-20 w-full max-h-full h-h-full-minus-96 max-w-[1038px]">
                                <Card style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="flex-1 p-3 h-full overflow-auto pb-20 space-y-10 ">
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
                                            defaultValue={clientData?.gender}
                                            options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'None', value: 'none' }]}
                                        />
                                    </div>

                                </Card>
                            </div>
                        )}

                    </form>
                </Form>

            </div>


        </>
    )
}