'use client'
import Modal from "@/components/modal/Modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cake, CalendarPlus, ChevronDown, Mail, MoreVertical, Phone, User, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import OverView from "./drawer-components/OverView"
import { useState } from "react"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import Appointment from "./drawer-components/Appointment"
import Sales from "./drawer-components/Sales"
import ClientDetail from "./drawer-components/ClientDetail"
import Items from "./drawer-components/Items"
import Review from "./drawer-components/Review"
import { GetSingleClient } from "@/api/client/get-single-client"
import Loading from "@/components/common/loading"
import { shortName } from "@/lib/utils"
import AppDropdown from "@/components/common/DropDown"
import PhoneOverview from "./phone-screen-components/phone-overview"
import PhoneAppointment from "./phone-screen-components/phone-appointment"
import PhoneSales from "./phone-screen-components/phone-sales"
import PhoneClientDetail from "./phone-screen-components/phone-client-detail"
import PhoneItems from "./phone-screen-components/phone-items"
import PhoneReview from "./phone-screen-components/phone-revies"
import Link from "next/link"
import { DeleteClient } from "@/api/client/delete-client"
import ConfirmDialog from "@/components/common/confirm-dialog"

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

type Props = {
    clientId: string;
}

export default function ClientDrawer({ clientId }: Props) {
    const { data: singleClient, isLoading } = GetSingleClient(clientId);
    const { mutate } = DeleteClient()
    const router = useRouter();
    const { getQuery, setQuery, deleteQuery } = useSetUrlParams();
    const clientDrawerTab = getQuery('drawer-tab')
    const handleClose = () => {
        deleteQuery({ key: 'drawer' })
    };

    const deleteClient = (id: string) => {
        mutate({ id: id })
    }

    const renderCurrentTab = (tab: string) => {
        if (singleClient) {
            switch (tab) {
                case "overview":
                    return <OverView />;
                case "appointment":
                    return <Appointment />;
                case "sales":
                    return <Sales />;
                case "client-details":
                    return <ClientDetail client={singleClient} />;
                case "items":
                    return <Items />;
                case "review":
                    return <Review />;
                default:
                    return <OverView />;
            }
        }
    }

    const phoneScreenRenderCurrentTab = (tab: string) => {
        if (singleClient) {
            switch (tab) {
                case "overview":
                    return <PhoneOverview />;
                case "appointment":
                    return <PhoneAppointment />;
                case "sales":
                    return <PhoneSales />;
                case "client-details":
                    return <PhoneClientDetail client={singleClient} />;
                case "items":
                    return <PhoneItems />;
                case "review":
                    return <PhoneReview />;
                default:
                    return null;
            }
        }
    }
    return (
        <Modal onClose={handleClose} >
            {isLoading ? (
                <Loading />
            ) : (
                singleClient && (
                    <div className="block md:flex h-screen w-full bg-white">
                        <aside style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-full md:w-[300px] bg-white p-5 border-r h-full overflow-auto space-y-4 ">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <Avatar className="h-16 w-16 mb-2">
                                    <AvatarImage src={singleClient.profilePicture} alt={shortName(singleClient.firstName)} />
                                    <AvatarFallback>{shortName(singleClient.firstName)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-semibold">{singleClient.firstName} {singleClient.lastName}</h2>
                                    <p className="text-xs tracking-tight text-gray-500">{singleClient?.email}</p>
                                </div>
                                <div className="  flex justify-center items-center ">
                                    <AppDropdown trigger={(
                                        <span className="w-full mb-4 px-4 py-2 inline-block rounded-lg border border-gray-300 md:border-none "><MoreVertical className=" h-4 w-4 hidden md:block " /> <span className=" flex items-center md:hidden ">Action <ChevronDown className=" h-4 w-4 " /> </span> </span>
                                    )}>
                                        <div>
                                            <Link href={`/manage/clients/${singleClient.id}/edit`} className=" w-full flex text-sm justify-start px-4 py-2 rounded-lg hover:bg-gray-100 ">Edit Client</Link>
                                            <ConfirmDialog title="Are you sure to delete?" description="All data of this client also be deleted" onConfirm={() => deleteClient(singleClient.id.toString())}>
                                                <span className=" w-full flex justify-start text-delete px-4 py-2 text-sm rounded-lg hover:bg-gray-100 ">Delete Client</span>
                                            </ConfirmDialog>
                                        </div>
                                    </AppDropdown>
                                </div>
                            </div>

                            <div className="space-y-2 ">
                                <div className="w-full flex justify-start items-center">
                                    <Phone className="mr-3 h-4 w-4" /> {singleClient.phone}
                                </div>
                                <div className="w-full flex justify-start items-center">
                                    <User className="mr-3 h-4 w-4" /> {singleClient.gender}
                                </div>
                                <div className="w-full flex justify-start items-center">
                                    <Cake className="mr-3 h-4 w-4" /> {singleClient.dob}
                                </div>
                            </div>
                            <hr className=" " />
                            <Card className="space-y-1">
                                {navItems.map((item) => (
                                    <Button
                                        onClick={() => setQuery({ key: 'drawer-tab', value: item.toLowerCase() })}
                                        key={item}
                                        variant="ghost"
                                        className={`w-full justify-start ${item.toLowerCase() == clientDrawerTab ? "bg-blue-100 font-semibold" : ""
                                            }`}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Card>
                        </aside>

                        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 h-full hidden md:block  overflow-auto">
                            {renderCurrentTab(clientDrawerTab)}
                        </main>
                        <main className="block md:hidden">
                            {phoneScreenRenderCurrentTab(clientDrawerTab)}
                        </main>
                    </div>
                )
            )}
        </Modal>
    )
}