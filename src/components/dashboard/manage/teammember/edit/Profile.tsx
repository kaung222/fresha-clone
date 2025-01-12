'use client'
import { Camera } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import FormInput from '@/components/common/FormInput'
import { UseFormReturn } from 'react-hook-form'
import FormSelect from '@/components/common/FormSelect'
import { Member } from '@/types/member'
import { countriesArray } from '@/lib/data'
import { z } from 'zod'
import { MemberSchema } from '@/validation-schema/member.schema'
import FormLanguageAdd from '../add/FormLanguageAdd'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'
import FormInputPhone from '@/components/common/FormInputPhone'

type Props = {
    form: UseFormReturn<z.infer<typeof MemberSchema>, any, undefined>;
    member: Member;
}
export default function Profile({ form, member }: Props) {
    const profileImage = form.watch('profilePictureUrl');

    return (

        <>

            <div className=' mb-6 '>
                <div className="text-xl font-semibold mb-1">🧑‍💼 Personal Info</div>
                <p className="text-gray-500 pl-7">Team member personal information.</p>
            </div>
            <div className="mb-6 flex justify-start p-3">
                <Label htmlFor='thumbnailUrl' className="relative w-32 h-32 bg-gray-100 border border-slate-400 rounded-full flex items-center justify-center">
                    {profileImage ? (
                        <Avatar className=' size-32 '>
                            <AvatarImage src={profileImage} alt={'profile'} className=' object-cover ' />
                            <AvatarFallback>{'profile'}</AvatarFallback>
                        </Avatar>
                        // <Image width={300} height={500} src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                    )}
                    <FormInputFileCrop
                        form={form}
                        name='profilePictureUrl'
                        id='thumbnailUrl'
                        aspectRatio={1 / 1}
                    />
                </Label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                    form={form}
                    label='🧑‍💼 First Name '
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
                    required
                    placeholder='eg. example@gmail.com'
                />
                <FormInputPhone
                    form={form}
                    name='phone'
                    id='phone'
                    label='📞 Phone number'
                    required
                />
                <FormInput
                    form={form}
                    label='🎂 Date of birth'
                    id='dob'
                    type='date'
                    name='dob'
                />
                <FormSelect
                    form={form}
                    name='gender'
                    label='⚧️ Gender'
                    defaultValue={member.gender}
                    placeholder='Choose gender'
                    options={[{ name: "Male", value: 'male' }, { name: 'Female', value: 'female' }]}
                />
                <FormSelect
                    form={form}
                    name='country'
                    label='🌍 Country'
                    defaultValue={member.country}
                    placeholder='Select Country'
                    options={countriesArray}
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
                        label='🌐 Languages'
                        name='languageProficiency'
                        defaultValue={member.languageProficiency ? member.languageProficiency : []}
                    />
                </div>

            </div>
        </>

    )
}