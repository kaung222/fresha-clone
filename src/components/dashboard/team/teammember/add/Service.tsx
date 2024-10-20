'use client'
import { MutableRefObject, useEffect, useState } from 'react'
import { Bell, ChevronDown, Plus, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { noSpaceString } from '@/lib/utils'

type ServiceItem = {
    name: string;
    price: string;
};

type ServiceCategory = {
    category: string;
    items: ServiceItem[];
};


const services: ServiceCategory[] = [
    {
        category: "Hair and styling",
        items: [
            { name: "Haircut (Men, Women, Children)", price: "MMK 5000" },
            { name: "Hair Coloring", price: "from MMK 70000" },
            { name: "Highlights/Frosting", price: "from MMK 70000" },
            { name: "Hair Extension", price: "from MMK 200000" },
        ]
    },
    {
        category: "Nail Spa",
        items: [
            { name: "Classic Manicure", price: "MMK 7000" },
            { name: "Classic Pedicure", price: "from MMK 10000" },
            { name: "Gel Manicure/Pedicure", price: "from MMK 15000" },
            { name: "Acrylic Nails", price: "from MMK 20000" },
        ]
    },
    {
        category: "Face Spa",
        items: [
            { name: "Classic Facial", price: "MMK 8000" },
            { name: "Hydrating Facial", price: "from MMK 10000" },
            { name: "Anti-Aging Facial", price: "from MMK 15000" },
            { name: "Acne Treatment Facial", price: "from MMK 20000" },
        ]
    },
    {
        category: "Foot Massage",
        items: [
            { name: "Reflexology", price: "MMK 8000" },
            { name: "Deep Tissue Foot Massage", price: "from MMK 10000" },
            { name: "Aromatherapy Foot Massage", price: "from MMK 12000" },
            { name: "Hot Stone Foot Massage", price: "from MMK 15000" },
        ]
    },
]


type Props = {
    form: UseFormReturn<FieldValues, any, undefined>
    serviceRef: MutableRefObject<HTMLDivElement | null>;


}

export default function AddTeamMemberService({ form, serviceRef }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>("")
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (serviceName: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(name => name !== serviceName)
                : [...prev, serviceName]
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
    //                 setActiveCategory(entry.target.id);
    //                 console.log(entry.target.id)
    //             }
    //         })
    //     }, options);

    //     services.forEach((section) => {
    //         const sectionEle = document.getElementById(noSpaceString(section.category).toLowerCase())
    //         if (sectionEle) {
    //             observer.observe(sectionEle);
    //         }
    //     });


    //     return () => {
    //         services.forEach((section) => {
    //             const sectionEle = document.getElementById(noSpaceString(section.category).toLowerCase())
    //             if (sectionEle) {
    //                 observer.unobserve(sectionEle);
    //             }
    //         })
    //     }
    // }, [services]);

    const handleLinkClick = (section: string) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: "smooth",
                block: 'start'
            })
        }
    }

    return (
        <>
            <div ref={serviceRef} id='service' className="text-xl font-semibold mb-2">Service</div>
            <p className="text-gray-500 mb-6">Select the services this team member offers.</p>

            <div className="flex space-x-2 mb-6 sticky top-0 bg-white ">
                {services.map(category => (
                    <Button
                        type="button"
                        key={category.category}
                        variant={activeCategory === noSpaceString(category.category).toLowerCase() ? "default" : "outline"}
                        onClick={() => {
                            setActiveCategory(noSpaceString(category.category).toLocaleLowerCase());
                            handleLinkClick(noSpaceString(category.category).toLowerCase());
                        }}
                    >
                        {category.category}
                    </Button>
                ))}
            </div>


            {services.map((category, index) => (
                <>
                    <div key={index} id={noSpaceString(category.category).toLowerCase()} className=" flex flex-col gap-1 mb-20 ">
                        <div className=" flex items-center h-[50px] border-b border-zinc-200 gap-[10px] ">
                            <Checkbox className=" w-5 h-5 " />
                            <div className="text-xl font-semibold ">{category.category}</div>
                        </div>

                        <ul className=" px-4 ">
                            {category.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-center justify-between h-[80px] border-b border-zinc-200 gap-[15px] ">
                                    <div className="flex items-center">
                                        <Checkbox />
                                        <label htmlFor={`${category.category}-${itemIndex}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {item.name}
                                        </label>
                                    </div>
                                    <span className="text-sm text-gray-500">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ))}
        </>
    )
}