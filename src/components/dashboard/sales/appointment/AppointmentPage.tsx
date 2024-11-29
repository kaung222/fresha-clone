'use client'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Paperclip, Plus, Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CommonHeader from "@/components/common/common-header"
import AppDropdown from "@/components/common/DropDown"
import Link from "next/link"
import { GetAllAppointments } from "@/api/appointment/get-all-appointment"
import CircleLoading from "@/components/layout/circle-loading"
import { format } from "date-fns"
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

export default function AppointmentsPage() {
    const { data: allAppointments, isLoading } = GetAllAppointments();
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
    const openDetailDrawer = (appointmentId: string) => {
        setQuery({ key: 'detail', value: appointmentId })
    }

    const filteredAppointment = (allAppointments: AppointmentForAll[], status: string, memberId: string, search: string) => {
        console.log(status, memberId)
        return allAppointments.filter((appointment) => {
            const statusMatch = status != 'all' ? appointment.status == status : true
            const memberMatch = memberId != 'all' ? String(appointment.memberId) == memberId : true
            const searchMatch = search ? String(appointment.id).includes(search) : true

            return statusMatch && memberMatch && searchMatch
        })
    }

    const handleClearFilters = () => {
        deleteQuery({ key: 'member' })
        deleteQuery({ key: 'status' })
    }

    const memberIdToName = (id: number) => {
        if (allMembers) {
            return allMembers?.find(m => m.id == id)?.firstName
        } else {
            return id
        }
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
                    <div className="flex justify-between items-start mb-[30px] ">
                        <CommonHeader title="Appointments" para="View, filter and export appointments booked by your clients." />
                        <div className=" flex gap-2 items-center justify-between">
                            <div>
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
                            </div>
                            <div>
                                <Link href={'/sales/appointments/create'} className=" px-4 py-2 flex items-center bg-black rounded-lg border text-white hover:bg-gray-800 ">
                                    Add
                                    <Plus className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 p-1 ">
                        <div className="flex-1 relative w-full max-w-[350px] min-w-[300px] h-[44px] ">
                            <div className=" absolute w-[44px] h-[44px] flex justify-center items-center ">
                                <Search className=" w-4 h-4 " />
                            </div>
                            {searchQuery && (
                                <X onClick={() => setSearchQuery('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                            )}
                            <Input placeholder="Search by Ref#" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full ps-12 focus:outline-none focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  " />
                        </div>
                        <DateRangePicker>
                            <span className=" px-4 py-2 rounded-xl border hover:bg-gray-100 ">
                                {(startDate || endDate) ? `(${(startDate ? startDate : 'Today')}) - (${endDate ? endDate : 'Today'})` : 'Today'}
                            </span>
                        </DateRangePicker>
                        {allMembers && (
                            <AppointmentFilterDialog allMembers={allMembers}>
                                <span className=" flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 ">
                                    Filters
                                    <SlidersHorizontal className="ml-2 h-4 w-4" />
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
                    <div className=" flex gap-3 mb-10 ">
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
                    <Table className=" mb-[50vh] ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" font-bold text-zinc-500 ">Ref #</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Team member</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Client</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Service</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Booked Date</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Duration</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Scheduled Date</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Price</TableHead>
                                <TableHead className=" font-bold text-zinc-500 ">Status</TableHead>
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
                                            <div className="flex flex-col items-center justify-center h-[300px]">
                                                <Calendar className="h-20 w-20 text-gray-400 mb-2" />
                                                <p className=" text-xl font-bold">No appointments </p>
                                                <p className=" text-muted-foreground">Visit the calendar to book appointments</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedAppointment(filteredAppointment(allAppointments, status, memberId, searchQuery), sortBy)?.map((appointment) => (
                                        <TableRow key={appointment.id} onClick={() => openDetailDrawer(appointment.id.toString())} className=" h-20 ">
                                            <TableCell style={{ borderColor: `${colorOfStatus(appointment.status)}` }} className="font-medium border-l-8 text-blue-600">{appointment.id}</TableCell>
                                            <TableCell className=" font-medium ">{appointment.memberId ? memberIdToName(appointment.memberId) : '--'}</TableCell>
                                            <TableCell className=" font-medium ">{appointment.username}</TableCell>
                                            <TableCell className=" font-medium ">{appointment.username}</TableCell>
                                            <TableCell className=" font-medium ">{format(appointment.createdAt, "yyyy-MM-dd")}</TableCell>
                                            <TableCell className=" font-medium ">{format(appointment.date, "yyyy-MM-dd")}</TableCell>
                                            <TableCell className=" font-medium ">{secondToHour(appointment.totalTime, 'duration')}</TableCell>
                                            <TableCell className=" font-medium ">{appointment.discountPrice}</TableCell>
                                            <TableCell>
                                                <span style={{ color: colorOfStatus(appointment.status), borderColor: colorOfStatus(appointment.status) }} className="px-2 py-1 rounded-full  font-bold bg-white border ">{appointment.status}</span>

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
                </div>
            </main>
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
        </>
    )
}