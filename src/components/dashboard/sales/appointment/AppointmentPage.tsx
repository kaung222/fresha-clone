'use client'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleHelp, Filter, Info, Paperclip, Plus, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CommonHeader from "@/components/common/common-header"
import AppDropdown from "@/components/common/DropDown"
import Link from "next/link"
import { GetAllAppointments } from "@/api/appointment/get-all-appointment"
import CircleLoading from "@/components/layout/circle-loading"
import { format, formatDistanceToNow } from "date-fns"
import { colorOfStatus, secondToHour } from "@/lib/utils"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { GetTeamMember } from "@/api/member/get-teammember"
import DetailAppointment from "../../calendar/drawers/detail/detail-appointment"
import CheckoutAppointmentDataProvider from "../../calendar/drawers/checkout-appointment/CheckoutAppointmentDataProvider"
import AppointmentFilterDialog from "./actionBars/AppointmentFilterDialog"
import DateRangePicker from "./actionBars/DateRangeDialog"
import { AppointmentForAll } from "@/types/appointment"
import { useState } from "react"
import ErrorPage from "@/components/common/error-state"
import SortDropdown from "./actionBars/SortDropdown"
import { Badge } from "@/components/ui/badge"
import { GetAllAppointmentsByCreatedDate } from "@/api/appointment/get-all-appointment-by-createdAt"
import { LabelGuide } from "../../guide/label-guide"

