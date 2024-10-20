'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Plus, Search } from 'lucide-react'
import AppDialog from '@/components/common/dialog'
import SaleListFilter from './filter/sale-list-filter'

const salesData = [
    {
        fees: '#197ee4a3',
        client: 'Nan Nan San',
        service: 'Haircut',
        product: 'Mg Mg',
        giftCard: '19 Feb 2024 18:59',
        saleDate: '20 Feb 2024, 13:00',
        cancellationFee: '1hr 30min',
        price: 'MMK 35',
        status: 'Valid',
    },
]

export default function SalesList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [dateFilter, setDateFilter] = useState('Today')
    const [rowsPerPage, setRowsPerPage] = useState('8')

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Sales</h1>
                    <p className="text-sm text-gray-500">View, filter and export the history of your sales.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4 space-x-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search by Sale or Client"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                    />
                </div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={dateFilter} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Today">Today</SelectItem>
                        <SelectItem value="Yesterday">Yesterday</SelectItem>
                        <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    </SelectContent>
                </Select>
                <AppDialog title='Filters' trigger={(
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                )}>
                    <SaleListFilter />

                </AppDialog>
                <Select defaultValue="newest">
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Scheduled Date (newest first)" />
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
                        <TableHead>Fees</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Gift card</TableHead>
                        <TableHead>Sale Date</TableHead>
                        <TableHead>cancellation fee</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salesData.map((sale, index) => (
                        <TableRow key={index}>
                            <TableCell>{sale.fees}</TableCell>
                            <TableCell>{sale.client}</TableCell>
                            <TableCell>{sale.service}</TableCell>
                            <TableCell>{sale.product}</TableCell>
                            <TableCell>{sale.giftCard}</TableCell>
                            <TableCell>{sale.saleDate}</TableCell>
                            <TableCell>{sale.cancellationFee}</TableCell>
                            <TableCell>{sale.price}</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {sale.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                    0 of 8 row(s) selected
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Rows per page</span>
                    <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder={rowsPerPage} />
                        </SelectTrigger>
                        <SelectContent>
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
    )
}