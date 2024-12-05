'use client'
import AppDialog from '@/components/common/dialog'
import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, ChevronDown, Filter, Scissors, Search, SlidersHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AddCategory from './addCategory/add-category'
import ServicePage from './ServicePage'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import PageLoading from '@/components/common/page-loading'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Category } from '@/types/category'
import ControllableDropdown from '@/components/common/control-dropdown'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { ServiceFilterDialog } from './FilterBox'
import { Badge } from '@/components/ui/badge'
import CircleLoading from '@/components/layout/circle-loading'

type Props = {

}

export type FilterCriteria = {
    searchQuery: string; // For filtering by name
    type: string; // For filtering by service type
    discount: string; // For filtering by discount
};


const ServiceMainPage = ({ }: Props) => {
    const { data: allCategories, isLoading } = GetAllCategories();
    const { getQuery, deleteQuery } = useSetUrlParams();
    const serviceType = getQuery('service-type');
    const discountType = getQuery('discount-type');
    const targetRef = useRef<HTMLDivElement>(null);
    const [addDropdown, setAddDropdown] = useState(false);
    const [isOutOfScreen, setIsOutOfScreen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [query, setquery] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element is NOT intersecting, it is out of view
                setIsOutOfScreen(!entry.isIntersecting);
            },
            {
                root: null, // Use the viewport as the root
                threshold: 0, // Trigger as soon as any part of the element is out
            }
        );

        const target = targetRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [targetRef, allCategories]);



    useEffect(() => {

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            })
        }, options);
        if (allCategories) {
            allCategories.forEach((section) => {
                const element = document.getElementById(section.id.toString())
                if (element) {
                    observer.observe(element);
                }
            });

            return () => {
                allCategories.forEach((section) => {
                    const element = document.getElementById(section.id.toString())
                    if (element) {
                        observer.unobserve(element);
                    }
                })
            }
        }

    }, [allCategories]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    };

    const searchedCategory = useCallback((categories: Category[], criteria: FilterCriteria) => {
        const { type, searchQuery, discount } = criteria;
        const result = categories.map((category) => ({
            ...category, services: category.services.filter((service) => {
                const nameMatch = searchQuery ? service.name.toLowerCase().includes(searchQuery?.toLowerCase()) : true;

                const typeMatch = type && type != "all" ? service.type == type : true;

                const discountMatch = discount == 'discount' ? service.discount > 0 : discount == 'noDiscount' ? service.discount == 0 : true;
                return nameMatch && typeMatch && discountMatch
            })
        }))
        return result;
    }, []);

    const credential = {
        searchQuery: query,
        type: serviceType || 'all',
        discount: discountType || 'all'
    }

    const removeFilter = () => {
        deleteQuery({ key: 'service-type' })
        deleteQuery({ key: 'discount-type' })
    }

    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : (
                <div className="flex-1 flex flex-col w-full h-full bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Service & Package</h1>
                            <p className="text-gray-600 hidden lg:block">
                                View and manage services and packages offered by your business.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ControllableDropdown open={addDropdown} setOpen={setAddDropdown} zIndex={10} trigger={(
                                <span className=' flex border px-4 py-2 bg-black rounded-lg text-white items-center '>
                                    Add
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </span>
                            )}>
                                <div className=' flex flex-col '>
                                    <AddCategory>
                                        <span className=' px-4 py-2 w-full hover:bg-gray-100 rounded-md flex text-sm font-semibold justify-start items-center '>
                                            Category
                                        </span>
                                    </AddCategory>
                                    <Link href={'/manage/services/create'} className=' hover:bg-gray-100 p-2 px-4 font-semibold text-sm '>
                                        Service
                                    </Link>
                                    <Link href={'/manage/services/create-package'} className=' hover:bg-gray-100 p-2 px-4 text-sm font-semibold '>
                                        Package
                                    </Link>
                                </div>

                            </ControllableDropdown>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center mb-6">
                        <div className="relative w-full max-w-[287px] ">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            {query && (
                                <X onClick={() => setquery('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                            )}
                            <Input
                                type="text"
                                placeholder="Search service name"
                                value={query}
                                onChange={(e) => setquery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                            />
                        </div>
                        <ServiceFilterDialog>
                            <Button variant="outline" >
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </ServiceFilterDialog>
                        <div>
                            {
                                (serviceType || discountType) && (
                                    <Button onClick={removeFilter} variant={'outline'} className=' flex gap-2 items-center '>
                                        Remove Filter <X className=" w-3 h-3 text-delete " />
                                    </Button>

                                )
                            }
                        </div>
                    </div>

                    <div ref={targetRef} className=' w-full py-5  '>
                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" w-full flex space-x-2 overflow-x-scroll ">
                            {allCategories && searchedCategory(allCategories, credential)?.map((category) => (
                                <Button
                                    style={{ color: `${activeSection == category.id.toString() ? 'white' : category.colorCode}`, borderColor: `${category.colorCode}`, background: `${activeSection == category.id.toString() ? category.colorCode : 'white'}` }}
                                    key={category.id}
                                    variant={'outline'}
                                    onClick={() => scrollToSection(category.id.toString())}
                                    className=' hover:bg-slate-50 duration-500 '
                                >
                                    {category.name}
                                    <span style={{ background: `${activeSection == category.id.toString() ? 'white' : category.colorCode}`, color: `${activeSection == category.id.toString() ? category.colorCode : 'white'}` }} className="ml-2  py-0.5 px-2 rounded-full text-xs">
                                        {category.services.length}
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* drawer  */}
                    <div className={`block py-5 fixed bg-[#ffffffdc] w-full duration-500 ${isOutOfScreen ? 'top-[70px]' : '-top-[70px]'} z-[30]`}>
                        <div className="flex gap-2 items-center mb-3">
                            <div className="relative w-full max-w-[287px]">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {query && (
                                    <X onClick={() => setquery('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                                )}

                                <Input
                                    type="text"
                                    placeholder="Search service name"
                                    value={query}
                                    onChange={(e) => setquery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                                />
                            </div>
                            <ServiceFilterDialog>
                                <Button variant="outline" >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </ServiceFilterDialog>
                            <div>
                                {
                                    (serviceType || discountType) && (
                                        <Button onClick={removeFilter} variant={'outline'} className=' flex gap-2 items-center '>
                                            Remove Filter <X className=" w-3 h-3 text-delete " />
                                        </Button>

                                    )
                                }
                            </div>
                        </div>
                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" w-full flex space-x-2 overflow-x-auto ">
                            {allCategories && searchedCategory(allCategories, credential)?.map((category) => (
                                <Button
                                    style={{ color: `${activeSection == category.id.toString() ? 'white' : category.colorCode}`, borderColor: `${category.colorCode}`, background: `${activeSection == category.id.toString() ? category.colorCode : 'white'}` }}
                                    key={category.id}
                                    variant={'outline'}
                                    className=' hover:bg-slate-50 duration-500 '
                                    onClick={() => scrollToSection(category.id.toString())}
                                >
                                    {category.name}
                                    <span style={{ background: `${activeSection == category.id.toString() ? 'white' : category.colorCode}`, color: `${activeSection == category.id.toString() ? category.colorCode : 'white'}` }} className="ml-2  py-0.5 px-2 rounded-full text-xs">
                                        {category.services.length}
                                    </span>
                                </Button>
                            ))}
                        </div>

                    </div>
                    <Card className="flex flex-col p-6 ">
                        {isLoading ? (
                            <CircleLoading />
                        ) : allCategories && allCategories?.length > 0 ? (
                            <ServicePage query={query} allCategories={searchedCategory(allCategories, credential)} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px]">
                                <Scissors className="h-20 w-20 text-gray-400 mb-2" />
                                <p className=" text-xl font-bold">No Service yet </p>
                                <p className=" text-muted-foreground"> <Link href={`/manage/services/create`} className=" font-medium text-blue-600 " >Create Service</Link>  & see service list here.</p>
                            </div>
                        )}
                    </Card>
                    <div className=' h-[50vh] '></div>
                </div>
            )}
        </>
    )
}

export default ServiceMainPage