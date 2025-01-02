'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart2, BookCheck, Calendar, CreditCard, Database, Home, Info, Mail, Package, Scissors, Send, SendHorizonal, Settings, Smile, Users } from 'lucide-react'
import { RiTimeLine } from 'react-icons/ri'
import { GetAllAppointments } from '@/api/appointment/get-all-appointment'
import { format } from 'date-fns'
import TooltipApp from '../common/tool-tip-sidebar'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetAllAppointmentsByCreatedDate } from '@/api/appointment/get-all-appointment-by-createdAt'
import App from 'next/app'

type SidebarItem = {
    name: string
    icon: React.ReactNode
    path: string
    items?: { name: string; path: string }[]
}

type SidebarGroup = {
    name: string
    items: SidebarItem[]
}

const sidebarGroups: SidebarGroup[] = [
    {
        name: "Main",
        items: [
            { name: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
            { name: "Calendar", icon: <Calendar className="h-5 w-5" />, path: "/calendar" },
        ]
    },
    {
        name: "Business",
        items: [
            {
                name: "Sales",
                icon: <Database className="h-5 w-5" />,
                path: "/sales",
                items: [
                    { name: "Appointments", path: "/sales/appointments" },
                    { name: "Products Sale", path: "/sales/products" },
                ]
            },
            {
                name: "Services",
                icon: <Scissors className="h-5 w-5" />,
                path: "/services",
                items: [
                    { name: "Services List", path: "/services/lists" },
                    { name: "Categories", path: "/services/service-categories" },
                ]
            },
            {
                name: "Products",
                icon: <Package className="h-5 w-5" />,
                path: "/products",
                items: [
                    { name: "Products List", path: "/products/lists" },
                    { name: "Brands", path: "/products/brands" },
                    { name: "Categories", path: "/products/product-categories" },
                ]
            },
        ]
    },
    {
        name: "People",
        items: [
            { name: "Team Members", icon: <Users className="h-5 w-5" />, path: "/teammembers" },
            { name: "Clients", icon: <Smile className="h-5 w-5" />, path: "/clients" },
        ]
    },
    {
        name: "Management",
        items: [
            {
                name: "Scheduling",
                icon: <RiTimeLine className="h-5 w-5" />,
                path: "/scheduling",
                items: [
                    { name: "Scheduled Shifts", path: "/scheduling/scheduled-shifts" },
                    { name: "Closed Days", path: "/scheduling/closed-periods" },
                ]
            },
            { name: "Publication", icon: <Send className="h-5 w-5" />, path: "/publication" },
            { name: "Payments", icon: <CreditCard className="h-5 w-5" />, path: "/payments" },
            { name: "Mail", icon: <Mail className="h-5 w-5" />, path: "/mail" },
            { name: "Contact Us", icon: <SendHorizonal className="h-5 w-5" />, path: "/contact-us" },
        ]
    },
]

type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardSidebar = ({ setOpen }: Props) => {
    const pathname = usePathname()
    const { data: allAppointments } = GetAllAppointments();
    const { data: allSaleAppointments } = GetAllAppointmentsByCreatedDate();
    const { getQuery } = useSetUrlParams()
    const startDate = getQuery("startDate")

    const isActive = (path: string | undefined) => pathname === path || pathname.startsWith(`${path}/`);

    const today = format(new Date(), "yyyy-MM-dd")

    const pendingBooks = () => {
        if (allAppointments) {
            if (pathname.startsWith('/calendar')) {
                return allAppointments.filter(app => app.status == 'pending').length
            } else {
                return allAppointments?.filter(app => app.status == "pending").filter(data => data.date == today).length

            }
        } else {
            return 0;
        }

    }

    const pendingSaleBooks = () => {
        if (allSaleAppointments) {
            if (pathname.startsWith("/sales")) {
                return allSaleAppointments.filter(app => app.status == 'pending').length
            } else {
                return allSaleAppointments?.filter(App => App.status == "pending").filter(data => data.date == today).length

            }
        } else {
            return 0;
        }

    }
    const pendingAppointments = pendingBooks();
    const pendingSaleAppointments = pendingSaleBooks()

    useEffect(() => {
        setOpen(false)
    }, [pathname])



    return (
        <ScrollArea className="w-64 bg-white h-full border-r border-gray-200">
            <div className="py-4 px-3 pb-20 ">
                {sidebarGroups.map((group, index) => (
                    <div key={group.name} className={cn("mb-6", index !== 0 && "mt-6")}>
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-gray-900">{group.name}</h2>
                        <div className="space-y-1">
                            {group.items.map((item) =>
                                item.items ? (
                                    <Accordion key={item.name} type="single" collapsible className="border-none">
                                        <AccordionItem value={item.name} className="border-none">
                                            <AccordionTrigger className={cn(
                                                "flex items-center py-2 px-4 rounded-md text-sm font-medium hover:bg-brandColorLight/40 hover:no-underline",
                                                isActive(item.path) && " text-brandColor"
                                            )}>
                                                <span>{item.icon}</span>
                                                <span className="ml-3 flex-1 text-left">{item.name}</span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="pl-4 mt-1 space-y-1">
                                                    {item.items.map((subItem) => (
                                                        <Link key={subItem.path} href={subItem.path}>
                                                            <Button
                                                                variant={isActive(subItem.path) ? "brandDefault" : "brandGhost"}
                                                                size="sm"
                                                                className={cn(
                                                                    "w-full justify-start relative",
                                                                )}
                                                            >
                                                                {subItem.name}
                                                                {subItem.name == "Appointments" && pendingSaleAppointments > 0 && (
                                                                    <TooltipApp trigger={(
                                                                        <div className={`justify-self-end ml-auto w-6 h-6 rounded-full ${isActive(subItem.path) ? " text-brandColor bg-white " : " text-white bg-brandColor"} justify-center items-center flex `}>{pendingSaleAppointments}</div>
                                                                    )}>
                                                                        <p className=" bg-gray-100 text-xs ">{startDate ? "Current days " : "Today "} unconfirmed appointments</p>
                                                                    </TooltipApp>
                                                                )}


                                                            </Button>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <Link key={item.name} href={item.path || '#'}>
                                        <Button
                                            variant={isActive(item.path) ? "brandDefault" : "brandGhost"}
                                            size="sm"
                                            className={cn(
                                                "w-full justify-start",

                                            )}
                                        >
                                            {item.icon}
                                            <span className="ml-3">{item.name}</span>

                                            {item.name === "Calendar" && pendingAppointments > 0 && (
                                                <TooltipApp trigger={(
                                                    <div className={`justify-self-end ml-auto w-6 h-6 rounded-full ${isActive(item.path) ? " text-brandColor bg-white " : " text-white bg-brandColor"} justify-center items-center flex `}>{pendingBooks()}</div>
                                                )}>
                                                    <p className=" bg-gray-100 text-xs ">{startDate ? "Current days " : "Today "} unconfirmed appointments</p>
                                                </TooltipApp>

                                            )}
                                        </Button>
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default DashboardSidebar


