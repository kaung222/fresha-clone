'use client'
import React, { Component } from 'react'
import { Button } from '../ui/button'
import { BarChart2, BookCheck, BookOpen, Calendar, CreditCard, Database, Home, Megaphone, MessageCircle, Send, Settings, Smartphone, Speaker, User, Users } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import ToolTipSidebar from '../common/tool-tip-sidebar'
import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from '../ui/scroll-area'


type Props = {}
type SideBarDataType = {
    id: string;
    name: string;
    icon: React.ReactNode,
    branch: {
        id: string,
        name: string,
        path: string | null
    }[] | null;
}

const sideBarData: SideBarDataType[] = [
    {
        id: 'dashboard',
        name: 'Home',
        icon: <Home className="h-5 w-5" />,
        branch: null
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: <Calendar className="h-5 w-5" />,
        branch: null
    },
    {
        id: 'sales',
        name: 'Sales',
        icon: <Database className="h-5 w-5" />,
        branch: [
            {
                id: 'appointment_sale',
                name: "Appointments Sale",
                path: "/sales/appointments"
            },
            {
                id: 'products_sale',
                name: "Products Sale",
                path: '/sales/products'
            }
        ]
    },
    {
        id: 'manage',
        name: 'Manage',
        icon: <BookOpen className="h-5 w-5" />,
        branch: [
            {
                id: 'user-management',
                name: 'User Management',
                path: null
            },
            {
                id: 'teammember',
                name: 'Team members',
                path: '/manage/teammember'
            },
            {
                id: 'client',
                name: 'Client',
                path: '/manage/client'
            },
            {
                id: 'service-label',
                name: 'Service',
                path: null
            },
            {
                id: 'services',
                name: 'Service Menu',
                path: '/manage/services'
            },
            {
                id: 'services-category',
                name: 'Category',
                path: '/manage/service-category'
            },
            {
                id: 'product-label',
                name: 'Product',
                path: null
            },
            {
                id: 'products',
                name: "Products",
                path: '/manage/products'
            },
            {
                id: 'brand',
                name: "Brands",
                path: '/manage/brand'
            },
            {
                id: 'products-category',
                name: "Category",
                path: '/manage/product-category'
            },
        ]
    },
    {
        id: 'publication',
        name: 'Publication',
        icon: <Send className="h-5 w-5" />,
        branch: null,
    },
    {
        id: 'scheduling',
        name: 'Scheduling',
        icon: <Users className="h-5 w-5" />,
        branch: [
            {
                id: 'scheduledShift',
                name: 'Scheduled Shifts',
                path: '/scheduling/scheduled-shifts'
            },
            {
                id: 'closedPeriods',
                name: 'Closed Days',
                path: '/scheduling/closed-periods'
            }
        ]
    },
    {
        id: 'payment',
        name: 'Payments',
        icon: <CreditCard className="h-5 w-5" />,
        branch: null
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        branch: null
    },
]

const DashboardSideBar = (props: Props) => {
    const pathname = usePathname();
    const isPath = (path: string) => {
        return pathname.startsWith(`/${path}`)
    }
    const isSubPath = (path: string) => {
        return pathname.startsWith(`${path}`)
    }

    return (
        <>
            <ScrollArea className="w-[258px] bg-white h-full border-r  border-[#E5E5E5] ">
                <nav className=' py-4 gap-4 w-full ' >
                    <Accordion className="flex flex-col items-start py-2 px-3 gap-2 w-full " type="single" collapsible>
                        {sideBarData.map((data) => (
                            <div className=' w-full ' key={data.id}>
                                {data.branch ? (
                                    <AccordionItem className=' border-none w-full ' value={data.id}>
                                        <AccordionTrigger className={` h-10 px-4 py-3  rounded-md flex items-center w-full hover:no-underline  ${isPath(data.id) ? " " : " "}  hover:bg-sky-100 `} >
                                            <div className='  flex items-center  gap-2'>
                                                {data.icon}
                                                <p className={`text-[16px] leading-[16px] flex-grow font-[500] tracking-tight  ${isPath(data.id) ? "" : ""}`}>{data.name}</p>
                                                {isPath(data.id) && (
                                                    <span className="ml-auto text-button">
                                                        *
                                                    </span>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className=" ">
                                            {data.branch.map((branch, index) => branch.path ? (
                                                <Link key={branch.id} href={branch.path} className={`ml-10 h-[40px] rounded-[6px] px-4 py-2 gap-2 flex items-center ${isSubPath(branch.path) ? " bg-button text-white " : " hover:bg-sky-100 "}  `}>
                                                    <p className={`text-[15px] leading-[14px] tracking-tight font-[500]  ${isSubPath(branch.path) ? " bg-button text-white " : "  "}`} >{branch.name}</p>
                                                </Link>
                                            ) : (
                                                <div key={branch.id} className={`ml-6 h-[34px] rounded-[6px] py-2 px-4 gap-2 flex items-center ${index != 0 ? " mt-4 " : ""}`}>
                                                    <p className=' text-[16px] leading-[14px] tracking-tight font-[600] text-zinc-500' >{branch.name}</p>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <Link href={`/${data.id}`} className={`h-10 px-4 rounded-md py-3 gap-2 w-full  flex items-center ${isPath(data.id) ? "bg-button text-white" : " hover:bg-sky-100"} `}>
                                        {data.icon}
                                        <p className={`text-[16px] leading-[16px] font-[500]  ${isPath(data.id) ? "text-white bg-button" : ""} `}>{data.name}</p>

                                    </Link>
                                )}
                            </div>


                        ))}
                    </Accordion>
                </nav>
            </ScrollArea>
        </>
    )
}

export default DashboardSideBar