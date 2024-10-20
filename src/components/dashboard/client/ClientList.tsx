'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Phone, Plus, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'

const clients = [
    { id: 1, name: 'Hla Thaung', email: 'hlathaung@gmail.com', phone: '0998765432', reviews: '-', sale: '-', createdAt: '14 Oct 2024' },
    { id: 2, name: 'Aye Aye', email: 'ayeaye@gmail.com', phone: '0912345678', reviews: '-', sale: '-', createdAt: '14 Oct 2024' },
]

export default function ClientList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('2');
    const { setQuery } = useSetUrlParams()
    const showDrawer = (query: string) => {
        setQuery({ key: 'drawer', value: query })
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Client List</h1>
                    <p className="text-sm text-gray-500">Manage your clients&apos; details by viewing, adding, editing, or deleting them.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
                <Select defaultValue="name">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Sort by Name</SelectItem>
                        <SelectItem value="date">Sort by Date</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Client Name</TableHead>
                        <TableHead>Phone number</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead>Sale</TableHead>
                        <TableHead>Created at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell onClick={() => showDrawer(client.name)} className="font-medium">
                                <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src={`https://api.dicebear.com/6.x/micah/svg?seed=${client.name}`} />
                                        <AvatarFallback>{client.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{client.name}</div>
                                        <div className="text-sm text-gray-500">{client.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                                    {client.phone}
                                </div>
                            </TableCell>
                            <TableCell>{client.reviews}</TableCell>
                            <TableCell>{client.sale}</TableCell>
                            <TableCell>{client.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                    0 of 2 row(s) selected
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Rows per page</span>
                    <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder={rowsPerPage} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-500">Page 1 of 1</span>
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