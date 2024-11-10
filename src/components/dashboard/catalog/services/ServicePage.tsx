'use client'
import { DeleteCategory } from '@/api/services/categories/delete-category'
import { DeleteService } from '@/api/services/delete-service'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Category } from '@/types/category'
import { ChevronDown, Menu, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import EditCategory from './addCategory/edit-category'
import Link from 'next/link'
import { secondToHour } from '@/lib/utils'

type Props = {
    allCategories: Category[]
}


const ServicePage = ({ allCategories }: Props) => {
    const { mutate, isPending } = DeleteCategory();
    const { mutate: serviceDelete, isPending: deleting } = DeleteService();
    const router = useRouter();
    const deleteService = (id: number) => {
        serviceDelete({ id: String(id) })
    }
    const deleteCategory = (id: number) => {
        mutate({ id: String(id) });
    }
    return (
        <>
            <div className=" flex flex-col gap-8 ">
                {allCategories?.map((category, index) => (
                    <div key={index} className="mb-6 ">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{category.name}</h2>
                            <AppDropdown trigger={(
                                <>
                                    <span className=' hidden md:inline-flex px-2 py-2 items-center hover:bg-gray-100 rounded-lg '>
                                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                                    </span>
                                    <span className=' inline-block px-2 py-2 hover:bg-gray-100 md:hidden rounded-lg ' >
                                        <MoreVertical className="h-4 w-4" />
                                    </span>
                                </>
                            )}>
                                <div className=' space-y-1 w-[200px] '>
                                    <EditCategory category={category} >
                                        <span className=' px-4 py-2 rounded-md flex justify-start items-center w-full hover:bg-gray-100 '>
                                            Edit
                                        </span>
                                    </EditCategory>
                                    <Link href={`/catalog/services/add?category=${String(category.id)}`} className=' hover:bg-gray-100 p-2 px-4 w-full block font-medium rounded-lg text-sm '>
                                        Add Service
                                    </Link>
                                    <Button variant={'ghost'} className=" w-full flex justify-start ">Add Package</Button>
                                    <Button variant={'ghost'} className=" w-full text-delete flex justify-start " onClick={() => deleteCategory(category.id)} >Delete Category</Button>
                                </div>
                            </AppDropdown>
                        </div>
                        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-3 '>
                            {category.services?.map((service) => (

                                <div key={service.id} className="flex justify-between items-center py-3 px-6 rounded-md border border-zinc-300 ">
                                    <div>
                                        <h3 className="font-medium">{service.name}</h3>
                                        <p className="text-sm text-gray-500">{secondToHour(service.duration)} <span className=' text-text text-zinc-400 '>min</span> </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-4">{service.price}</span>
                                        <AppDropdown trigger={(
                                            <span className=' inline-block px-2 py-2 hover:bg-gray-100 rounded-lg ' >
                                                <MoreVertical className="h-4 w-4 " />
                                            </span>
                                        )}>
                                            <div className=' space-y-1 w-[200px] '>
                                                <Link href={`/catalog/services/${service.id}/edit`} className=' hover:bg-gray-100 p-2 px-4 w-full block font-medium rounded-lg text-sm '>
                                                    Edit
                                                </Link>
                                                <Button variant={'ghost'} className=" w-full text-delete  flex justify-start " onClick={() => deleteService(service.id)} >Delete Service</Button>
                                            </div>
                                        </AppDropdown>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                ))}
            </div>
        </>
    )
}

export default ServicePage



