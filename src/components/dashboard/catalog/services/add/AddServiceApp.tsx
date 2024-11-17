'use client'
import { useEffect, useRef, useState } from 'react'
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
import { ServiceSchema } from './../../../../../validation-schema/service.schema';
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { durationData } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'


export default function AddNewService() {
    const [activeTab, setActiveTab] = useState('basic');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const categoryId = getQuery('category');
    const { mutate, isPending } = CreateService();
    // const basicRef = useRef<HTMLDivElement | null>(null);
    // const memberRef = useRef<HTMLDivElement | null>(null);
    const form = useForm({
        // resolver: zodResolver(ServiceSchema),
        defaultValues: {
            name: '',
            type: '',
            price: 0,
            duration: 1800,
            priceType: 'fixed',
            notes: '',
            targetGender: 'all',
            categoryId: 0
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
                notes: '',
                targetGender: 'all',
                categoryId: Number(categoryId)
            })
        }
    }, [categoryId, form])

    const handleAddService = (values: any) => {
        const payload = {
            ...values,
            price: Number(values.price),
            duration: Number(values.duration),
            categoryId: Number(values.categoryId),
            memberIds: selectedMembers,
        }
        console.log(payload, values.duration);
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
    const categoryOption = categories?.map((category) => ({ name: category.name, value: category.id }))

    // const options = {
    //     root: null,
    //     rootMargin: '0px',
    //     threshold: Array.from(Array(101).keys(), t => t / 100)
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //             setActiveTab(entry.target.id);
    //         }
    //     })
    // }, options);

    // ['basic-details', 'team-members'].forEach((section) => {
    //     const element = document.getElementById(section)
    //     if (element) {
    //         observer.observe(element);
    //     }
    // });

    return (
        <div className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white overflow-auto ">
            <Form {...form}>
                <form className=' space-y-10 ' onSubmit={form.handleSubmit(handleAddService)}>
                    <div className="flex justify-between items-center  sticky z-[60] top-0 w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
                        <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold">Add New Service</h1>
                        <div className=" flex items-center ">
                            <Button type='button' variant="outline" className="mr-2" onClick={() => router.push('/manage/services')}>Cancel</Button>
                            <Button type="submit" disabled={isPending}  >
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
                                    <Button type='button' variant={activeTab == 'basic' ? 'default' : 'outline'} onClick={() => {
                                        scrollToSection('basic-details');
                                        setActiveTab('basic')
                                    }} >Basic Details</Button>
                                    <Button type='button' variant={activeTab == 'member' ? 'default' : 'outline'} onClick={() => {
                                        scrollToSection('team-members');
                                        setActiveTab('member')
                                    }} >Team Members</Button>
                                </div>


                                <div className=' space-y-10'>

                                    <div id='basic-details' className=" border grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 border-zinc-200 ">
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
                                            name='type'
                                            label='Service Type'
                                            options={[{ name: "hair shine", value: "hair-shine" }, { name: "lip Grow", value: "lip-grow" }]}
                                        />
                                        <FormSelect
                                            form={form}
                                            name='categoryId'
                                            label='Category'
                                            defaultValue={String(categoryId)}
                                            options={categories.map((category) => ({ name: category.name, value: String(category.id) }))}
                                        />
                                        <FormSelect
                                            form={form}
                                            name='targetGender'
                                            label='Target Gender'
                                            defaultValue='all'
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

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Pricing and duration</h3>
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
                                                <FormInput
                                                    form={form}
                                                    name='price'
                                                    type='number'
                                                    placeholder='MMK 0.00'
                                                    label='Price'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div id='team-members' className=' p-6 border border-zinc-200 '>
                                        <TeamMemberAdd selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}



// useEffect(() => {
//     const options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: Array.from(Array(101).keys(), t => t / 100)
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 setActiveTab(entry.target.id);
//             }
//         })
//     }, options);

//     [basicRef, memberRef].forEach((section) => {
//         if (section.current) {
//             observer.observe(section.current);
//         }
//     });


//     return () => {
//         [basicRef, memberRef].forEach((section) => {
//             if (section.current) {
//                 observer.unobserve(section.current);
//             }
//         })
//     }

// }, []);
