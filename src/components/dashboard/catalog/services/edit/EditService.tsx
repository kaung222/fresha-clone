'use client'
import { useEffect, useRef, useState } from 'react'
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


export default function EditServiceMode() {
    const [activeTab, setActiveTab] = useState('basic-detail');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const router = useRouter()
    const { serviceId } = useParams()
    const { mutate, isPending } = UpdateService(String(serviceId));
    const { data: serviceDetail } = GetSingleServiceById(String(serviceId));
    const form = useForm({
        // resolver: zodResolver(ServiceSchema),
        defaultValues: {
            name: '',
            price: '0',
            duration: '30',
            priceType: 'fixed',
            description: '',
            targetGender: 'all',
            categoryId: '',
            discount: '0',
            discountType: 'fixed'
        }
    })

    useEffect(() => {
        if (serviceDetail) {
            form.reset({
                name: serviceDetail.name,
                price: serviceDetail.price,
                duration: String(serviceDetail.duration),
                categoryId: String(serviceDetail.category.id),
                priceType: serviceDetail.priceType,
                targetGender: serviceDetail.targetGender,
                description: serviceDetail.description,
                discount: String(serviceDetail.discount),
                discountType: serviceDetail.discountType
            })
            setSelectedMembers(serviceDetail.members.map(m => String(m.id)))
        }
    }, [serviceDetail, form]);

    const priceType = form.watch('priceType')
    const discountType = form.watch('discountType')

    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            price: Number(values.price),
            duration: Number(values.duration),
            categoryId: Number(values.categoryId),
            memberIds: selectedMembers,
            discount: Number(values.discount)
        }
        console.log(payload);
        mutate(payload);
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

        ['basic-detail', 'team-member'].forEach((section) => {
            const element = document.getElementById(section)
            if (element) {
                observer.observe(element);
            }
        });


        return () => {
            ['basic-detail', 'team-member'].forEach((section) => {
                const element = document.getElementById(section)
                if (element) {
                    observer.unobserve(element);
                }
            })
        }

    }, [activeTab]);



    return (
        <div className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white overflow-auto ">
            <Form {...form}>
                <form className='' onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex justify-between items-center  sticky z-[60] top-0 w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
                        <h1 className=" text-xl lg:text-2xl font-semibold lg:font-bold">Edit Service</h1>
                        <div className=' flex items-center '>
                            <Button type='button' variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Cancel</Button>
                            <Button type="submit" disabled={isPending} >
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
                            <div className=' px-10 pb-20 max-w-[886px] space-y-10 ' >
                                <div className=" flex gap-5 p-3  ">
                                    <Button type='button' variant={activeTab == 'basic-detail' ? 'default' : 'outline'} onClick={() => {
                                        scrollToSection('basic-detail');
                                        setActiveTab('basic-detail')
                                    }} >Basic Details</Button>
                                    <Button type='button' variant={activeTab == 'team-member' ? 'default' : 'outline'} onClick={() => {
                                        scrollToSection('team-member');
                                        setActiveTab('team-member')
                                    }} >Team Members</Button>
                                </div>


                                {serviceDetail && (
                                    <div className=' space-y-10 '>
                                        <Card id='basic-detail' className=" border grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 ">
                                            <div className="text-lg font-semibold mb-2">Basic Details</div>
                                            <div className=' col-span-1 lg:col-span-2 '>
                                                <FormInput
                                                    form={form}
                                                    name='name'
                                                    label='Service Name'
                                                    placeholder='Add a service name'
                                                />
                                            </div>

                                            <FormSelect
                                                form={form}
                                                name='categoryId'
                                                label='Category'
                                                defaultValue={String(serviceDetail.category.id)}
                                                options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                            />
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
                                                    placeholder='Add a description'
                                                />
                                            </div>

                                        </Card>
                                        <Card className=" p-6 ">
                                            <h3 className="text-lg font-semibold mb-2">Pricing and duration</h3>
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
                                                <div></div>
                                                <FormInput
                                                    form={form}
                                                    name='price'
                                                    type='number'
                                                    placeholder='MMK 0.00'
                                                    label='Price'
                                                />
                                            </div>
                                        </Card>

                                        <Card className=' p-6'>
                                            <h3 className="text-lg font-semibold mb-2">Discount</h3>
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                <FormSelect
                                                    name='discountType'
                                                    form={form}
                                                    label='Discount type'
                                                    defaultValue={serviceDetail?.discountType}
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

                                        <div id='team-member' className=' p-6 border border-zinc-200 '>
                                            <TeamMemberAddInEdit selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

