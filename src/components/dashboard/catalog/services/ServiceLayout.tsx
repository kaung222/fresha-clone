import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const categories = [
    { name: "All categories", count: 5 },
    { name: "Nail Cleaning", count: 1 },
    { name: "Hair & styling", count: 4 },
]

const ServiceCategoryBar = ({ children }: Props) => {
    return (
        <>

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
                                <Button>
                                    Add
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            )}>
                                <div className=' flex flex-col p-4 '>
                                    <Link href={''} className=' hover:bg-gray-100 p-2 text-sm '>
                                        Single Service
                                    </Link>
                                    <Link href={''} className=' hover:bg-gray-100 p-2 text-sm '>
                                        Category
                                    </Link>
                                    <Link href={''} className=' hover:bg-gray-100 p-2 text-sm '>
                                        Package
                                    </Link>
                                </div>

                            </AppDropdown>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-6 flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input type="text" placeholder="Search service name" className="w-full" />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                Filters
                                <SlidersHorizontal className="ml-2 h-4 w-4" />
                            </Button>
                            {/* <Button variant="outline">
                            Manage order
                        </Button> */}
                        </div>
                    </div>


                    <div className="flex flex-col ">

                        <div className=' block py-5 '>
                            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" flex space-x-2 overflow-x-auto ">
                                {categories.map((category) => (
                                    <Button key={category.name} variant={'outline'} className={` justify-between  `}>
                                        {category.name}
                                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {category.count}
                                        </span>
                                    </Button>
                                ))}
                                <Button variant={'outline'} className=' flex justify-center items-center '>
                                    +
                                </Button>
                            </div>

                        </div>

                        {children}
                    </div>
                </div>
            </main>


        </>
    )
}

export default ServiceCategoryBar