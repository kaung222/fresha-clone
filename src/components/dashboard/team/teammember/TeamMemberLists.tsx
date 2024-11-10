'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, Mail, MoreHorizontal, Phone, Plus, Search, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CommonHeader from '@/components/common/common-header'
import { useRouter } from 'next/navigation'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import ConfirmDialog from '@/components/common/confirm-dialog'
import { GetTeamMember } from '@/api/member/get-teammember'
import CircleLoading from '@/components/layout/circle-loading'
import { Member } from '@/types/member'
import { useLocalstorage } from '@/lib/helpers'
import ErrorPage from '@/components/common/error-state'
import ProfileDrawer from './drawer/ProfileDrawer'
import { DeleteMember } from '@/api/member/delete-member'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

const teamMembers = [
    { id: '12353', name: 'Phwe Phwe', email: 'phwephwe6812@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '1253', name: 'Rose', email: 'nicolaus1997@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
]

export default function TeamMembersList() {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [memberInDrawer, setMemberInDrawer] = useState<Member | null>(null)
    const { setQuery } = useSetUrlParams();
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const drawer = getQuery('member-drawer');
    const { data: teamMember, isLoading } = GetTeamMember();
    const { mutate } = DeleteMember()
    console.log(teamMember)

    const openDrawer = (member: Member) => {
        setMemberInDrawer(member)
        // setQuery({ key: 'member-drawer', value: member.id })
    }

    const deleteMember = (id: string) => {
        mutate({ id })
    }

    return (
        <>

            {isLoading ? (
                <CircleLoading />
            ) : !teamMember ? (
                <ErrorPage />
            ) : (
                <div className="w-full flex flex-col h-full mx-auto bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <CommonHeader title='Team members' />
                        <div className="flex space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Export <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={() => router.push('/team/teammember/add')}>
                                Add <Plus className="mr-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                            <div className="relative w-full max-w-[270px] ">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 " />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </div>
                        <Select defaultValue="customer-order">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="customer-order">Customer Order</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Card className="p-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className=" text-text font-medium leading-text text-zinc-900 ">Member ID</TableHead>
                                    <TableHead className=" text-text font-medium leading-text text-zinc-900 ">Member name</TableHead>
                                    <TableHead className=" text-text font-medium leading-text text-zinc-900 ">Job title</TableHead>
                                    <TableHead className=" text-text font-medium leading-text text-zinc-900 ">Contact</TableHead>
                                    <TableHead className=" text-text font-medium leading-text text-zinc-900 ">Rating</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    teamMember?.map((member) => (
                                        <TableRow key={member.id}  >
                                            <TableCell className=' text-text font-medium leading-text text-gray-900 '>{member.memberId}</TableCell>
                                            <TableCell onClick={() => openDrawer(member)} className=' cursor-pointer '>
                                                <div className="flex items-center space-x-2">
                                                    <div className=' border-2 border-gray-300 rounded-full p-1 '>
                                                        <Avatar className=' size-16 '>
                                                            <AvatarImage src={member.profilePictureUrl} alt={member.firstName} className=' object-cover ' />
                                                            <AvatarFallback>{member.firstName[0]}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div>
                                                        <div className=' text-[17px] font-[600] leading-[24px] text-zinc-900 '>{member.firstName} {member.lastName}</div>
                                                        <div className="text-xs text-gray-500 font-text ">{member.jobTitle}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className=' text-text leading-text font-medium text-zinc-900 '>{member.jobTitle}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-text leading-text text-zinc-900 font-medium ">
                                                    <Phone className="mr-2 h-4 w-4 text-sky-600" />
                                                    {member.phone}
                                                </div>
                                                <div className="flex items-center text-text leading-text text-zinc-900 font-medium ">
                                                    <Mail className="mr-2 h-4 w-4 text-sky-600" />
                                                    {member.email}
                                                </div>


                                            </TableCell>
                                            <TableCell className=' text-text text-zinc-900 font-medium '>No reviews yet</TableCell>
                                            <TableCell>
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/team/teammember/${member.id}/edit`} className=' flex justify-center items-center h-10 w-10 hover:bg-gray-100 rounded-lg '>
                                                        <Edit className="h-4 w-4 inline-block " />
                                                    </Link>
                                                    {/* <Button variant="ghost" size="icon">
                                                    <Mail className="h-4 w-4" />
                                                </Button> */}

                                                    <ConfirmDialog onConfirm={() => deleteMember(String(member.id))} title='Archive Team Member?' description='Archive team member? You can view archived team members by adjusting filter and restore them anytime.'>
                                                        <Button disabled={member.role == 'organization'} variant="ghost" size="icon">
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </ConfirmDialog>

                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Card>


                    {/* <div className="flex justify-between items-center px-2 py-4 mt-auto">
                        <div className="text-sm text-gray-500">
                            {selectedMembers.length} of 100 row(s) selected
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Rows per page</span>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-[70px]">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-gray-500">Page 1 of 10</span>
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
            )}
            {memberInDrawer && (

                <ProfileDrawer teamMember={memberInDrawer} setTeamMember={setMemberInDrawer} />
            )}
        </>

    )
}