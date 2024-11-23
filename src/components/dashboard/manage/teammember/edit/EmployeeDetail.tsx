import React, { MutableRefObject, Profiler, useEffect, useState } from 'react'
import { Bell, ChevronDown, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import { useLocalstorage } from '@/lib/helpers'
import FormTags from '@/components/common/FormTags'
import { Member } from '@/types/member'

type Props = {
    form: UseFormReturn<FieldValues, any, undefined>
    member: Member;
}

const EmployeeData = ({ form, member }: Props) => {
    const { getData, setData } = useLocalstorage();

    return (
        <>
            <div className="text-xl font-semibold mb-2">Employment Details</div>
            <p className="text-gray-500 mb-6">Manage team member&apos;s start dates and employment details.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                    form={form}
                    name='startDate'
                    type='date'
                    label='Start Date'
                />
                <FormInput
                    form={form}
                    name='experience'
                    label='Experience'
                    type='number'
                    placeholder='1 year'
                />
                <div className="col-span-1 sm:col-span-2 ">
                    <FormTags
                        form={form}
                        label='Languages'
                        name='languageProficiency'
                        defaultValue={member.languageProficiency ? member.languageProficiency : []}
                    />
                </div>
                <FormSelect
                    form={form}
                    name='type'
                    label='Employment Type'
                    defaultValue={member.type}
                    options={[{ name: 'self-employed', value: 'self-employed' }, { name: 'employee', value: 'employee' }]}
                />
                <FormInput
                    form={form}
                    name='memberId'
                    label='Member ID'
                    placeholder='HS123'
                />
                <div className=' col-span-1 sm:col-span-2 '>

                    <FormTextarea
                        form={form}
                        label='Notes'
                        name='notes'
                    />
                </div>

            </div>
        </>


    )
}


export default EmployeeData