'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, Mail, Phone, Plus, Search, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { GetAllClients } from '@/api/client/get-all-clients'
import Link from 'next/link'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { shortName } from '@/lib/utils'
import { DeleteClient } from '@/api/client/delete-client'
import ClientDrawer from './drawer/ClientDrawer'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'


export default function ClientList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('2');
    const { setQuery, getQuery } = useSetUrlParams();
    const { data: allClients } = GetAllClients();
    const { mutate: deleteClient } = DeleteClient();
    const clientDrawer = getQuery('drawer')

    const clientDeleteHandler = (id: string) => {
        deleteClient({ id })
    }
    const showDrawer = (query: string) => {
        setQuery({ key: 'drawer', value: query })
    }

    return (
        <>
            <div className="  pt-5 ">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Client List</h1>
                        <p className="text-sm text-gray-500 hidden lg:block ">Manage your clients&apos; details by viewing, adding, editing, or deleting them.</p>
                    </div>
                    <Link href={'/client/add'} className=' px-4 flex py-2 border border-gray-300 rounded-lg text-white bg-black items-center ' >
                        <Plus className="mr-2 h-4 w-4" /> Add
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0"
                            />
                        </div>
                        <Button variant="outline" className=' hidden lg:flex items-center '>
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
                <Card className=" p-3 ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Client Name</TableHead>
                                <TableHead>Phone number</TableHead>
                                <TableHead>Reviews</TableHead>
                                <TableHead>Sale</TableHead>
                                <TableHead>Created at</TableHead>
                                {/* <TableHead className="w-[100px]"></TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allClients?.records?.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell onClick={() => showDrawer(String(client.id))} className="font-medium">
                                        <div className="flex items-center space-x-2 ">
                                            <div className=' border-2 border-gray-300 rounded-full p-1 '>
                                                <Avatar className=' size-16 '>
                                                    <AvatarImage src={client.profilePicture} alt={shortName(client.firstName)} className=' object-cover ' />
                                                    <AvatarFallback>{shortName(client.firstName)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div>{client.firstName} {client.lastName}</div>
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
                                    <TableCell>{client.gender}</TableCell>
                                    <TableCell>{client.gender}</TableCell>
                                    <TableCell>{format(new Date(client.createdAt), 'dd MMM yyyy')}</TableCell>
                                    {/* <TableCell>
                                <div className="flex justify-end space-x-2">
                                    <Link href={`/client/${client.id}/edit`} className=' flex justify-center items-center h-10 w-10 hover:bg-gray-100 rounded-lg '>
                                        <Edit className="h-4 w-4 inline-block " />
                                    </Link>
                                    <ConfirmDialog onConfirm={() => clientDeleteHandler(client.id.toString())} title='Archive Team Member?' description='Archive team member? You can view archived team members by adjusting filter and restore them anytime.'>
                                        <Button variant="ghost" size="icon">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </ConfirmDialog>
                                </div>
                            </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

                <div className="flex justify-between items-center mt-4 h-16">
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
            {clientDrawer && (
                <ClientDrawer clientId={clientDrawer} />
            )}
        </>
    )
}