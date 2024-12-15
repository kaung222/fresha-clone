'use client'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
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
import { useForm, useFormState } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useCreateMember } from '@/api/member/create-member'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { MemberSchema } from '@/validation-schema/member.schema'
import { z } from 'zod'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { checkChange } from '@/lib/utils'

type SectionDataType = {
    id: string;
    name: string;
    section: string;
    ref: MutableRefObject<HTMLDivElement | null>;
}



export default function CreateNewTeamMember() {
    const [activeSection, setActiveSection] = useState<string>('profile');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const { mutate, isPending } = useCreateMember()
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            firstName: '',
            email: '',
            phone: '',
            type: 'employee',
            commissionFeesType: 'percent',
            commissionFees: 0
        }
    });

    const handleSave = (values: z.infer<typeof MemberSchema>) => {
        const payload = { ...values, phone: `+${values.phone.replace(/^\+/, '')}`, experience: Number(values.experience), serviceIds: selectedServices }
        mutate(payload, {
            onSuccess() {
                router.push(`/teammembers`);
            }
        })
    }

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())


    return (
        <>
            <StepperScrollLayout
                title='Create new member'
                handlerComponent={(
                    <div className=" flex items-center gap-2 ">
                        {
                            notChanged ? (
                                <Button variant="brandOutline" className=" " onClick={() => router.push('/teammembers')} >Close</Button>
                            ) : (
                                <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/teammembers`)}>
                                    <Button variant={'brandOutline'} className=''>Close</Button>
                                </ConfirmDialog>
                            )
                        }
                        <Button type="submit" variant={"brandDefault"} disabled={isPending} form="create-team-member" className=" " >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                )}
                sectionData={[{ id: 'profile', name: "Profile" }, { id: "work", name: "Employee Detail" }, { id: 'services', name: "Services" }]}
                threshold={0.2}
            >
                <Form {...form}>
                    <form id='create-team-member' className='space-y-10 pb-40 w-full  ' onSubmit={form.handleSubmit(handleSave)}>
                        <div className=' ' id='profile'>
                            <Profile form={form} />
                            <div className=" h-20"></div>
                        </div>
                        <div className=' ' id='work'>
                            <EmployeeData form={form} />
                            <div className=" h-20"></div>
                        </div>
                        <div>

                            <AddTeamMemberService selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
                        </div>
                    </form>
                </Form>
            </StepperScrollLayout>

        </>
    )

}

