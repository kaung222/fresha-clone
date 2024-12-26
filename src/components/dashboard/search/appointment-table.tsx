'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AppointmentForAll } from '@/types/appointment'
import CircleLoading from '@/components/layout/circle-loading';
import { Calendar, Info } from 'lucide-react';
import Link from 'next/link';
import ErrorPage from '@/components/common/error-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { GetTeamMember } from '@/api/member/get-teammember';
import DetailAppointment from '../calendar/drawers/detail/detail-appointment';
import CheckoutAppointmentDataProvider from '../calendar/drawers/checkout-appointment/CheckoutAppointmentDataProvider';
import { colorOfStatus, secondToHour } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import PaginationBar from '@/components/common/PaginationBar';
import { PagonationMetadata } from '@/types/_metadata';


type Props = {
    appointments: AppointmentForAll[] | undefined;
    isLoading: boolean;
    metadata: PagonationMetadata | undefined;

}

const AppointmentTable = ({ appointments, isLoading, metadata }: Props) => {
    const { setQuery, getQuery } = useSetUrlParams();
    const detailAppointmentId = getQuery('detail');
    const checkoutId = getQuery('checkout');
    const { data: allMembers } = GetTeamMember()


    const openDetailDrawer = (appointmentId: string) => {
        setQuery({ key: 'detail', value: appointmentId })
    }
    return (
        <>
            <div>

                <Table className=" border ">
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" font-bold text-zinc-500 ">Ref #</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Client</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Service</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Price</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Scheduled Date</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Booked On</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Status</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Type</TableHead>
                            <TableHead className=" font-bold text-zinc-500 ">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <CircleLoading />
                                </TableCell>
                            </TableRow>
                        ) : appointments ? (
                            appointments?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div className="text-center py-12">
                                            <Calendar className="mx-auto h-12 w-12 text-brandColor" />
                                            <h3 className="mt-2 text-xl font-semibold">No Search result for appointment!.</h3>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments?.map((appointment, index) => (
                                    <TableRow key={appointment.id} className=" h-20 ">
                                        <TableCell style={{ borderColor: `${colorOfStatus(appointment?.status)}` }} className="font-medium border-l-8 text-blue-600 cursor-pointer " >{appointment?.token}</TableCell>
                                        <TableCell className=" font-medium ">{appointment?.username}</TableCell>
                                        <TableCell className=" font-medium ">
                                            <p>{appointment?.bookingItems?.length} service{appointment.bookingItems?.length > 1 && "s"}</p>
                                            <p>{secondToHour(appointment.totalTime, 'duration')}</p>
                                        </TableCell>
                                        <TableCell className=" font-medium ">{appointment?.discountPrice}</TableCell>
                                        <TableCell className=" font-medium ">{appointment?.date} {secondToHour(appointment?.startTime)}</TableCell>
                                        <TableCell className=" font-medium ">{formatDistanceToNow(appointment?.createdAt)} ago</TableCell>
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
            </div>

            <PaginationBar totalPages={metadata?.pageCount || 1} totalResult={metadata?.totalCount} />

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

export default AppointmentTable