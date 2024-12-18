'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CreditCard, Edit, Filter, Info, List, MoreHorizontal, Paperclip, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import AppDialog from '@/components/common/dialog'
import Filters from './filter'
import AppDropdown from '@/components/common/DropDown'
import Link from 'next/link'
import { GetPayments } from '@/api/payment/get-payment'
import { format } from 'date-fns'
import PaginationBar from '@/components/common/PaginationBar'
import PageLoading from '@/components/common/page-loading'
import ErrorPage from '@/components/common/error-state'
import DetailPaymentDrawer from './drawer/detail-drawer'

export default function PaymentTransactions() {
    const [dateRange, setDateRange] = useState('13 June, 2024 - 14 July, 2024');
    const { data: paymentTransactions, isLoading } = GetPayments()
    const { setQuery, getQuery } = useSetUrlParams();
    const openDrawer = (drawerId: string) => {
        setQuery({ key: 'drawer_detail', value: drawerId })
    };

    const drawerDetail = getQuery('drawer_detail');



    return (
        <>
            <div className="w-full mx-auto bg-white">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Payment transactions</h1>
                        <p className="text-sm text-gray-500 hidden md:block">View, filter and export the history of your payments.</p>
                    </div>
                    <div className=" flex items-center gap-2 ">
                        {/* <QuickPayDialog /> */}
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                    <div className="relative flex-grow max-w-[400px] min-w-[300px] ">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search by Sale or Client" className="pl-8 focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0" />
                    </div>
                    {/* <div>
                        <AppDialog title='Filters' trigger={(
                            <span className=' px-4 py-2 rounded-lg border hover:bg-gray-100 flex items-center ' >
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </span>
                        )}>
                            <Filters />

                        </AppDialog>
                    </div> */}
                </div>

                <Table className=' border '>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ref#</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Sale Type</TableHead>
                            <TableHead>method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <PageLoading />
                                </TableCell>
                            </TableRow>
                        ) : paymentTransactions?.records ? (
                            paymentTransactions.records.length > 0 ? (

                                paymentTransactions?.records?.map((transaction, index) => (
                                    <TableRow key={index} className=''>
                                        <TableCell>{index}</TableCell>
                                        <TableCell>{format(transaction.createdAt, "EEE MM dd")}</TableCell>
                                        <TableCell>{transaction.clientName}</TableCell>
                                        <TableCell>{transaction.appointmentId ? "Service Sale" : "Product Sale"}</TableCell>
                                        <TableCell>{transaction.method}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>
                                            <span className="flex justify-end space-x-2">
                                                <Button onClick={() => openDrawer(transaction.id)} variant="ghost" size="icon">
                                                    <Info className="h-4 w-4" />
                                                </Button>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="text-center py-12">
                                            <CreditCard className="mx-auto h-12 w-12 text-brandColor" />
                                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No Payment record.</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">Sale product & complete appointment to get payment.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <ErrorPage />

                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <PaginationBar totalPages={paymentTransactions?._metadata?.pageCount || 1} />
            </div>
            {drawerDetail && (
                <DetailPaymentDrawer />
            )}
        </>
    )
}