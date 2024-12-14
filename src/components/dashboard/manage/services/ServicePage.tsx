'use client'
import { DeleteCategory } from '@/api/services/categories/delete-category'
import { DeleteService } from '@/api/services/delete-service'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Category } from '@/types/category'
import { ChevronDown, Menu, MoreVertical, Percent } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import EditCategory from './addCategory/edit-category'
import Link from 'next/link'
import { secondToHour } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import ConfirmDialog from '@/components/common/confirm-dialog'
import ServiceCard from './ServiceCard'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'

type Props = {
    allCategories: Category[];
    query: string;
}


const ServicePage = ({ allCategories, query }: Props) => {
    const { mutate, isPending } = DeleteCategory();
    const { mutate: serviceDelete, isPending: deleting } = DeleteService();
    const { setQuery } = useSetUrlParams()
    const router = useRouter();
    const deleteService = (id: number) => {
        serviceDelete({ id: String(id) })
    }
    const deleteCategory = (id: number) => {
        mutate({ id: String(id) });
    }

    const openDetail = (id: string) => {
        setQuery({ key: "service-detail", value: id })
    }
    return (
        <>
            <div className=" flex flex-col gap-8 ">
                {allCategories?.map((category, index) => (
                    <div key={index} className="mb-6 ">
                        <div style={{ scrollMarginTop: '140px' }} id={category.id.toString()} className="flex justify-between items-center mb-2">
                            <h2 style={{ color: `${category.colorCode}` }} className={`text-2xl font-semibold capitalize `}>{category.name}</h2>
                            <AppDropdown trigger={(
                                <span>
                                    <Button variant={'brandGhost'} className=' hidden md:inline-flex items-center  '>
                                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button variant={'brandGhost'} className=' inline-block md:hidden ' >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </span>
                            )}>
                                <div className=' space-y-1 w-[200px] '>
                                    <EditCategory category={category} >
                                        <span className=' px-4 py-2 rounded-md font-semibold text-sm flex justify-start items-center w-full hover:bg-gray-100 '>
                                            Edit category
                                        </span>
                                    </EditCategory>
                                    <Link href={`/services/create?category=${String(category.id)}`} className=' hover:bg-gray-100 p-2 px-4 w-full block font-semibold rounded-lg text-sm '>
                                        Add Service
                                    </Link>
                                    <Link href={`/services/create-package?category=${String(category.id)}`} className=" w-full flex justify-start font-semibold text-sm px-4 py-2 hover:bg-gray-100 ">Add Package</Link>
                                    {category.services && category.services.length > 0 ? (
                                        <ConfirmDialog title='There are services in this category!' description='To delete category, need to be empty service in this category' onConfirm={() => console.log('ok')} button='Ok' >
                                            <span className=" cursor-pointer w-full px-4 py-2 text-delete flex justify-start text-sm font-semibold hover:bg-gray-100 ">Delete Category</span>
                                        </ConfirmDialog>
                                    ) : (
                                        <ConfirmDialog title='Are you sure to delete this category!' description='It will be deleted , can create again later' onConfirm={() => deleteCategory(category.id)} button='Delete' >
                                            <span className=" cursor-pointer w-full px-4 py-2 text-delete flex justify-start text-sm font-semibold hover:bg-gray-100 ">Delete Category</span>
                                        </ConfirmDialog>
                                    )}
                                </div>
                            </AppDropdown>
                        </div>
                        <div className=' grid grid-cols-1 gap-3 '>
                            {category.services && category.services.length > 0 ? (
                                category.services?.map((service) => (
                                    <ServiceCard key={service.id} color={category.colorCode ? category.colorCode : 'white'} service={service} editable={true} />
                                ))
                            ) : (
                                query ? (
                                    <h3>No Search result</h3>
                                ) : (
                                    <h3>No service on this category <Link href={`/services/create?category=${String(category.id)}`} className=' text-blue-600 '>create</Link> </h3>
                                )
                            )}
                        </div>

                    </div>

                ))}
            </div>
        </>
    )
}

export default ServicePage



