'use client'
import AppDialog from '@/components/common/dialog'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, Filter, Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AddCategory from './addCategory/add-category'
import ServicePage from './ServicePage'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import PageLoading from '@/components/common/page-loading'

type Props = {

}

const categories = [
    { name: "All categories", count: 5 },
    { name: "Nail Cleaning", count: 1 },
    { name: "Hair & styling", count: 4 },
]

const ServiceMainPage = ({ }: Props) => {
    const { data: allCategories, isLoading } = GetAllCategories();
    console.log(allCategories)
    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : (
                <main className="flex-1  overflow-y-auto bg-white">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">

                            <div>
                                <h1 className="text-2xl font-bold mb-2">Service menu</h1>
                                <p className="text-gray-600 hidden lg:block">
                                    View and manage the services offered by your business.
                                    <a href="#" className="text-blue-600 hover:underline ml-1">Learn more</a>
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <AppDropdown trigger={(
                                    <span className=' flex border px-4 py-2 bg-black rounded-lg text-white items-center '>
                                        Add
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </span>
                                )}>
                                    <div className=' flex flex-col '>
                                        <Link href={'/catalog/services/add'} className=' hover:bg-gray-100 p-2 px-4 font-medium text-sm '>
                                            Single Service
                                        </Link>
                                        <AddCategory>
                                            <span className=' px-4 py-2 w-full hover:bg-gray-100 rounded-md flex text-sm font-medium justify-start items-center '>
                                                Category
                                            </span>
                                        </AddCategory>
                                        <Link href={''} className=' hover:bg-gray-100 p-2 px-4 text-sm font-medium '>
                                            Package
                                        </Link>
                                    </div>

                                </AppDropdown>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="relative flex-grow mr-2">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search service name"

                                    className="pl-10 pr-4 py-2 w-full"
                                />
                            </div>
                            <Button variant="outline" >
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>


                        <div className="flex flex-col ">

                            <div className=' block py-5 '>
                                <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" flex space-x-2 overflow-x-auto ">
                                    {allCategories?.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant={'outline'}
                                        //  onClick={() => setSelectedCategory(category.name)}
                                        >
                                            {category.name}
                                            <span className="ml-2 bg-gray-200 text-gray-800 py-0.5 px-2 rounded-full text-xs">
                                                {category.services.length}
                                            </span>
                                        </Button>
                                    ))}
                                    <AddCategory>
                                        <span className=' px-4 py-2 border rounded-md flex justify-center items-center '>
                                            +
                                        </span>
                                    </AddCategory>
                                </div>

                            </div>
                            {allCategories && (
                                <ServicePage allCategories={allCategories} />
                            )}
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}

export default ServiceMainPage