import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Paperclip, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CommonHeader from "@/components/common/common-header"
import AppDropdown from "@/components/common/DropDown"

export default function AppointmentsPage() {
    return (
        <main className="flex-1 overflow-y-auto bg-white">
            <div className=" ">
                <div className="flex justify-between items-start mb-[30px] ">

                    <CommonHeader title="Appointments" para="View, filter and export appointments booked by your clients." />
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
                </div>
                <div className="flex flex-wrap gap-3 mb-[40px] p-1 ">
                    <div className="flex-1 min-w-[300px] h-[44px] ">
                        <div className=" absolute w-[44px] h-[44px] flex justify-center items-center ">
                            <Search className=" w-4 h-4 " />
                        </div>
                        <Input placeholder="Search Option" className="w-full ps-12 focus:outline-none focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  " />
                    </div>
                    <Select defaultValue="month" >
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
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Ref #</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Client</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Service</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Created by</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Created Date</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Scheduled Date</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Duration</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Team member</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Price</TableHead>
                            <TableHead className=" text-text font-bold text-zinc-900 ">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-blue-600">#D2B2DB43</TableCell>
                            <TableCell>Doe</TableCell>
                            <TableCell>Hair Color</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>8 Oct 2024, 13:46</TableCell>
                            <TableCell>8 Oct 2024, 13:00</TableCell>
                            <TableCell>1h 15min</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>MMK 57</TableCell>
                            <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Started</span></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-blue-600">#54AC9691</TableCell>
                            <TableCell>Doe</TableCell>
                            <TableCell>Haircut</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>8 Oct 2024, 13:46</TableCell>
                            <TableCell>8 Oct 2024, 11:00</TableCell>
                            <TableCell>45min</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>MMK 40</TableCell>
                            <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Booked</span></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-blue-600">#00F3D9FA</TableCell>
                            <TableCell>Doe</TableCell>
                            <TableCell>Blow Dry</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>8 Oct 2024, 13:47</TableCell>
                            <TableCell>8 Oct 2024, 10:00</TableCell>
                            <TableCell>2h 45min</TableCell>
                            <TableCell>Wendy Smith (Demo)</TableCell>
                            <TableCell>MMK 35</TableCell>
                            <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Booked</span></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-blue-600">#97D586CA</TableCell>
                            <TableCell>:-In</TableCell>
                            <TableCell>Haircut</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>8 Oct 2024, 17:31</TableCell>
                            <TableCell>8 Oct 2024, 07:00</TableCell>
                            <TableCell>45min</TableCell>
                            <TableCell>Pyae PhyoNyo</TableCell>
                            <TableCell>MMK 40</TableCell>
                            <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Booked</span></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                        0 of 8 row(s) selected
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Rows per page</span>
                        <Select defaultValue="8" >
                            <SelectTrigger className="w-[70px] " >
                                <SelectValue placeholder="8" />
                            </SelectTrigger>
                            <SelectContent className=" ">
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="16">16</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-500">Page 1 of 2</span>
                        <div className="flex space-x-1">
                            <Button variant="outline" size="icon">
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}