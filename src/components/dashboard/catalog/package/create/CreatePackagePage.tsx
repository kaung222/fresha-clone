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
import { ServiceSchema } from './../../../../../validation-schema/service.schema';
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, Trash } from 'lucide-react'
import { durationData } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'


export default function CreatePackagePage() {
    const [activeTab, setActiveTab] = useState('basic');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { data: categories } = GetAllCategories();
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const categoryId = getQuery('category');
    const { mutate, isPending } = CreateService();
    // const basicRef = useRef<HTMLDivElement | null>(null);
    // const memberRef = useRef<HTMLDivElement | null>(null);
    const form = useForm()
    useEffect(() => {
        if (categoryId) {
            form.reset({
                categoryId: Number(categoryId)
            })
        }
    }, [categoryId, form])

    const handleSubmit = (values: any) => {
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
        <ScrollArea className=" fixed w-screen h-screen top-0 left-0 z-[60] bg-white  ">
            <div className="flex justify-between items-center  sticky z-[60] top-0 w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
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
                    <div className=' px-10 pb-20 max-w-[886px] space-y-10 ' >
                        <div className=" flex gap-5 p-3  ">
                            <Button variant={activeTab == 'basic' ? 'default' : 'outline'} onClick={() => {
                                scrollToSection('basic-details');
                                setActiveTab('basic')
                            }} >Basic Details</Button>
                            <Button variant={activeTab == 'member' ? 'default' : 'outline'} onClick={() => {
                                scrollToSection('team-members');
                                setActiveTab('member')
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
                                    <div className=' col-span-1 lg:col-span-2 '>
                                        <FormTextarea
                                            form={form}
                                            name='description'
                                            label='Description'
                                            placeholder='Add a description'
                                        />
                                    </div>
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
                                            <Button variant="outline" className="mb-8">
                                                <Plus className="mr-2 h-4 w-4" /> Add service
                                            </Button>
                                        </div>
                                        <div className=' flex gap-2 items-center '>
                                            <Card className=" flex-grow ">
                                                <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                                    <div>
                                                        <h3 className="font-medium">hair</h3>
                                                        <p className="text-sm text-gray-500">20 min</p>
                                                    </div>
                                                    <div className="text-right ">
                                                        <p>5000 <span className=' font-medium text-xs '>MMK</span> </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Button variant={'ghost'}>
                                                <Trash className=' w-4 h-4 ' />
                                            </Button>
                                        </div>
                                        <div className=' flex gap-2 '>
                                            <Card className=" flex-grow ">
                                                <CardContent className="flex h-[70px] group hover:bg-gray-100 items-center justify-between p-4">
                                                    <div>
                                                        <h3 className="font-medium">hair</h3>
                                                        <p className="text-sm text-gray-500">20 min</p>
                                                    </div>
                                                    <div className="text-right ">
                                                        <p>5000 <span className=' font-medium text-xs '>MMK</span> </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Button variant={'ghost'}>
                                                <Trash className=' w-4 h-4 ' />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                                <Card className=' p-6 '>
                                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
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
                                </Card>
                            </form>
                        </Form>
                    </div>
                )
            }
        </ScrollArea>
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