export default function AppointmentsPage() {
    const { data: allAppointments, isLoading } = GetAllAppointmentsByCreatedDate();
    const { data: allMembers } = GetTeamMember()
    const { setQuery, getQuery, deleteQuery } = useSetUrlParams()
    const detailAppointmentId = getQuery('detail');
    const checkoutId = getQuery('checkout');
    const startDate = getQuery('startDate');
    const endDate = getQuery('endDate');
    const memberId = getQuery('member') || 'all';
    const status = getQuery('status') || 'all';
    const sortBy = getQuery('sortBy') || 'createdAt';
    const [searchQuery, setSearchQuery] = useState('');
    const [dialogLabel, setDialogLabel] = useState<string>("Today");
    const openDetailDrawer = (appointmentId: string) => {
        setQuery({ key: 'detail', value: appointmentId })
    }

    const filteredAppointment = (allAppointments: AppointmentForAll[], status: string, memberId: string, search: string) => {
        console.log(status, memberId)
        return allAppointments.filter((appointment) => {
            const statusMatch = status != 'all' ? appointment.status == status : true
            const memberMatch = memberId != 'all' ? appointment.bookingItems.flatMap(m => m.memberId).includes(Number(memberId)) : true
            const searchMatch = search ? String(appointment.id).includes(search) : true

            return statusMatch && memberMatch && searchMatch
        })
    }

    const handleClearFilters = () => {
        deleteQuery({ key: 'member' })
        deleteQuery({ key: 'status' })
    }


    const sortedAppointment = (appointments: AppointmentForAll[], sortBy: string) => {
        return appointments.sort((a, b) => {
            let compareValue = 0;

            switch (sortBy) {
                case 'createdAt':
                    compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    break;
                case 'createdAtVs':
                    compareValue = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    break;
                case 'bookAt':
                    compareValue = new Date(a.date).getTime() - new Date(b.date).getTime()
                    break;
                case 'bookAtVs':
                    compareValue = new Date(b.date).getTime() - new Date(a.date).getTime()
                    break;
            }

            return compareValue
        })
    }

    return (
        <>
            <main className="flex-1 overflow-y-auto bg-white">
                <div className=" ">
                    <div className="flex gap-2 justify-between items-start mb-[10px] md:mb-[20px] ">
                        <CommonHeader title='Appointments' currentIndex={4} para='View, filter and export appointments booked by your clients.' />

                        {/* <div>
                            <div className=" relative inline-block ">
                                <h1 className=" text-xl md:text-2xl tracking-tight md:tracking-normal font-semibold mb-1">Appointments</h1>
                                <div className=" absolute top-0 -right-5 ">
                                    <LabelGuide currentIndex={4}>
                                        <CircleHelp className=' w-4 h-4 cursor-pointer ' />
                                    </LabelGuide>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-1 hidden md:block">
                                View, filter and export appointments booked by your clients.
                            </p>
                        </div> */}
                        <div className=" flex gap-2 items-center justify-between">
                            {/* <div className=" hidden md:block ">
                                <AppDropdown trigger={(
                                    <span className=" px-4 py-2 flex items-center rounded-lg border hover:bg-gray-100 ">
                                        Export
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </span>
                                )} >
                                    <div className=" flex flex-col gap-1 ">
                                        <Button variant={'ghost'}>
                                            <Paperclip className=" size-4" /> PDF
                                        </Button>
                                        <Button variant={'ghost'}>
                                            <Paperclip className=" size-4" /> CVS
                                        </Button>
                                    </div>
                                </AppDropdown>
                            </div> */}
                            <div>
                                <Link href={'/sales/appointments/create'} className=" px-4 py-2 flex items-center bg-brandColor rounded-lg text-white hover:bg-brandColor/90 ">
                                    Create
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-3 p-1 ">
                        <div className="flex-1 relative w-full min-w-[300px] max-w-[400px]  h-[44px] ">
                            <div className=" absolute w-[44px] h-[44px] flex justify-center items-center ">
                                <Search className=" w-4 h-4 " />
                            </div>
                            {searchQuery && (
                                <X onClick={() => setSearchQuery('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                            )}
                            <Input placeholder="Search by Ref#" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full ps-12 focus:outline-none focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0  " />
                        </div>
                        <DateRangePicker dialogLabel={dialogLabel} setDialogLabel={setDialogLabel} />
                        {allMembers && (
                            <AppointmentFilterDialog allMembers={allMembers}>
                                <span className=" flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg border hover:bg-gray-100 ">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters

                                </span>
                            </AppointmentFilterDialog>
                        )}
                        <SortDropdown defaultValue="createdAt" options={[
                            { name: 'Booked Date (newest first)', value: 'createdAt' },
                            { name: 'Booked Date (oldest first)', value: 'createdAtVs' },
                            { name: 'Scheduled Date (newest first)', value: 'bookAt' },
                            { name: 'Scheduled Date (oldest first)', value: 'bookAtVs' },
                        ]} />
                    </div>
                    <div className=" flex  mb-[10px] md:mb-5 ">
                        {(memberId != 'all' || status != 'all') && (
                            <Button
                                variant="outline"
                                type="button"
                                onClick={handleClearFilters}
                                className=" relative "
                            >
                                <X className=" text-delete absolute top-1 right-1 size-3 " />
                                Clear filters
                            </Button>
                        )}
                    </div>
                    <Table className=" mb-[50vh] border ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" font-bold text-zinc-500 ">Ref #</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Client</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Service</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Price</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Scheduled Date</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Booked On</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Status</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">type</TableHead>
                                <TableHead className=" font-bold text-zinc-500 "></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : allAppointments ? (
                                filteredAppointment(allAppointments, status, memberId, searchQuery).length == 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <div className="text-center py-12">
                                                <Calendar className="mx-auto h-12 w-12 text-brandColor" />
                                                <h3 className="mt-2 text-xl font-semibold">No appointment yet for {dialogLabel == "custom" ? "these days" : dialogLabel}!.</h3>
                                                <div className=" text-muted-foreground text-sm ">

                                                    <span>Visit the </span>
                                                    <Link href={'/calendar'} className=" font-medium text-brandColor hover:underline "> Calendar</Link>

                                                    <span> or </span>
                                                    <Link href={`sales/appointments/create`} className=" font-medium text-brandColor hover:underline ">create-page</Link>
                                                    <span> to book appointments.</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedAppointment(filteredAppointment(allAppointments, status, memberId, searchQuery), sortBy)?.map((appointment, index) => (
                                        <TableRow key={appointment.id} className=" h-20 ">
                                            <TableCell style={{ borderColor: `${colorOfStatus(appointment.status)}` }} className="font-medium border-l-8 text-blue-600 cursor-pointer " >{appointment?.token}</TableCell>
                                            <TableCell className=" font-medium ">{appointment.username}</TableCell>
                                            <TableCell className=" font-medium ">
                                                <p>{appointment?.bookingItems?.length} service{appointment.bookingItems.length > 1 && "s"}</p>
                                                <p>{secondToHour(appointment.totalTime, 'duration')}</p>
                                            </TableCell>
                                            <TableCell className=" font-medium ">{appointment.discountPrice}</TableCell>
                                            <TableCell className=" font-medium ">{format(appointment.date, "yyyy-MM-dd")} {secondToHour(appointment.startTime)}</TableCell>
                                            <TableCell className=" font-medium ">{formatDistanceToNow(appointment.createdAt)} ago</TableCell>
                                            <TableCell>
                                                <span style={{ color: colorOfStatus(appointment.status), borderColor: colorOfStatus(appointment.status) }} className="px-2 py-1 rounded-full  font-bold bg-white border ">{appointment.status}</span>

                                            </TableCell>
                                            <TableCell>
                                                <span>
                                                    <Badge variant="outline" className={`${appointment.isOnlineBooking ? " text-green-500" : " text-blue-500"}`}>{appointment.isOnlineBooking ? "online" : "local"}</Badge>
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => openDetailDrawer(appointment.id)} variant={'brandGhost'} className=" size-8 p-2 ">
                                                    <Info className=" w-4 h-4 " />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <ErrorPage />
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                    {
                        detailAppointmentId && allMembers && (
                            <DetailAppointment detailAppointmentId={detailAppointmentId} allMembers={allMembers} page="table" />
                        )
                    }
                    {
                        allMembers && checkoutId && (
                            <CheckoutAppointmentDataProvider appointmentId={checkoutId} allMembers={allMembers} />
                        )
                    }
                </div>
            </main>
        </>
    )
}