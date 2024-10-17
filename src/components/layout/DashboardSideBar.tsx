'use client'
import React, { Component } from 'react'
import { Button } from '../ui/button'
import { BarChart2, BookOpen, Calendar, CreditCard, Database, Home, Megaphone, MessageCircle, Settings, Smartphone, User, Users } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import ToolTipSidebar from '../common/tool-tip-sidebar'
import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {}
type SideBarDataType = {
    id: string;
    name: string;
    icon: React.ReactNode,
    branch: {
        id: string,
        name: string,
        path: string
    }[] | null;
}

const sideBarData: SideBarDataType[] = [
    {
        id: 'dashboard',
        name: 'Home',
        icon: <Home className="h-4 w-4" />,
        branch: null
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: <Calendar className="h-4 w-4" />,
        branch: null
    },
    {
        id: 'sales',
        name: 'Sales',
        icon: <Database className="h-4 w-4" />,
        branch: [
            {
                id: 'dailySale',
                name: "Daily Sales Summary",
                path: '/sales/daily-sales'
            },
            {
                id: 'appointment',
                name: "Appointments",
                path: '/sales/appointments'
            },
            {
                id: 'sales',
                name: "Sales",
                path: '/sales/sales'
            },
            {
                id: 'payments',
                name: "Payments",
                path: '/sales/payment'
            },
            {
                id: 'giftCard',
                name: "Gift Cards Sold",
                path: '/sales/gift-cards'
            },
            {
                id: 'membership',
                name: "Memberships sold",
                path: '/sales/memberships'
            },
        ]
    },
    {
        id: 'catalog',
        name: 'Catalog',
        icon: <BookOpen className="h-4 w-4" />,
        branch: null
    },
    {
        id: 'online_booking',
        name: 'Online Booking',
        icon: <Smartphone className="h-4 w-4" />,
        branch: null,
    },
    {
        id: 'team',
        name: 'Team',
        icon: <Users className="h-4 w-4" />,
        branch: [
            {
                id: 'teammember',
                name: 'Team members',
                path: '/team/teammember'
            }, {
                id: 'scheduledShift',
                name: 'Scheduled Shifts',
                path: '/team/scheduled-shifts'
            }
        ]
    },
    {
        id: 'payment',
        name: 'Payments',
        icon: <CreditCard className="h-4 w-4" />,
        branch: null
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: <Settings className="h-4 w-4" />,
        branch: null
    },

]

const DashboardSideBar = (props: Props) => {
    const pathname = usePathname();
    const isPath = (path: string) => {
        return pathname.startsWith(path)
    }

    return (
        <>
            <aside style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-[258px] bg-white h-full overflow-auto border-r  border-[#E5E5E5] ">
                <nav className=' py-4 gap-4 w-full ' >
                    <Accordion className="flex flex-col items-start py-2 px-3 gap-2 w-full " type="single" collapsible>
                        {sideBarData.map((data) => (
                            <>
                                {data.branch ? (
                                    <AccordionItem key={data.id} className=' border-none w-full ' value={data.id}>
                                        <AccordionTrigger className=' h-10 px-4 py-3 rounded-md flex items-center hover:no-underline hover:bg-zinc-100 ' >
                                            <div className='  flex items-center  gap-2'>
                                                {data.icon}
                                                <p className=' text-[14px] leading-[14px] font-[500] text-zinc-900 '>{data.name}</p>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {data.branch.map((branch) => (
                                                <Link key={branch.id} href={branch.path} className=' h-[34px] rounded-[6px] py-2 px-10 gap-2 hover:bg-zinc-100 flex items-center '>
                                                    <p className=' text-[14px] leading-[14px] font-[500] text-zinc-500' >{branch.name}</p>
                                                </Link>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <Link key={data.id} href={`/${data.id}`} className=' h-10 px-4 rounded-md py-3 gap-2 w-full hover:bg-zinc-100 flex items-center '>
                                        {data.icon}
                                        <p className=' text-[14px] leading-[14px] font-[500] text-zinc-900 '>{data.name}</p>

                                    </Link>
                                )}
                            </>


                        ))}
                    </Accordion>
                </nav>
            </aside>
        </>
    )
}

export default DashboardSideBar