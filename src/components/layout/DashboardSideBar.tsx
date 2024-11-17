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
        id: 'appointments',
        name: 'Appointments',
        icon: <BookCheck className=' w-5 h-5 ' />,
        branch: [
            {
                id: 'apppintments',
                name: "Appointments Sale",
                path: "/appointments/appointments"
            },
            {
                id: 'package_sold',
                name: "Package Sale",
                path: "/appointments/package_sold"
            },
            {
                id: 'payment',
                name: "Payment",
                path: "/appointments/payment"
            },
        ]
    },
    {
        id: 'sales',
        name: 'Sales',
        icon: <Database className="h-5 w-5" />,
        branch: [
            {
                id: 'products',
                name: "Products Sale",
                path: '/sales/products'
            },
            {
                id: 'payment',
                name: "Payment",
                path: '/sales/payment'
            },
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

    return (
        <>
            <ScrollArea className="w-[258px] bg-white h-full border-r  border-[#E5E5E5] ">
                <nav className=' py-4 gap-4 w-full ' >
                    <Accordion className="flex flex-col items-start py-2 px-3 gap-2 w-full " type="single" collapsible>
                        {sideBarData.map((data) => (
                            <div className=' w-full ' key={data.id}>
                                {data.branch ? (
                                    <AccordionItem key={data.id} className=' border-none w-full ' value={data.id}>
                                        <AccordionTrigger className={` h-10 px-4 py-3 rounded-md flex items-center w-full hover:no-underline hover:bg-zinc-100 ${isPath(data.id) ? " bg-zinc-100" : ""} `} >
                                            <div className='  flex items-center  gap-2'>
                                                {data.icon}
                                                <p className={`text-[16px] leading-[16px] font-[500] tracking-tight  ${isPath(data.id) ? "text-zinc-900" : "text-zinc-700"}`}>{data.name}</p>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {data.branch.map((branch) => branch.path ? (
                                                <Link key={branch.id} href={branch.path} className=' ml-6 h-[28px] rounded-[6px] py-2 px-4 gap-2 hover:bg-zinc-100 flex items-center '>
                                                    <p className=' text-[15px] leading-[14px] tracking-tight font-[500] text-zinc-600' >{branch.name}</p>
                                                </Link>
                                            ) : (
                                                <div key={branch.id} className=' ml-6 h-[34px] rounded-[6px] py-2 px-4 gap-2 my-1 flex items-center '>
                                                    <p className=' text-[15px] leading-[14px] tracking-tight font-[700] text-zinc-800' >{branch.name}</p>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <Link key={data.id} href={`/${data.id}`} className={`h-10 px-4 rounded-md py-3 gap-2 w-full hover:bg-zinc-100 flex items-center ${isPath(data.id) ? "bg-zinc-100" : ""} `}>
                                        {data.icon}
                                        <p className={`text-[16px] leading-[16px] font-[500]  ${isPath(data.id) ? "text-zinc-900" : "text-zinc-700"} `}>{data.name}</p>

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