'use client'
import { MutableRefObject, useState } from 'react'
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
import Image from 'next/image'
import FormInputFile from '@/components/common/FormInputFile'
import { countriesArray } from '@/lib/data'
import { MemberSchema } from '@/validation-schema/member.schema'
import { z } from 'zod'
import FormLanguageAdd from './FormLanguageAdd'

type Props = {
    form: UseFormReturn<z.infer<typeof MemberSchema>, any, undefined>;
}
export default function Profile({ form }: Props) {

    const profileImage = form.watch('profilePictureUrl');

    return (

        <>
            <div className=' mb-6 '>
                <div className="text-xl font-semibold mb-1">🧑‍💼 Personal Info</div>
                <p className="text-gray-500 pl-7">Team member personal information.</p>
            </div>
            <div className="mb-6 flex justify-start p-3 ">
                <Label htmlFor="thumbnail" className="relative w-32 h-32 bg-gray-100 rounded-full border border-slate-500 flex items-center justify-center ">
                    {profileImage ? (
                        <Image width={300} height={500} src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                    )}
                    <FormInputFile
                        form={form}
                        name='profilePictureUrl'
                        id='thumbnail'
                    />
                </Label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                <FormInput
                    form={form}
                    label='🧑‍💼 First Name'
                    id='firstName'
                    name='firstName'
                    placeholder='eg. Michael'
                    required
                />
                <FormInput
                    form={form}
                    label="🧑‍⚖️ Last Name"
                    id="lastName"
                    name="lastName"
                    placeholder='eg. Johnson'
                />
                <FormInput
                    form={form}
                    label='📧 Email'
                    id='email'
                    name='email'
                    placeholder='eg. example@gmail.com'
                    required
                />
                <FormInput
                    form={form}
                    label='📞 Phone number'
                    id='phone'
                    type='tel'
                    name='phone'
                    required
                    placeholder='eg. +959 123 456 789'
                />
                <FormInput
                    form={form}
                    label='🎂 Date of birth'
                    id='dob'
                    type='date'
                    name='dob'
                    placeholder='10/4/2000'
                />
                <FormSelect
                    form={form}
                    name='gender'
                    label='⚧️ Gender'
                    options={[{ name: "Male", value: 'male' }, { name: 'Female', value: 'female' }]}
                    placeholder='Select gender'
                />
                <FormSelect
                    form={form}
                    name='country'
                    label='🌍 Country'
                    options={countriesArray}
                    placeholder='Choose Country'
                />
                <FormInput
                    form={form}
                    name='jobTitle'
                    label='💼 Job Title'
                    id='jobTitle'
                    placeholder='eg. Hair Stylist'
                />
                <div className="col-span-1 sm:col-span-2 ">
                    <FormLanguageAdd
                        form={form}
                        name='languageProficiency'
                        label='🌐 Languages'
                    />
                </div>

            </div>

        </>

    )
}