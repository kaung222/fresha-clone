'use client'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import { Bell, ChevronDown, Plus, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { noSpaceString, secondToHour } from '@/lib/utils'
import { GetAllCategories } from '@/api/services/categories/get-all-categories'
import { Category } from '@/types/category'



type Props = {
    selectedServices: string[];
    setSelectedServices: Dispatch<SetStateAction<string[]>>;
}

export default function AppointmentServiceSelect({ selectedServices, setSelectedServices }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>("")
    const { data: AllCategories } = GetAllCategories();
    // console.log(AllCategories)
    const handleServiceCheck = (serviceId: string) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    // Toggle category check/uncheck (all services under the category)
    const handleCategoryCheck = (category: Category) => {
        const serviceIds = category.services.map((service) => String(service.id));

        if (serviceIds.every((id) => selectedServices.includes(id))) {
            setSelectedServices((prev) => prev.filter((id) => !serviceIds.includes(id)));
        } else {
            setSelectedServices((prev) => Array.from(new Set([...prev, ...serviceIds])));
        }
    };

    // Helper function to check if a category is fully checked
    const isCategoryChecked = (category: Category) => {
        return category.services.every((service) => selectedServices.includes(String(service.id)));
    };

    const handleLinkClick = (section: string) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: "smooth",
                block: 'start'
            })
        }
    }

    useEffect(() => {
        if (AllCategories) {
            const allServiceInCategories = AllCategories.flatMap((category) => category.services).map((service) => String(service.id))
            // setSelectedServices(allServiceInCategories);

        }
    }, [AllCategories, setSelectedServices])

    return (
        <>
            <div id='service' className="text-xl font-semibold mb-2">Services</div>
            <p className="text-gray-500 mb-6">Select services for this appointment.</p>

            <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex space-x-2 overflow-auto w-full mb-6  bg-white ">
                {AllCategories?.map(category => (
                    <Button
                        key={category.id}
                        type="button"
                        variant={activeCategory === String(category.id) ? "default" : "outline"}
                        onClick={() => {
                            setActiveCategory(String(category.id));
                            handleLinkClick(String(category.id));
                        }}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>


            {AllCategories?.map((category, index) => (

                <div key={index} id={String(category.id)} className=" flex flex-col gap-1 mb-20 ">
                    <div className=" flex items-center h-[50px] border-b border-zinc-200 gap-[10px] ">
                        <Checkbox checked={isCategoryChecked(category)} onCheckedChange={() => handleCategoryCheck(category)} className=" w-5 h-5 " />
                        <div className="text-xl font-semibold ">{category.name}</div>
                    </div>

                    <ul className=" px-4 ">
                        {category.services.map((service) => (
                            <li key={service.id} className="flex items-center justify-between h-[80px] border-b border-zinc-200 gap-[15px] ">
                                <div className="flex items-center">
                                    <Checkbox checked={selectedServices.includes(String(service.id))} onCheckedChange={() => handleServiceCheck(String(service.id))} />
                                    <label className="ml-2  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col">
                                        <span>
                                            {service.name}
                                        </span>
                                        <span className="text-xs text-gray-500">{secondToHour(service.duration, 'duration')}</span>
                                    </label>
                                </div>
                                <span className="text-sm text-gray-500">{service.priceType} MMK {service.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            ))}
        </>
    )
}