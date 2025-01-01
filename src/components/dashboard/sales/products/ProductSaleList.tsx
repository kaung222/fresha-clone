'use client'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleHelp, Info, PackageOpen, Paperclip, Plus, Search, SlidersHorizontal } from "lucide-react"
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
import { secondToHour } from "@/lib/utils"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { GetTeamMember } from "@/api/member/get-teammember"
import QuickProductSale from "./quick-sale/quick-sale"
import { GetAllProductSales } from "@/api/sales/product-sale"
import PaginationBar from "@/components/common/PaginationBar"
import ControllableDropdown from "@/components/common/control-dropdown"
import { useState } from "react"
import PageLoading from "@/components/common/page-loading"
import { Card } from "@/components/ui/card"
import DetailProductSale from "./drawer/product-sale-drawer"
import SaleTable from "./sale-table"
import { LabelGuide } from "../../guide/label-guide"

export default function ProductSaleList() {
    const { data: productSales, isLoading } = GetAllProductSales();
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { data: allMembers } = GetTeamMember()
    const { setQuery, getQuery } = useSetUrlParams()
    const detailProductSaleId = getQuery('sale-detail');
    const openDetailDrawer = (saleId: string) => {
        setQuery({ key: 'sale-detail', value: saleId })
    }

    const quickSale = getQuery('drawer');

    const addQuickSale = () => {
        setQuery({ key: 'drawer', value: 'quick_sale' })
    }

    return (
        <>
            <main className="flex-1 overflow-y-auto bg-white">
                <div className=" ">
                    <div className="flex justify-between items-start mb-[10px] md:mb-[20px] ">
                        <div>
                            <div className=" relative inline-block ">
                                <h1 className=" text-xl md:text-2xl tracking-tight md:tracking-normal font-semibold mb-1">Product Sale</h1>
                                <div className=" absolute top-0 -right-5 ">
                                    <LabelGuide currentIndex={5}>
                                        <CircleHelp className=' w-4 h-4 cursor-pointer ' />
                                    </LabelGuide>
                                </div>
                            </div>
                            <p className="text-muted-foreground mb-1 hidden md:block">
                                View, filter and export product sales.
                            </p>
                        </div>
                        <div className=" flex gap-2 items-center justify-between h-10">
                            {/* <div className=" hidden md:block ">
                                <AppDropdown trigger={(
                                    <span className=" px-4 py-2 flex items-center rounded-lg border hover:bg-gray-100 ">
                                        Export
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </span>
                                )} >
                                    <div className=" flex flex-col gap-1 ">
                                        <Button variant={'outline'}>
                                            <Paperclip className=" size-4" /> PDF
                                        </Button>
                                        <Button variant={'outline'}>
                                            <Paperclip className=" size-4" /> CVS
                                        </Button>
                                    </div>
                                </AppDropdown>
                            </div> */}
                            <div>
                                {/* <Button onClick={() => {
                                    addQuickSale()
                                }} className=" bg-brandColor hover:bg-brandColor/90 " >
                                    Quick Sale
                                </Button> */}
                                <Link href={`/sales/products/create`} className=" px-4 py-2 bg-brandColor h-10 text-white hover:bg-brandColor/90 rounded-lg ">Quick Sale</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-3 mb-[10px] md:mb-[20px] p-1 ">
                        <div className="flex-1 relative w-full max-w-[400px] min-w-[300px] h-[44px] ">
                            <div className=" absolute w-[44px] h-[44px] flex justify-center items-center ">
                                <Search className=" w-4 h-4 " />
                            </div>
                            <Input placeholder="Search Option" className="w-full ps-12 focus:outline-none focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0  " />
                        </div>
                        {/* <Select defaultValue="month" >
                            <SelectTrigger className="w-[180px] ">
                                <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Month to date</SelectItem>
                                <SelectItem value="week">Week to date</SelectItem>
                                <SelectItem value="year">Year to date</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            Filters
                            <SlidersHorizontal className="ml-2 h-4 w-4" />
                        </Button>
                        <Select defaultValue="newest">
                            <SelectTrigger className="w-[250px] ">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Scheduled Date (newest first)</SelectItem>
                                <SelectItem value="oldest">Scheduled Date (oldest first)</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>
                    <SaleTable productSales={productSales?.records} isLoading={isLoading} metadata={productSales?._metadata} />
                    {/* <Table className=" border ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-text font-bold text-zinc-900 ">Ref #</TableHead>
                                <TableHead className=" text-text font-bold text-zinc-900 ">Client</TableHead>
                                <TableHead className=" text-text font-bold text-zinc-900 ">Amount</TableHead>
                                <TableHead className=" text-text font-bold text-zinc-900 ">Sale Date</TableHead>
                                <TableHead className=" text-text font-bold text-zinc-900 ">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <PageLoading />
                                    </TableCell>
                                </TableRow>
                            ) : productSales && (
                                productSales.records.length > 0 ? (
                                    productSales.records?.map((sale, index) => (
                                        <TableRow key={sale.id}>
                                            <TableCell className="font-medium text-blue-600">{index + 1}</TableCell>
                                            <TableCell>{sale.username}</TableCell>
                                            <TableCell>{sale.totalPrice}</TableCell>
                                            <TableCell>{format(sale.createdAt, "EEE dd MM yyyy")}</TableCell>
                                            <TableCell>
                                                <Button variant={'ghost'} onClick={() => openDetailDrawer(sale.id)}>
                                                    <Info className=" w-4 h-4 " />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div className="text-center py-12">
                                                <PackageOpen className="mx-auto h-12 w-12 text-brandColor" />
                                                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products sale!</h3>
                                                <div className=" text-muted-foreground text-sm ">
                                                    <Link href={'/sales/products/create'} className=" font-medium text-brandColor hover:underline "> Calendar</Link>
                                                    <span> a new product sale.</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}

                        </TableBody>
                    </Table>
                    <PaginationBar totalPages={productSales?._metadata?.pageCount || 1} totalResult={productSales?._metadata.totalCount} />
            {
                detailProductSaleId && (
                    <DetailProductSale />
                )
            } */}
                </div>
            </main>
            {
                quickSale && (
                    <QuickProductSale />
                )
            }
        </>
    )
}