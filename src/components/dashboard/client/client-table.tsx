'use client'
import { Client } from '@/types/client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from '@/components/ui/card'
import CircleLoading from '@/components/layout/circle-loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { Cake, Edit, Trash, User } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { Button } from '@/components/ui/button'
import { DeleteClient } from '@/api/client/delete-client'
import ErrorPage from '@/components/common/error-state'
import PaginationBar from '@/components/common/PaginationBar'
import { PagonationMetadata } from '@/types/_metadata'

type Props = {
    clients: Client[] | undefined;
    isLoading: boolean;
    metadata: PagonationMetadata | undefined;
    isSearch?: boolean
}

const ClientTable = ({ clients, isLoading, metadata, isSearch = false }: Props) => {
    const { mutate: deleteClient } = DeleteClient();


    const clientDeleteHandler = (id: string) => {
        deleteClient({ id })
    }

    return (
        <>
            <Card className=" p-3 ">
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
                        ) : clients ? (
                            clients.length > 0 ? (
                                clients?.map((client) => (
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
                                                <ConfirmDialog onConfirm={() => clientDeleteHandler(client.id.toString())} title='Are you sure to Delete?' description='Data of this client in all related place will also be deleted!'>
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
                                            <p className=" text-xl font-bold"> {isSearch ? "No search result for client" : "No Client"} </p>
                                            {!isSearch && (
                                                <p className=" text-muted-foreground"> <Link href={`/clients/create`} className=" font-medium text-brandColor ">Create Client</Link>  & see client list here.</p>
                                            )}
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
            <PaginationBar totalPages={metadata?.pageCount || 0} totalResult={metadata?.totalCount} />

        </>
    )
}

export default ClientTable