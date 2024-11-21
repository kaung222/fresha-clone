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
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash } from 'lucide-react'
import { durationData } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import TeamMemberAdd from '../../services/add/Teammember'
import { Service } from '@/types/service'
import SelectServiceForPackage from './select-service'
import { secondToHour } from '@/lib/utils'
import { useCreatePackage } from '@/api/package/create-package'
import { toast } from '@/components/ui/use-toast'


export default function CreatePackagePage() {
    const [activeTab, setActiveTab] = useState('basic-details');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const categoryId = getQuery('category');
    const { mutate, isPending } = useCreatePackage();
    const [showSelectService, setShowSelectService] = useState(false);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    // const basicRef = useRef<HTMLDivElement | null>(null);
    // const memberRef = useRef<HTMLDivElement | null>(null);
    const form = useForm({
        defaultValues: {
            name: '',
            targetGender: 'all',
            discountType: 'percent',
            categoryId: '',
            discount: '',
            price: '',
        }
    })
    useEffect(() => {
        if (categoryId) {
            form.reset({
                categoryId: String(categoryId)
            })
        }
    }, [categoryId, form])

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
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    };
    const categoryOption = categories?.map((category) => ({ name: category.name, value: category.id }))

    const addSelectedServices = (service: Service) => {
        setSelectedServices((pre) => ([...pre, service]))
    }
    const removeSelectedServices = (service: Service) => {
        setSelectedServices((pre) => pre.filter((ser) => ser.id != service.id))
    }


    useEffect(() => {

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            })
        }, options);

        ['basic-details', 'team-members'].forEach((section) => {
            const element = document.getElementById(section)
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            ['basic-details', 'team-members'].forEach((section) => {
                const element = document.getElementById(section)
                if (element) {
                    observer.unobserve(element);
                }
            })
        }

    }, [activeTab]);



    return (
        <div className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white  ">
            <div className="flex justify-between items-center w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
                <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold">Add New Service</h1>
                <div className=" flex items-center ">
                    <Button variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Cancel</Button>
                    <Button type="submit" disabled={isPending} form="add-service-form">
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
            </div>
            {
                categories && (
                    <ScrollArea className=' h-h-full-minus-80 w-full ' >
                        <div className='px-10 pb-20  max-w-[886px] mx-auto space-y-10 ' >
                            <div className=" flex gap-5 p-3 sticky top-0 z-[55] bg-[#ffffffb2] ">
                                <Button variant={activeTab == 'basic-details' ? 'default' : 'outline'} onClick={() => {
                                    scrollToSection('basic-details');
                                    setActiveTab('basic-details')
                                }} >Basic Details</Button>
                                <Button variant={activeTab == 'team-members' ? 'default' : 'outline'} onClick={() => {
                                    scrollToSection('team-members');
                                    setActiveTab('team-members')
                                }} >Team Members</Button>
                            </div>
                            <Form {...form}>
                                <form id="add-service-form" className=' space-y-10 ' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                        <FormSelect
                                            form={form}
                                            name='categoryId'
                                            label='Category'
                                            defaultValue={String(categoryId)}
                                            options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                        />
                                        <FormSelect
                                            form={form}
                                            name="targetGender"
                                            label="Target Gender"
                                            defaultValue='all'
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
                                                defaultValue='percent'
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

                                    <div id='team-members' className=' p-6 border border-zinc-200 '>
                                        <TeamMemberAdd selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </ScrollArea>
                )
            }
            <SelectServiceForPackage setShowServiceSelect={setShowSelectService} showServiceSelect={showSelectService} addSelectService={addSelectedServices} selectedServices={selectedServices} />
        </div>
    )
}



