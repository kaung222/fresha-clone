'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Search } from 'lucide-react'

const giftCardsData = [
    {
        giftCard: 'BGEUIRGG',
        issueDate: '20 Feb 2024',
        expireDate: '20 Feb 2024',
        status: 'Valid',
        saleNumber: 2,
        purchaser: 'Su Su',
        owner: 'Aung Aung',
        total: 32000,
        redeemed: 0,
        remaining: 32000,
    },
]

export default function GiftCardsSoldList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('8')

    return (
        <div className="">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Gift cards sold</h1>
                    <p className="text-sm text-gray-500">View, filter and export gift cards purchased by your clients.</p>
                </div>
                <Select defaultValue="export">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Export" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="export">Export</SelectItem>
                        <SelectItem value="pdf">Export as PDF</SelectItem>
                        <SelectItem value="csv">Export as CSV</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-between items-center mb-4 space-x-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search by code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                    />
                </div>
                <Select defaultValue="month">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Month to Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="month">Month to Date</SelectItem>
                        <SelectItem value="year">Year to Date</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
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
                        <TableHead>Gift card</TableHead>
                        <TableHead>Issue date</TableHead>
                        <TableHead>Expire date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sale#</TableHead>
                        <TableHead>Purchaser</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Redeemed</TableHead>
                        <TableHead>Remaining</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {giftCardsData.map((card, index) => (
                        <TableRow key={index}>
                            <TableCell>{card.giftCard}</TableCell>
                            <TableCell>{card.issueDate}</TableCell>
                            <TableCell>{card.expireDate}</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {card.status}
                                </span>
                            </TableCell>
                            <TableCell>{card.saleNumber}</TableCell>
                            <TableCell>{card.purchaser}</TableCell>
                            <TableCell>{card.owner}</TableCell>
                            <TableCell>MMK {card.total.toLocaleString()}</TableCell>
                            <TableCell>MMK {card.redeemed.toLocaleString()}</TableCell>
                            <TableCell>MMK {card.remaining.toLocaleString()}</TableCell>
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