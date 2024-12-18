
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/common/FormInput'
import FormSelect from '@/components/common/FormSelect'
import FormTextarea from '@/components/common/FormTextarea'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams, useRouter } from 'next/navigation'
import { Camera, Loader2, Plus, Trash } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Service } from '@/types/service'
import { checkChange, secondToHour } from '@/lib/utils'
import { useCreatePackage } from '@/api/package/create-package'
import { toast } from '@/components/ui/use-toast'
import SelectServiceForPackage from '../create/select-service'
import { GetSingleServiceById } from '@/api/services/get-single-service'
import PageLoading from '@/components/common/page-loading'
import TeamMemberAddInEdit from '../../services/edit/TeammemberInEdit'
import { useUpdatePackage } from '@/api/package/update-package'
import StepperScrollLayout from '@/components/layout/stepper-scroll-layout'
import { PackageSchema } from '@/validation-schema/package.schema'
import ConfirmDialog from '@/components/common/confirm-dialog'
import ServiceCard from '../../services/ServiceCard'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FormInputFileCrop from '@/components/common/FormInputFileCrop'


export default function EditPackagePage() {
    const memberRef = useRef<HTMLDivElement | null>(null);
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
        resolver: zodResolver(PackageSchema),
        defaultValues: {
            thumbnailUrl: '',
            name: '',
            targetGender: 'all',
            discountType: 'percent',
            categoryId: 0,
            discount: 0,
            description: '',
        }
    })
    useEffect(() => {
        if (singleService) {
            setSelectedServices(singleService.services);
            setSelectedMembers(singleService.members.map(mem => mem.id.toString()))
            form.reset({
                thumbnailUrl: singleService.thumbnailUrl || undefined,
                name: singleService.name,
                categoryId: singleService.category.id,
                targetGender: singleService.targetGender,
                description: singleService.description,
                discountType: singleService.discountType,
                discount: singleService.discount
            })
        }
    }, [singleService, form])

    const handleSubmit = (values: z.infer<typeof PackageSchema>) => {
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
                router.push(`/services`)
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

    const watchedValues = useMemo(() => form.watch(), []);

    const notChanged = JSON.stringify(watchedValues) === JSON.stringify(form.getValues())
    const profileImage = form.watch('thumbnailUrl');

    return (
        <>
            <StepperScrollLayout title='Edit package' handlerComponent={(
                <div className=" flex items-center gap-2 ">
                    {
                        singleService && checkChange([
                            { first: singleService?.name, second: form.watch('name') },
                            { first: singleService.category.id.toString(), second: form.watch('categoryId').toString() },
                            { first: singleService.targetGender, second: form.watch('targetGender') },
                            { first: singleService.description, second: form.watch('description') },
                            { first: JSON.stringify(singleService.services), second: JSON.stringify(selectedServices) },
                            { first: singleService.discount.toString(), second: form.watch('discount').toString() },
                            { first: JSON.stringify(singleService.members.map(m => m.id.toString())), second: JSON.stringify(selectedMembers) },

                        ]) ? (
                            <ConfirmDialog button="Leave" title='Unsaved Changes' description='You have unsaved changes. Are you sure you want to leave?' onConfirm={() => router.push(`/services`)}>
                                <span className=' cursor-pointer  px-4 py-2 rounded-lg border border-brandColor text-brandColor hover:bg-brandColorLight/40 '>Close</span>
                            </ConfirmDialog>
                        ) : (
                            <Button className="mr-2" variant="brandOutline" onClick={() => router.push('/services')}>Close</Button>
                        )
                    }
                    <Button type="submit" variant="brandDefault" disabled={isPending} form="edit-package-form">
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
                sectionData={[{ id: 'basic-details', name: 'Basic Data' }, { id: 'services', name: 'Services' }, { id: 'teammember', name: "Team member" }]}
                drawers={(
                    <SelectServiceForPackage setShowServiceSelect={setShowSelectService} showServiceSelect={showSelectService} setSelectedService={setSelectedServices} selectedServices={selectedServices} />
                )}
                editData={singleService}
            >
                {isLoading ? (
                    <PageLoading />
                ) : singleService && (
                    <Form {...form}>
                        <form id="edit-package-form" className=' space-y-10  ' onSubmit={form.handleSubmit(handleSubmit)}>
                            <Card id='basic-details' className=" border grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 border-zinc-200 ">
                                <div>
                                    <div className="text-lg font-semibold mb-2">📝 Basic Information</div>
                                    <p className=' text-text font-medium leading-text text-zinc-500 '>Enter the name, category, and other basic information about your package.</p>

                                </div>
                                <div className=" flex justify-start p-3 col-span-2 ">
                                    <Label htmlFor="serviceThumbnail" className="relative w-[250px] h-[200px] bg-gray-100 border border-slate-500 flex items-center justify-center ">
                                        {profileImage ? (
                                            <Avatar className=' size-[250px] rounded-sm '>
                                                <AvatarImage src={profileImage} alt={'service'} className=' object-cover ' />
                                                <AvatarFallback className=" rounded-sm">{'service'}</AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <Camera className="h-8 w-8 text-gray-400" />
                                        )}
                                        <FormInputFileCrop
                                            form={form}
                                            name='thumbnailUrl'
                                            id='serviceThumbnail'
                                        />
                                    </Label>
                                </div>

                                <div className=' col-span-1 lg:col-span-2 '>
                                    <FormInput
                                        form={form}
                                        name='name'
                                        label='Package Name'
                                        placeholder='Package name'
                                    />
                                </div>
                                {categories && (
                                    <FormSelect
                                        form={form}
                                        name='categoryId'
                                        label='Category'
                                        defaultValue={String(singleService?.category.id)}
                                        placeholder='Choose package category'
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
                                        placeholder='Description for more detail about package , write here ...'
                                    />
                                </div>
                            </Card>
                            <Card id='services' className=' p-6 gap-5 flex flex-col '>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">🏷️ Services</h3>
                                    <p className=' text-text font-medium leading-text text-zinc-500 '>Select the services to include in this package.</p>
                                </div>
                                <div className=' flex flex-col gap-2 '>
                                    <div>
                                        <Button onClick={() => setShowSelectService(true)} type='button' variant="outline" className="mb-8">
                                            <Plus className="mr-2 h-4 w-4" /> Add service
                                        </Button>
                                    </div>
                                    {selectedServices.length > 0 ? (
                                        selectedServices.map((service) => (
                                            <div key={service.id} className=' flex gap-2 items-center '>
                                                <ServiceCard service={service} />
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
                                        options={[{ name: 'Percentage', value: 'percent' }, { name: 'Fixed', value: 'fixed' }]}
                                    />
                                    <FormInput
                                        form={form}
                                        name='discount'
                                        type='number'
                                        placeholder='0'
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
