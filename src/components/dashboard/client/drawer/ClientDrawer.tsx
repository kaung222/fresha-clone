'use client'
import Modal from "@/components/modal/Modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus, User, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import OverView from "./drawer-components/OverView"
import { useState } from "react"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import Appointment from "./drawer-components/Appointment"
import Sales from "./drawer-components/Sales"
import ClientDetail from "./drawer-components/ClientDetail"
import Items from "./drawer-components/Items"
import Review from "./drawer-components/Review"

const clientData = {
    name: "Hla Thaung",
    email: "hlathaung@gmail.com",
    createdAt: "18 Oct 2024",
    totalSale: 0,
    appointments: 1,
    rating: "-",
    cancelled: 0,
    noShow: 0,
}

const navItems = [
    "Overview",
    "Appointment",
    "Sales",
    "Client-Details",
    "Items",
    "Review",
]

export default function ClientDrawer() {
    const router = useRouter();
    const { getQuery, setQuery } = useSetUrlParams();
    const clientDrawerTab = getQuery('drawer-tab')
    const handleClose = () => {
        router.push('/client')
    }

    const renderCurrentTab = (tab: string) => {
        switch (tab) {
            case "overview":
                return <OverView />;
            case "appointment":
                return <Appointment />;
            case "sales":
                return <Sales />;
            case "client-details":
                return <ClientDetail />;
            case "items":
                return <Items />;
            case "review":
                return <Review />;
            default:
                return <OverView />;
        }
    }
    return (
        <Modal onClose={handleClose} >
            <div className="flex h-screen w-auto lg:w-[800px] bg-gray-100">
                <aside style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 bg-white p-6 border-r h-full overflow-auto ">
                    <div className="flex flex-col items-center mb-6">
                        <Avatar className="h-16 w-16 mb-2">
                            <AvatarImage src={`https://api.dicebear.com/6.x/micah/svg?seed=${clientData.name}`} />
                            <AvatarFallback>{clientData.name[0]}</AvatarFallback>
                        </Avatar>
                        <h2 className="font-semibold">{clientData.name}</h2>
                        <p className="text-sm text-gray-500">{clientData.email}</p>
                    </div>
                    <Button className="w-full mb-4">Book Now</Button>
                    <div className="space-y-2 mb-4">
                        <Button variant="outline" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Add Pronouns
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Add Date of Birth
                        </Button>
                    </div>
                    <div className="flex items-center mb-6 text-sm text-gray-500">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Created at {clientData.createdAt}
                    </div>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Button
                                onClick={() => setQuery({ key: 'drawer-tab', value: item.toLowerCase() })}
                                key={item}
                                variant="ghost"
                                className={`w-full justify-start ${item === "Overview" ? "bg-gray-100 font-semibold" : ""
                                    }`}
                            >
                                {item}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 h-full  overflow-auto">
                    {renderCurrentTab(clientDrawerTab)}
                </main>
            </div>
        </Modal>
    )
}