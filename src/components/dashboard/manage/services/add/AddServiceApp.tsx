'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import TeamMemberAdd from './Teammember'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import { CreateService } from '@/api/services/create-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServiceSchema } from '../../../../../validation-schema/service.schema';
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Camera, Loader2, Plus } from 'lucide-react'
import { durationData } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Card } from '@/components/ui/card'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { checkChange } from '@/lib/utils'
import AddCategory from '../addCategory/add-category'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import FormInputFile from '@/components/common/FormInputFile'
import Image from 'next/image'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export default function AddNewService() {
    const [activeTab, setActiveTab] = useState('basic-details');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: organization } = GetOrganizationProfile();
    const { data: categories } = GetAllCategories();
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const categoryId = getQuery('category');
    const { mutate, isPending } = CreateService();
    const form = useForm({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            thumbnailUrl: undefined,
            name: '',
            type: '',
            price: 0,
            duration: 1800,
            priceType: 'fixed',
            description: '',
            targetGender: 'all',
            categoryId: 0,
            discountType: 'percent',
            discount: 0

        }
    })
    useEffect(() => {
        if (categoryId) {
            form.reset({
                name: '',
                type: '',
                price: 0,
                duration: 1800,
                priceType: 'fixed',
                description: '',
                targetGender: 'all',
                discount: 0,
                discountType: 'percent',
                categoryId: Number(categoryId)
            })
        }
    }, [categoryId, form])

    const handleAddService = (values: z.infer<typeof ServiceSchema>) => {
        const payload = {
            ...values,
            price: Number(values.price),
            duration: Number(values.duration),
            categoryId: Number(values.categoryId),
            memberIds: selectedMembers,
            discount: Number(values.discount),
        }
        mutate(payload);
    }

    const categoryOption = categories?.map((category) => ({ name: category.name, value: category.id }))

    const priceType = form.watch('priceType');
    useEffect(() => {
        if (priceType == 'free') {
            form.setValue("price", 0)
        }
    }, [priceType, form])

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues());
    const profileImage = form.watch('thumbnailUrl');


    return (
        <StepperScrollLayout
            title='Create service'
            handlerComponent={(
                <div className=" flex items-center gap-2 ">
                    {
                        notChanged ? (
                            <Button variant="brandOutline" className=" " onClick={() => router.push('/services')}>Close</Button>
                        ) : (
                            <ConfirmDialog button='Leave' title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/services`)}>
                                <Button variant={'brandOutline'} className=''>Close</Button>
                            </ConfirmDialog>
                        )
                    }
                    <Button type="submit" variant={'brandDefault'} disabled={isPending} form='add-service-form' className="">
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
            sectionData={[{ id: 'basic-details', name: "Basic Information" }, { id: 'pricing', name: "Pricing & Duration" }, { id: "team-members", name: "Team Members" }]}
            threshold={0.3}
        >
            <Form {...form}>
                <form id="add-service-form" className=' space-y-10 pb-40 w-full ' onSubmit={form.handleSubmit(handleAddService)}>

                    <Card id='basic-details' className=" border grid grid-cols-2 gap-4 md:gap-10 p-6 border-zinc-200 ">
                        <div className=' col-span-2 '>
                            <div className="text-lg font-semibold mb-2 ">📝 Basic Details</div>
                            <p className=' text-text font-medium leading-text text-zinc-500  '>Enter the name, category, and other basic information about your service.</p>
                        </div>

                        <div className=" flex justify-start p-3 col-span-2 ">
                            <Label htmlFor="serviceThumbnail" className="relative w-[250px] h-[200px] bg-gray-100 border border-slate-500 flex items-center justify-center ">
                                {profileImage ? (
                                    <Avatar className=' size-[250px] rounded-sm '>
                                        <AvatarImage src={profileImage} alt={'service'} className=' object-cover ' />
                                        <AvatarFallback className=" rounded-sm">{'service'}</AvatarFallback>
                                    </Avatar>
                                    // <Image width={300} height={500} src={profileImage} alt="Profile" className="w-full h-full object-cover " />
                                ) : (
                                    <Camera className="h-8 w-8 text-gray-400" />
                                )}
                                <FormInputFileCrop
                                    form={form}
                                    name='thumbnailUrl'
                                    id='serviceThumbnail'
                                    aspectRatio={1 / 1}
                                />
                            </Label>
                        </div>

                        <div className=' col-span-2'>
                            <FormInput
                                form={form}
                                name='name'
                                label='Service Name'
                                placeholder='Add a service name'
                                required
                            />
                        </div>
                        <div className=' col-span-2 md:col-span-1 '>
                            {categories && (
                                <FormSelect
                                    form={form}
                                    name='categoryId'
                                    label='Category'
                                    placeholder="Choose service category"
                                    defaultValue={String(categoryId)}
                                    options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                    emptyOptionComponent={(
                                        <>
                                            <div className=' block lg:hidden '>
                                                <Link href={`/services/service-categories`} className=' flex gap-3 px-4 py-2 '> <Plus className=' size-4 ' /> <span className=' text-sm font-medium '> Add New Category</span></Link>
                                            </div>
                                            <div className=' hidden lg:block '>
                                                <AddCategory>
                                                    <span className=' flex gap-3 px-4 py-2 '> <Plus className=' size-4 ' /> <span className=' text-sm font-medium '> Add New Category</span></span>
                                                </AddCategory>
                                            </div>
                                        </>
                                    )}
                                />
                            )}
                        </div>
                        <div className=' col-span-2 md:col-span-1 '>
                            <FormSelect
                                form={form}
                                name='targetGender'
                                label='Target Gender'
                                defaultValue='all'
                                options={[{ name: 'All', value: 'all' }, { name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }]}
                            />
                        </div>

                        <div className='col-span-2 '>
                            <FormTextarea
                                form={form}
                                name='description'
                                label='Description'
                                placeholder='Description for more detail about service , write here ...'
                            />
                        </div>
                    </Card>

                    <Card id='pricing' className=' p-6'>
                        <h3 className="text-lg font-semibold mb-2">💰 ⏱️ Pricing and Duration</h3>
                        <p className=' text-text font-medium leading-text text-zinc-500 mb-8 '>Set the price, discounts, and duration for the service.</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <FormSelect
                                form={form}
                                name='duration'
                                label='Duration'
                                defaultValue='1800'
                                options={durationData}
                            />
                            <FormSelect
                                name='priceType'
                                form={form}
                                label='Price type'
                                defaultValue='fixed'
                                options={[{ name: 'free', value: 'free' }, { name: 'from', value: 'from' }, { name: 'fixed', value: 'fixed' }]}
                            />
                            {priceType == 'free' ? (
                                <FormInput
                                    form={form}
                                    name='price'
                                    type='number'
                                    placeholder='0'
                                    defaultValue={0}
                                    disabled
                                    label={`Price (${organization?.currency ? organization?.currency : "MMK"})`}
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
                                defaultValue='percent'
                                options={[{ name: 'Percentage', value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                            />

                            <FormInput
                                form={form}
                                name='discount'
                                type='number'
                                label={`Discount  (%/${organization?.currency})`}
                                placeholder="0"
                                defaultValue={0}
                            />
                        </div>
                    </Card>


                    <div id='team-members' className=' p-6 border border-zinc-200 '>
                        <TeamMemberAdd selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                    </div>
                </form>
            </Form>
        </StepperScrollLayout>
    )
}
