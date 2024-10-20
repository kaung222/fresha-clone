'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, MoreHorizontal, Paperclip, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import AppDialog from '@/components/common/dialog'
import Filters from './filter'
import AppDropdown from '@/components/common/DropDown'

const transactions = [
    { ref: '#197ee4a3', date: '20 Feb 2024, 13:00', client: 'Nan Nan San', service: 'Haircut', type: 'Sale', method: 'Cash', teamMember: 'Mg Kaung', price: 'MMK 35' },
    { ref: '#197ee4a3', date: '20 Feb 2024, 13:00', client: 'Nan Nan San', service: 'Haircut', type: 'Sale', method: 'Other', teamMember: 'Mg Kaung', price: 'MMK 35' },
    { ref: '#197ee4a3', date: '20 Feb 2024, 13:00', client: 'Nan Nan San', service: 'Haircut', type: 'Sale', method: 'Cash', teamMember: 'Mg Kaung', price: 'MMK 35' },
    { ref: '#197ee4a3', date: '20 Feb 2024, 13:00', client: 'Nan Nan San', service: 'Haircut', type: 'Sale', method: 'Cash', teamMember: 'Mg Kaung', price: 'MMK 35' },
]

export default function PaymentTransactions() {
    const [dateRange, setDateRange] = useState('13 June, 2024 - 14 July, 2024');
    const { setQuery } = useSetUrlParams();
    const openDrawer = (drawer: string) => {
        setQuery({ key: 'drawer', value: drawer })
    }

    return (
        <div className="w-full max-w-7xl mx-auto bg-white p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Payment transactions</h1>
                    <p className="text-sm text-gray-500">View, filter and export the history of your payments.</p>
                </div>
                <AppDropdown trigger={(
                    <Button>
                        Export <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                )}>
                    <div className=' flex flex-col gap-1 '>
                        <Button variant={'outline'}>
                            <Paperclip className=' w-4 h-4' /> PDF
                        </Button>
                        <Button variant={'outline'}>
                            <Paperclip className=' w-4 h-4' /> CVS
                        </Button>
                    </div>
                </AppDropdown>
            </div>

            <div className="flex space-x-2 mb-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search by Sale or Client" className="pl-8" />
                </div>
                <Input
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-64  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 "
                />
                <AppDialog title='Filters' trigger={(
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                )}>
                    <Filters />

                </AppDialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ref#</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Team Member</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={8} className="font-bold">Total</TableCell>
                        <TableCell className="font-bold text-right">MMK 4000</TableCell>
                    </TableRow>
                    {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.ref}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.client}</TableCell>
                            <TableCell>{transaction.service}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.method}</TableCell>
                            <TableCell>{transaction.teamMember}</TableCell>
                            <TableCell>{transaction.price}</TableCell>
                            <TableCell>
                                <div className="flex justify-end space-x-2">
                                    <Button onClick={() => openDrawer('payment-edit')} variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button onClick={() => openDrawer('payment-detail')} variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
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
                    <Select defaultValue="8">
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="8" />
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