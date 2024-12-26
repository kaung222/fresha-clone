'use client'
import { useState } from 'react'
import { Cake, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, Mail, Phone, Plus, Search, Trash, User } from 'lucide-react'
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
import { format, formatDistanceToNow } from 'date-fns'
import { Card } from '@/components/ui/card'
import PaginationBar from '@/components/common/PaginationBar'
import { useDebouncedCallback } from 'use-debounce'
import CircleLoading from '@/components/layout/circle-loading'
import ErrorPage from '@/components/common/error-state'
import BrandLink from '@/components/common/brand-link'
import ClientTable from './client-table'


export default function ClientList() {
    const { setQuery, getQuery } = useSetUrlParams();
    const preSearch = getQuery('qc') || ''
    const [searchQuery, setSearchQuery] = useState(preSearch)
    const [rowsPerPage, setRowsPerPage] = useState('2');
    const { data: allClients, isLoading } = GetAllClients();
    const { mutate: deleteClient } = DeleteClient();
    // const clientDrawer = getQuery('drawer')

    const clientDeleteHandler = (id: string) => {
        deleteClient({ id })
    }
    const showDrawer = (query: string) => {
        setQuery({ key: 'drawer', value: query })
    }

    const handleSearch = useDebouncedCallback((query: string) => {
        setQuery({ key: 'qc', value: searchQuery })
    }, 500)

    return (
        <>
            <div className="  mb-[50vh] ">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Client List</h1>
                        <p className="text-sm text-gray-500 hidden lg:block ">Manage your clients&apos; details by viewing, adding, editing, or deleting them.</p>
                    </div>
                    <BrandLink href='/clients/create'>Create</BrandLink>
                </div>

                <div className="flex justify-between gap-2 items-center mb-4">
                    <div className="flex space-x-2 gap-2 ">
                        <div className="relative min-w-[300px] max-w-[400px] ">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                className="pl-8 focus-visible:ring-offset-0 focus:border-[#1a73e8] focus-visible:ring-0"
                            />
                        </div>
                        {/* <Button variant="outline" className=' hidden lg:flex items-center '>
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button> */}
                    </div>
                    {/* <Select defaultValue="name">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Sort by Name</SelectItem>
                            <SelectItem value="date">Sort by Date</SelectItem>
                        </SelectContent>
                    </Select> */}
                </div>
                <ClientTable clients={allClients?.records} isLoading={isLoading} metadata={allClients?._metadata} />
                {/* <Card className=" p-3 ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Client Name</TableHead>
                                <TableHead>Birthday</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : allClients ? (
                                allClients.records.length > 0 ? (
                                    allClients.records?.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-2 ">
                                                    <div className=' border-2 border-brandColorLight rounded-full p-1 '>
                                                        <Avatar className=' size-16 '>
                                                            <AvatarImage src={client.profilePicture} alt={shortName(client.firstName)} className=' object-cover ' />
                                                            <AvatarFallback>{shortName(client.firstName)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div>
                                                        <div>{client.firstName} {client.lastName}</div>
                                                        <div className="text-sm text-gray-500">{client.email}</div>
                                                        <div className="text-sm text-gray-500">{client.phone}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Cake className="mr-2 h-4 w-4 text-gray-400" />
                                                    {client.dob ? format(new Date(client.dob), 'EEE dd MM yyyy') : '--'}
                                                </div>
                                            </TableCell>
                                            <TableCell>{client.gender}</TableCell>
                                            <TableCell>{formatDistanceToNow(client.createdAt)} ago</TableCell>
                                            <TableCell>
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/clients/${client.id}/edit`} className=' flex justify-center items-center h-10 w-10 hover:bg-gray-100 rounded-lg '>
                                                        <Edit className="h-4 w-4 inline-block " />
                                                    </Link>
                                                    <ConfirmDialog onConfirm={() => clientDeleteHandler(client.id.toString())} title='Archive Team Member?' description='Archive team member? You can view archived team members by adjusting filter and restore them anytime.'>
                                                        <Button variant="ghost" size="icon">
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </ConfirmDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div className="flex flex-col items-center justify-center h-[300px]">
                                                <User className="h-20 w-20 text-brandColor mb-2" />
                                                <p className=" text-xl font-bold">No clients </p>
                                                <p className=" text-muted-foreground"> <Link href={`/clients/create`} className=" font-medium text-brandColor ">Create Client</Link>  & see client list here.</p>
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
                </Card>
                <PaginationBar totalPages={allClients?._metadata.pageCount || 0} totalResult={allClients?._metadata.totalCount} /> */}

                {/* <div className="flex justify-between items-center mt-4 h-16">
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
                </div> */}
            </div>
            {/* {clientDrawer && (
                <ClientDrawer clientId={clientDrawer} />
            )} */}
        </>
    )
}