'use client'
import { Bell, BarChart2, Calendar, ChevronDown, ChevronLeft, ChevronRight, CreditCard, Home, MessageCircle, Search, Settings, Users, Plus, Paperclip } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DatePicker from "react-datepicker"
import { useState } from "react"
import { format } from "date-fns"
import CommonHeader from "@/components/common/common-header"
import AppDropdown from "@/components/common/DropDown"
import "react-datepicker/dist/react-datepicker.css";

export default function DailySalesSummary() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setCurrentDate(date);
        }
    };
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="">
                <div className="flex justify-between items-center mb-[40px] ">
                    <CommonHeader title="Daily Sales" para="View, filter, and export daily transactions and cash flow." />
                    <div className="flex items-center gap-2 ">
                        <AppDropdown trigger={(
                            <Button variant="outline" className=" ">
                                Export
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
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
                        <Button>
                            Add
                            <Plus className=" ml-2 h-4 w-4 " />
                        </Button>
                    </div>
                </div>
                <div className="bg-white relative rounded-lg h-10 mb-[40px] flex items-center justify-start ">
                    <Button variant="ghost" size="icon" className=" border rounded-l-md rounded-r-none border-thinBorder ">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className=" border-thinBorder border rounded-none ">Today</Button>
                    <div className="text-sm p-2 font-medium border border-thinBorder flex justify-center items-center h-10 ">
                        <div>
                            <DatePicker className=" z-[30] "
                                selected={currentDate}
                                onChange={handleDateChange}
                                dateFormat={"MMMM d, yyyy"}
                                customInput={
                                    <button>

                                        {format(currentDate, "MMMM d, yyyy")}

                                    </button>
                                }
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className=" rounded-l-none border border-thinBorder rounded-r-md ">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-lg shadow flex flex-col gap-5 ">
                        <h2 className=" text-secondHead leading-secondHead font-heading text-zinc-900 " >Transaction summary</h2>
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    <TableHead className="w-[200px] text-text font-bold text-zinc-900 ">Item Type</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">Sales Qty</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">Refund Qty</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">Gross total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {["Services", "Products", "Shipping", "Gift cards", "Memberships", "Late cancellation fees", "No-show fees"].map((item) => (
                                    <TableRow key={item}>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 ">{item}</TableCell>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 text-end ">0</TableCell>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 text-end ">0</TableCell>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 text-end ">MMK 0</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableHead className=" text-text font-semibold text-zinc-900 ">Total Sales</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">0</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">0</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">MMK 0</TableHead>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    <div className="bg-white rounded-lg shadow flex flex-col gap-5 ">
                        <h2 className=" text-secondHead leading-secondHead font-heading text-zinc-900 " >Cash Movement summary</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className=" w-[200px] text-text font-semibold text-zinc-900 ">Payment Type</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">Payments collected</TableHead>
                                    <TableHead className=" text-text font-semibold text-zinc-900 text-end ">Refunds paid</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {["Cash", "Other", "Gift card redemptions", "Payments collected", "Of which tips"].map((item) => (
                                    <TableRow key={item}>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 ">{item}</TableCell>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 text-end ">MMK 0</TableCell>
                                        <TableCell className=" font-textGray text-text leading-text text-zinc-500 text-end ">MMK 0</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    )
}