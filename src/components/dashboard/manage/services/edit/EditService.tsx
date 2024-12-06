'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import { durationData } from '@/lib/data'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import { CreateService } from '@/api/services/create-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import TeamMemberAddInEdit from './TeammemberInEdit'
import { GetSingleServiceById } from '@/api/services/get-single-service'
import { UpdateService } from '@/api/services/edit-service'
import { ServiceSchema } from '@/validation-schema/service.schema'
import { Card } from '@/components/ui/card'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import PageLoading from '@/components/common/page-loading'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { checkChange } from '@/lib/utils'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'


export default function EditServiceMode() {
    const [activeTab, setActiveTab] = useState('basic-detail');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const { data: organization } = GetOrganizationProfile();
    const router = useRouter()
    const { serviceId } = useParams()
    const { mutate, isPending } = UpdateService(String(serviceId));
    const { data: serviceDetail, isLoading } = GetSingleServiceById(String(serviceId));
    const form = useForm({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            name: '',
            price: 0,
            duration: 1800,
            priceType: 'fixed',
            description: '',
            targetGender: 'all',
            categoryId: 0,
            discount: 0,
            discountType: 'fixed',
        }
    })

    useEffect(() => {
        if (serviceDetail) {
            form.reset({
                name: serviceDetail.name,
                price: Number(serviceDetail.price),
                duration: serviceDetail.duration,
                categoryId: serviceDetail.category.id,
                priceType: serviceDetail.priceType,
                targetGender: serviceDetail.targetGender,
                description: serviceDetail.description,
                discount: Number(String(serviceDetail.discount)),
                discountType: serviceDetail.discountType
            })
            setSelectedMembers(serviceDetail.members.map(m => String(m.id)))
        }
    }, [serviceDetail, form]);

    const priceType = form.watch('priceType')
    const discountType = form.watch('discountType')

    const handleSubmit = (values: z.infer<typeof ServiceSchema>) => {
        const payload = {
            ...values,
            price: Number(values.price),
            duration: Number(values.duration),
            categoryId: Number(values.categoryId),
            memberIds: selectedMembers,
            discount: Number(values.discount),
        }
        console.log(payload);
        mutate(payload, {
            onSuccess() {
                router.push('/manage/services')
            }
        });
    }

    useEffect(() => {
        if (priceType == 'free') {
            form.setValue("price", 0)
        } else {
            form.setValue("price", Number(serviceDetail?.price))
        }
    }, [priceType, form, serviceDetail?.price])
    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())


    return (
        <StepperScrollLayout
            title='Edit service'
            handlerComponent={(
                <div className=' flex items-center gap-2 '>
                    {
                        notChanged ? (
                            <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Close</Button>
                        ) : (
                            <ConfirmDialog button="Leave" title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/manage/services`)}>
                                <span className=' cursor-pointer  px-4 py-2 rounded-lg border hover:bg-gray-100 '>Close</span>
                            </ConfirmDialog>
                        )
                    }
                    <Button type="submit" disabled={isPending} form='edit-service-form' >
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
            sectionData={[{ id: 'basic-details', name: 'Basic Information' }, { id: 'pricing', name: 'Pricing & Duration' }, { id: 'team-members', name: "Team members" }]}
            editData={serviceDetail}
            threshold={0.3}
        >
            {isLoading ? (
                <PageLoading />
            ) : serviceDetail && (
                <Form {...form}>
                    <form id="edit-service-form" className=' space-y-10 pb-40 w-full ' onSubmit={form.handleSubmit(handleSubmit)}>

                        <Card id='basic-details' className=" border grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 ">
                            <div className=' col-span-1 lg:col-span-2 '>

                                <div className="text-lg font-semibold mb-2">📝 Basic Details</div>
                                <p className=' text-text font-medium leading-text text-zinc-500 mb-8 '>Enter the name, category, and other basic information about your service.</p>
                            </div>

                            <div className=' col-span-1 lg:col-span-2 '>
                                <FormInput
                                    form={form}
                                    name='name'
                                    label='Service Name'
                                    placeholder='Add a service name'
                                    required
                                />
                            </div>
                            {categories && (
                                <FormSelect
                                    form={form}
                                    name='categoryId'
                                    label='Category'
                                    defaultValue={String(serviceDetail.category.id)}
                                    options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                />
                            )}
                            <FormSelect
                                form={form}
                                name='targetGender'
                                label='Target Gender'
                                defaultValue={serviceDetail.targetGender}
                                options={[{ name: 'All', value: 'all' }, { name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }]}
                            />


                            <div className=' col-span-1 lg:col-span-2 '>
                                <FormTextarea
                                    form={form}
                                    name='description'
                                    label='Description'
                                    placeholder='Description for more detail about service , write here ...'
                                />
                            </div>

                        </Card>
                        <Card id='pricing' className=" p-6 ">
                            <h3 className="text-lg font-semibold mb-2">💰 ⏱️ Pricing and duration</h3>
                            <p className=' text-text font-medium leading-text text-zinc-500 mb-8 '>Set the price, discounts, and duration for the service.</p>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <FormSelect
                                    form={form}
                                    name='duration'
                                    label='Duration'
                                    defaultValue={String(serviceDetail.duration)}
                                    options={durationData}
                                />
                                <FormSelect
                                    name='priceType'
                                    form={form}
                                    label='Price type'
                                    defaultValue={serviceDetail.priceType}
                                    options={[{ name: 'free', value: 'free' }, { name: 'from', value: 'from' }, { name: 'fixed', value: 'fixed' }]}
                                />
                                {/* <FormInput
                                    form={form}
                                    name='price'
                                    type='number'
                                    placeholder='0'
                                    label={`Price (${organization?.currency})`}
                                /> */}
                                {priceType == 'free' ? (
                                    <FormInput
                                        form={form}
                                        name='price'
                                        type='number'
                                        placeholder='0'
                                        defaultValue={0}
                                        disabled
                                        label={`Price (${organization?.currency})`}
                                    />
                                ) : (
                                    <FormInput
                                        form={form}
                                        name='price'
                                        type='number'
                                        placeholder='eg. 10000'
                                        label={`Price (${organization?.currency})`}
                                    />
                                )}
                                <FormSelect
                                    name='discountType'
                                    form={form}
                                    label='Discount type'
                                    defaultValue={serviceDetail?.discountType}
                                    options={[{ name: 'Percentage', value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                                />
                                <FormInput
                                    form={form}
                                    name='discount'
                                    type='number'
                                    placeholder='0'
                                    defaultValue={0}
                                    label={`Discount (%/${organization?.currency})`}
                                />
                            </div>
                        </Card>


                        <div id='team-members' className=' p-6 border border-zinc-200 '>
                            <TeamMemberAddInEdit selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                        </div>
                    </form>
                </Form>
            )}


        </StepperScrollLayout>
    )
}
