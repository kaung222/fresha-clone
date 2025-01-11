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
import { Service } from '@/types/service'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'



type Props = {
    selectedServices: Service[];
    setSelectedServices: Dispatch<SetStateAction<Service[]>>;
}

export default function EditAppointmentServiceSelect({ selectedServices, setSelectedServices }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>("")
    const { data: AllCategories } = GetAllCategories();
    const { data: organization } = GetOrganizationProfile()
    // console.log(AllCategories)
    const handleServiceCheck = (service: Service) => {
        setSelectedServices((prev) =>
            prev.map((ser) => ser.id).includes(service.id)
                ? prev.filter((ser) => ser.id !== service.id)
                : [...prev, service]
        );
    };

    // Toggle category check/uncheck (all services under the category)
    const handleCategoryCheck = (category: Category) => {
        const services = category.services.map((service) => service);

        if (services.map(ser => ser.id).every((id) => selectedServices.map(ser => ser.id).includes(id))) {
            setSelectedServices((prev) => prev.filter((ser) => !services.map(se => se.id).includes(ser.id)));
        } else {
            setSelectedServices((prev) => Array.from(new Set([...prev, ...services])));
        }
    };

    // Helper function to check if a category is fully checked
    const isCategoryChecked = (category: Category) => {
        return category.services.every((service) => selectedServices.map(ser => ser.id).includes(service.id));
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
            <div>
                <div id='service' className="text-xl font-semibold">Select Services</div>
                <p className="text-gray-500 mb-6">Select services for the appointment.</p>
            </div>

            <ScrollArea className="flex space-x-2 w-full mb-6  bg-white ">
                {AllCategories?.map(category => (
                    <Button
                        type="button"
                        key={category.id}
                        variant={activeCategory === String(category.id) ? "default" : "outline"}
                        onClick={() => {
                            setActiveCategory(String(category.id));
                            handleLinkClick(String(category.id));
                        }}
                    >
                        {category.name}
                    </Button>
                ))}
            </ScrollArea>


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
                                    <Checkbox checked={selectedServices.map(ser => ser.id).includes(service.id)} onCheckedChange={() => handleServiceCheck(service)} />
                                    <label className="ml-2  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col">
                                        <span>
                                            {service.name}
                                        </span>
                                        <span className="text-xs text-gray-500">{secondToHour(service.duration, 'duration')} hr</span>
                                    </label>
                                </div>
                                <span className="text-sm text-gray-500">{service.price} <span className=' text-xs font-semibold '>{organization?.currency || "MMK"}</span></span>
                            </li>
                        ))}
                    </ul>
                </div>

            ))}
        </>
    )
}