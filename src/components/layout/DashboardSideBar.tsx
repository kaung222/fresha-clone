'use client'
import React, { Component } from 'react'
import { Button } from '../ui/button'
import { BarChart2, BookCheck, BookOpen, Calendar, CreditCard, Database, Home, Medal, Megaphone, MessageCircle, Package, Scissors, Send, Settings, Smartphone, Smile, Speaker, User, Users, Warehouse } from 'lucide-react'
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
import { RiTimeLine } from 'react-icons/ri'
import { GetAllAppointments } from '@/api/appointment/get-all-appointment'
import { format } from 'date-fns'


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
        id: '/',
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
        id: 'teammembers',
        name: 'Team Members',
        icon: <Users className="h-5 w-5" />,
        branch: null
    },
    {
        id: 'clients',
        name: 'Clients',
        icon: <Smile className="h-5 w-5" />,
        branch: null
    },
    {
        id: 'services',
        name: 'Services',
        icon: <Scissors className="h-5 w-5" />,
        branch: [
            {
                id: 'service-list',
                name: "Services",
                path: "/services/lists"
            },
            {
                id: 'service-category',
                name: "Category",
                path: '/services/service-categories'
            }
        ]
    },
    {
        id: 'products',
        name: 'Products',
        icon: <Package className="h-5 w-5" />,
        branch: [
            {
                id: 'product_list',
                name: "Products List",
                path: "/products/lists"
            },
            {
                id: 'products_brand',
                name: "Brand",
                path: '/products/brands'
            },
            {
                id: 'products_category',
                name: "Category",
                path: '/products/product-categories'
            },
        ]
    },
    {
        id: 'sales',
        name: 'Sales',
        icon: <Database className="h-5 w-5" />,
        branch: [
            {
                id: 'appointment_sale',
                name: "Appointments",
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
        id: 'publication',
        name: 'Publication',
        icon: <Send className="h-5 w-5" />,
        branch: null,
    },
    {
        id: 'scheduling',
        name: 'Scheduling',
        icon: <RiTimeLine className="h-5 w-5" />,
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
        id: 'payments',
        name: 'Payments',
        icon: <CreditCard className="h-5 w-5" />,
        branch: null
    },
    // {
    //     id: 'settings',
    //     name: 'Settings',
    //     icon: <Settings className="h-5 w-5" />,
    //     branch: null
    // },
]

const DashboardSideBar = (props: Props) => {
    const { data: allAppointments } = GetAllAppointments();
    const pendingBooks = () => {
        const today = format(new Date(), "yyyy-MM-dd")
        if (allAppointments) {
            return allAppointments.filter(app => app.status == 'pending').filter(app => app.date == today).length
        } else {
            return 0;
        }
    }
    const pathname = usePathname();
    const isPath = (path: string) => {
        return pathname == path || pathname.startsWith(`/${path}`)
    }
    const isSubPath = (path: string) => {
        return pathname.startsWith(`${path}`)
    }

    return (
        <>
            <ScrollArea style={{ boxShadow: '0 10px 0 0 22px black' }} className="w-[258px] bg-white h-full border-r border-[#E5E5E5] ">
                <nav className=' py-4 gap-4 w-full ' >
                    <Accordion className="flex flex-col items-start py-2 px-3 gap-2 w-full " type="single" collapsible>
                        {sideBarData.map((data) => (
                            <div className=' w-full ' key={data.id}>
                                {data.branch ? (
                                    <AccordionItem className=' border-none w-full ' value={data.id}>
                                        <AccordionTrigger className={` h-10 px-4 py-3  rounded-md flex items-center w-full hover:no-underline  ${isPath(data.id) ? " " : " "}  hover:bg-brandColorLight/50 `} >
                                            <div className={`flex items-center  gap-2 ${isPath(data.id) ? " text-brandColor " : ""}`}>
                                                {data.icon}
                                                <p className={`text-[16px] leading-[16px] flex-grow font-[500] tracking-tight  ${isPath(data.id) ? " " : ""}`}>{data.name}</p>
                                                {isPath(data.id) && (
                                                    <span className="ml-auto text-brandColor">
                                                        *
                                                    </span>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className=" ">
                                            {data.branch.map((branch, index) => branch.path ? (
                                                <Link key={branch.id} href={branch.path} className={`ml-10 h-[40px] rounded-[6px] px-4 py-2 gap-2 flex items-center ${isSubPath(branch.path) ? " bg-brandColor text-white " : " hover:bg-brandColorLight/50 "}  `}>
                                                    <p className={`text-[15px] leading-[14px] tracking-tight font-[500]  ${isSubPath(branch.path) ? " bg-brandColor text-white " : "  "}`} >{branch.name}</p>
                                                </Link>
                                            ) : (
                                                <div key={branch.id} className={`ml-6 h-[34px] rounded-[6px] py-2 px-4 gap-2 flex items-center ${index != 0 ? " mt-4 " : ""}`}>
                                                    <p className=' text-[16px] leading-[14px] tracking-tight font-[600] text-zinc-500' >{branch.name}</p>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <Link href={`/${data.id}`} className={`h-10 px-4 rounded-md py-3 gap-2 w-full  flex items-center ${isPath(data.id) ? "bg-brandColor text-white" : " hover:bg-brandColorLight/50"} `}>
                                        {data.icon}
                                        <p className={`text-[16px] leading-[16px] font-[500]  ${isPath(data.id) ? "text-white bg-brandColor" : ""} `}>{data.name}</p>
                                        {data.id == "calendar" && pendingBooks() > 0 && (
                                            <div className=' justify-self-end ml-auto w-8 h-8 rounded-full text-white bg-brandColor justify-center items-center flex '>{pendingBooks()}</div>
                                        )}
                                    </Link>
                                )}
                            </div>


                        ))}
                        <div className=' h-[300px] '></div>
                    </Accordion>
                </nav>
            </ScrollArea>
        </>
    )
}

export default DashboardSideBar