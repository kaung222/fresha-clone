'use client'
import { useState } from 'react'
import { CreditCard, DollarSign, Filter, Info, Search, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetPayments } from '@/api/payment/get-payment'
import { format } from 'date-fns'
import PaginationBar from '@/components/common/PaginationBar'
import PageLoading from '@/components/common/page-loading'
import ErrorPage from '@/components/common/error-state'
import DetailPaymentDrawer from './drawer/detail-drawer'
import CommonHeader from '@/components/common/common-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Payment } from '@/types/payment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

type FilterTypes = "all" | "service" | 'product'

export default function PaymentTransactions() {
    const { data: paymentTransactions, isLoading } = GetPayments()
    const { setQuery, getQuery } = useSetUrlParams();
    const [filter, setFilter] = useState<FilterTypes>('all')
    const openDrawer = (drawerId: string) => {
        setQuery({ key: 'drawer_detail', value: drawerId })
    };

    const drawerDetail = getQuery('drawer_detail');

    const filteredPayment = (payments: Payment[], checker: "all" | "service" | 'product') => {
        return payments.filter((payment) => {
            return checker == "all" ? true : checker == "service" ? payment.appointmentId : payment.saleId
        })
    }

    return (
        <>
            <div className="w-full mx-auto bg-white">
                <div className="flex justify-between items-center mb-4">
                    <CommonHeader title='Payment transactions' currentIndex={14} para='View, filter and export the history of your payments.' />

                    {/* <div>
                        <h1 className="text-2xl font-bold">Payment transactions</h1>
                        <p className="text-sm text-gray-500 hidden md:block">View, filter and export the history of your payments.</p>
                    </div> */}
                    <div className=" flex items-center gap-2 ">
                        {/* <QuickPayDialog /> */}
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                    <div className="relative flex-grow max-w-[400px] min-w-[300px] ">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search by Sale or Client" className="pl-8 focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0" />
                    </div>
                    <div>
                        <Select value={filter} onValueChange={(e: FilterTypes) => setFilter(e)}>
                            <SelectTrigger style={{ display: 'flex' }} className=" w-[180px] ">
                                <SelectValue placeholder={(
                                    <span className=" flex items-center gap-1 ">
                                        <Users className=' w-4 h-4 ' /> <span>All Sale</span>
                                    </span>
                                )} />
                            </SelectTrigger>
                            <SelectContent className=' max-h-[200px] '>
                                <SelectItem value='all'>All Sale</SelectItem>
                                <SelectItem value='service'>Service Sale</SelectItem>
                                <SelectItem value='product'>Product Sale</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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

                                filteredPayment(paymentTransactions.records, filter).map((transaction, index) => (
                                    <TableRow key={index} className=''>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{format(transaction.createdAt, "EEE MM dd")}</TableCell>
                                        <TableCell>{transaction.clientName}</TableCell>
                                        <TableCell>{transaction.appointmentId ? "Service Sale" : "Product Sale"}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <div className=' border border-brandColorLight rounded-lg '>
                                                    {transaction.method == "Cash" && (
                                                        <DollarSign className=' size-8 ' />
                                                    )}
                                                    {transaction.method == "KBZ pay" && (
                                                        <Image
                                                            src={'/img/kbz.png'}
                                                            alt='kbz'
                                                            width={500}
                                                            height={400}
                                                            className=' size-8'
                                                        />
                                                    )}
                                                    {transaction.method == "AYA pay" && (
                                                        <Image
                                                            src={'/img/aya.png'}
                                                            alt='aya'
                                                            width={500}
                                                            height={400}
                                                            className=' size-8'
                                                        />
                                                    )}
                                                    {transaction.method == "Wave pay" && (
                                                        <Image
                                                            src={'/img/wave.png'}
                                                            alt='wave'
                                                            width={500}
                                                            height={400}
                                                            className=' size-8'
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    {transaction.method}
                                                </div>
                                            </div>
                                        </TableCell>
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
                <PaginationBar totalPages={paymentTransactions?._metadata?.pageCount || 1} totalResult={paymentTransactions?._metadata.totalCount} />
            </div>
            {drawerDetail && (
                <DetailPaymentDrawer />
            )}
        </>
    )
}