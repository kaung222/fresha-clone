import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import { useLocalstorage } from '@/lib/helpers'
import { Member } from '@/types/member'
import { z } from 'zod'
import { MemberSchema } from '@/validation-schema/member.schema'

type Props = {
    form: UseFormReturn<z.infer<typeof MemberSchema>, any, undefined>
    member: Member;
}

const EmployeeData = ({ form, member }: Props) => {
    const { getData, setData } = useLocalstorage();

    return (
        <>
            <div>
                <div className="text-xl font-semibold mb-1">📋 Employment Details</div>
                <p className="text-gray-500 pl-7">Manage team member&apos;s start dates and employment details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                    form={form}
                    name='startDate'
                    type='date'
                    label='🗓️ Start Date'
                />
                <FormInput
                    form={form}
                    name='experience'
                    label='📜 Experience(years)'
                    type='number'
                    placeholder='eg. 1'
                />
                <FormSelect
                    form={form}
                    name='type'
                    label='🔖 Employment Type'
                    defaultValue={member.type}
                    options={[{ name: 'self-employed', value: 'self-employed' }, { name: 'employee', value: 'employee' }]}
                />
                <FormInput
                    form={form}
                    name='memberId'
                    label='🆔 Member ID'
                    placeholder='eg. HS123'
                />
                <FormSelect
                    form={form}
                    name='commissionFeesType'
                    label='💲 Commission Fees Type'
                    defaultValue={member.commissionFeesType}
                    options={[{ name: "Percent", value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                />
                <FormInput
                    form={form}
                    name='commissionFees'
                    label='💰 Commission Fees(per service)'
                    placeholder='0'
                    description='Default commission fees, you can also change it at payment process'
                />
                <div className=' col-span-1 sm:col-span-2 '>

                    <FormTextarea
                        form={form}
                        label='📝 Notes'
                        name='notes'
                    />
                </div>

            </div>
        </>


    )
}


export default EmployeeData