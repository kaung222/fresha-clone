
'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import { CreateService } from '@/api/services/create-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { Loader2, Plus, Trash } from 'lucide-react'
import { durationData } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Service } from '@/types/service'
import { secondToHour } from '@/lib/utils'
import { useCreatePackage } from '@/api/package/create-package'
import { toast } from '@/components/ui/use-toast'
import SelectServiceForPackage from '../create/select-service'
import { GetSingleServiceById } from '@/api/services/get-single-service'
import PageLoading from '@/components/common/page-loading'
import TeamMemberAddInEdit from '../../services/edit/TeammemberInEdit'
import { useUpdatePackage } from '@/api/package/update-package'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'


export default function EditPackagePage() {
    const basicRef = useRef<HTMLDivElement | null>(null);
    const memberRef = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState<string>('basic-details');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const router = useRouter();
    const { serviceId } = useParams();
    const { data: singleService, isLoading } = GetSingleServiceById(String(serviceId));
    const { getQuery } = useSetUrlParams();
    const { mutate, isPending } = useUpdatePackage(String(serviceId));
    const [showSelectService, setShowSelectService] = useState(false);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const form = useForm({
        defaultValues: {
            name: '',
            targetGender: 'all',
            discountType: 'percent',
            categoryId: '',
            discount: '',
            description: '',
            price: '',
        }
    })
    useEffect(() => {
        if (singleService) {
            setSelectedServices(singleService.services);
            setSelectedMembers(singleService.members.map(mem => mem.id.toString()))
            form.reset({
                name: singleService.name,
                categoryId: singleService.category.id.toString(),
                targetGender: singleService.targetGender,
                description: singleService.description,
                discountType: singleService.discountType,
                discount: String(singleService.discount)

            })
        }
    }, [singleService, form])

    const handleSubmit = (values: any) => {
        if (selectedServices.length < 2) {
            toast({ title: "service must be more than one" })
            return
        }
        const payload = {
            ...values,
            categoryId: Number(values.categoryId),
            discount: Number(values.discount),
            memberIds: selectedMembers,
            serviceIds: selectedServices.map(ser => ser.id)
        }
        console.log(payload);
        mutate(payload, {
            onSuccess() {
                router.push(`/manage/services`)
            }
        });
    }

    const categoryOption = categories?.map((category) => ({ name: category.name, value: category.id }))

    const addSelectedServices = (service: Service) => {
        setSelectedServices((pre) => ([...pre, service]))
    }
    const removeSelectedServices = (service: Service) => {
        setSelectedServices((pre) => pre.filter((ser) => ser.id != service.id))
    }


    return (
        <>
            <StepperScrollLayout title='Edit package' handlerComponent={(
                <div className=" flex items-center ">
                    <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Close</Button>
                    <Button type="submit" disabled={isPending} form="edit-package-form">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                updating...
                            </>
                        ) : (
                            'Update'
                        )}
                    </Button>
                </div>
            )}
                sectionData={[{ id: 'basic-details', name: 'Basic Data' }, { id: 'teammember', name: "Team member" }]}
                drawers={(
                    <SelectServiceForPackage setShowServiceSelect={setShowSelectService} showServiceSelect={showSelectService} addSelectService={addSelectedServices} selectedServices={selectedServices} />
                )}
                editData={singleService}
            >
                {isLoading ? (
                    <PageLoading />
                ) : singleService && (
                    <Form {...form}>
                        <form id="edit-package-form" className=' space-y-10  ' onSubmit={form.handleSubmit(handleSubmit)}>
                            <Card id='basic-details' className=" border grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 border-zinc-200 ">

                                <div className="text-lg font-semibold mb-2">Basic Information</div>
                                <div className=' col-span-1 lg:col-span-2 '>
                                    <FormInput
                                        form={form}
                                        name='name'
                                        label='Package Name'
                                        placeholder='Add a package name'
                                    />
                                </div>
                                {categories && (
                                    <FormSelect
                                        form={form}
                                        name='categoryId'
                                        label='Category'
                                        defaultValue={String(singleService?.category.id)}
                                        placeholder='choose category'
                                        options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                    />
                                )}
                                <FormSelect
                                    form={form}
                                    name="targetGender"
                                    label="Target Gender"
                                    defaultValue={singleService?.targetGender}
                                    options={[{ name: "All", value: 'all' }, { name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }]}
                                />
                                <div className=' col-span-1 lg:col-span-2 '>
                                    <FormTextarea
                                        form={form}
                                        name='description'
                                        label='Description'
                                        placeholder='Add a description'
                                    />
                                </div>
                            </Card>
                            <Card className=' p-6 gap-5 flex flex-col '>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Services</h3>
                                    <p>Choose the services to include in this package.</p>
                                </div>
                                <div className=' flex flex-col gap-5 '>
                                    <div>
                                        <Button onClick={() => setShowSelectService(true)} type='button' variant="outline" className="mb-8">
                                            <Plus className="mr-2 h-4 w-4" /> Add service
                                        </Button>
                                    </div>
                                    {selectedServices.length > 0 ? (
                                        selectedServices.map((service) => (
                                            <div key={service.id} className=' flex gap-2 items-center '>
                                                <Card className=" flex-grow ">
                                                    <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                                        <div>
                                                            <h3 className="font-medium">{service.name}</h3>
                                                            <p className="text-sm text-gray-500">{secondToHour(service.duration, 'duration')}</p>
                                                        </div>
                                                        <div className="text-right ">
                                                            <p>{service.price} <span className=' font-medium text-xs '>MMK</span> </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Button onClick={() => removeSelectedServices(service)} type='button' variant={'ghost'}>
                                                    <Trash className=' w-4 h-4 ' />
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <h2>No included services</h2>
                                    )}
                                </div>
                            </Card>

                            <Card className=" p-6 ">
                                <h3 className="text-lg font-semibold mb-2">Discount</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <FormSelect
                                        name='discountType'
                                        form={form}
                                        label='Discount type'
                                        defaultValue={singleService?.discountType}
                                        options={[{ name: 'Free', value: 'free' }, { name: 'Percentage', value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                                    />
                                    <FormInput
                                        form={form}
                                        name='discount'
                                        type='number'
                                        placeholder='10% or 1500 MMK'
                                        label='Discount'
                                    />
                                </div>
                            </Card>

                            <div ref={memberRef} id='teammember' className=' p-6 border border-zinc-200 '>
                                <TeamMemberAddInEdit selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                            </div>
                        </form>
                    </Form>
                )}


            </StepperScrollLayout>
        </>
    )
}
