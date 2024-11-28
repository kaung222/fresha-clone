'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, Mail, MoreHorizontal, Phone, Plus, Search, Trash, User, X } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'

const teamMembers = [
    { id: '12353', name: 'Phwe Phwe', email: 'phwephwe6812@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '1253', name: 'Rose', email: 'nicolaus1997@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
]

export default function TeamMembersList() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { setQuery, getQuery } = useSetUrlParams();
    const router = useRouter();
    const drawerId = getQuery('member-drawer');
    const { data: teamMember, isLoading } = GetTeamMember();
    const { mutate } = DeleteMember();
    const sort = getQuery('sort') || 'createdAt';
    const sortOrder = getQuery('sortOrder') || 'asc';

    const openDrawer = (member: Member) => {
        setQuery({ key: 'member-drawer', value: member.id.toString() })
    }

    const deleteMember = (id: string) => {
        mutate({ id })
    };

    const searchedTeamMembers = (allMembers: Member[], search: string) => {
        const result = allMembers.filter((member) => {
            const nameMatch = (member?.firstName + member?.lastName).trim().toLowerCase().includes(search.toLowerCase());
            const emailMatch = member.email?.includes(search.toLowerCase());
            const phoneMatch = member.phone?.includes(search.toLowerCase());
            return nameMatch || emailMatch || phoneMatch
        })
        return result
    }

    const sortHandler = (sort: string) => {
        setQuery({ key: 'sort', value: sort })
    }

    const sortMembers = (
        members: Member[],
        sortBy: string,
        order: string  // Default to ascending order
    ): Member[] => {
        return members.sort((a, b) => {
            let compareValue = 0;

            switch (sortBy) {
                case 'name':
                    compareValue = a.firstName.localeCompare(b.firstName);
                    break;
                case 'nameVs':
                    compareValue = b.firstName.localeCompare(a.firstName);
                    break;

                case 'gender':
                    compareValue = a.gender.localeCompare(b.gender);
                    break;

                case 'createdAt':
                    compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case 'createdAtVs':
                    compareValue = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    break;

                case 'rating':
                    compareValue = a.rating - b.rating;
                    break;

                default:
                    throw new Error(`Unsupported sortBy: ${sortBy}`);
            }

            // Reverse the comparison for descending order
            return order === 'desc' ? -compareValue : compareValue;
        });
    };

    return (
        <>
            <div className="w-full flex flex-col h-full mx-auto bg-white">
                <div className="flex justify-between items-center mb-6">
                    <CommonHeader title='Team members' para='View and manage team members of your business.' />
                    <div className="flex space-x-2">
                        <Button onClick={() => router.push('/manage/teammember/add')}>
                            Add <Plus className="mr-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2 flex-grow">
                        <div className="relative w-full max-w-[400px] ">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400  focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0 " />
                            {searchQuery && (
                                <X onClick={() => setSearchQuery('')} className="absolute w-3 h-3 right-3 top-1/2 transform -translate-y-1/2 text-delete cursor-pointer " />
                            )}
                            <Input placeholder="Search by name, email, phone" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8 w-full" />
                        </div>
                    </div>
                    <Select value={sort} onValueChange={sortHandler}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt">New to Old</SelectItem>
                            <SelectItem value="createdAtVs">Old to New</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                            <SelectItem value="nameVs">Name Z-A</SelectItem>
                            <SelectItem value="gender">Gender</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="p-3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" font-[800] w-[30px] leading-text text-zinc-600 ">{teamMember && sortMembers(searchedTeamMembers(teamMember, searchQuery), sort, sortOrder).length}/{teamMember?.length}</TableHead>
                                <TableHead className=" font-[800]  leading-text text-zinc-600 ">Member ID</TableHead>
                                <TableHead className=" font-[800]  leading-text text-zinc-600 ">Member name</TableHead>
                                <TableHead className=" font-[800]  leading-text text-zinc-600 ">Job title</TableHead>
                                <TableHead className=" font-[800]  leading-text text-zinc-600 ">Role & Employee Type</TableHead>
                                <TableHead className=" font-[800]  leading-text text-zinc-600 ">Rating</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} >
                                        <CircleLoading />
                                    </TableCell>
                                </TableRow>
                            ) : !teamMember ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <ErrorPage />
                                    </TableCell>
                                </TableRow>
                            ) : sortMembers(searchedTeamMembers(teamMember, searchQuery), sort, sortOrder)?.map((member, index) => (
                                <TableRow key={member.id}  >
                                    <TableCell className=' text-text font-medium leading-text text-gray-900 w-[30px] '>{index + 1}</TableCell>
                                    <TableCell className=' text-text font-medium leading-text text-gray-900 '>{member.memberId ? (
                                        <Badge
                                            variant="outline"
                                            className="px-2 py-1 font-mono text-xs cursor-help transition-colors hover:bg-muted"
                                        >
                                            <User className="w-3 h-3 mr-1 inline-block" />
                                            {member.memberId}
                                        </Badge>

                                    ) : 'No Id'}</TableCell>
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
                                                <div className="text-sm text-zinc-500 font-text ">{member.email}</div>
                                                <div className="text-sm text-zinc-500 font-text ">{member.phone}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell >
                                        <div className=' text-[16px] leading-text font-medium text-zinc-900 '>{member.jobTitle}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-[16px] leading-text text-zinc-900 font-medium mb-2 ">
                                            {member.role == 'organization' ? '🏢' : '👥'}{member.role}
                                        </div>
                                        <div className="flex items-center text-text leading-text text-zinc-900 font-medium ">
                                            {member.type == 'employee' ? '💼' : '👨‍💼 '}{member.type}
                                        </div>
                                    </TableCell>
                                    <TableCell className=' text-[16px] text-zinc-900 font-medium '>{member.ratingCount == 0 ? 'No reviews yet' : member.rating}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end space-x-2">
                                            <Link href={`/manage/teammember/${member.id}/edit`} className=' flex justify-center items-center h-10 w-10 hover:bg-gray-100 rounded-lg '>
                                                <Edit className="h-4 w-4 text-blue-600 inline-block " />
                                            </Link>
                                            {/* <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                        </Button> */}

                                            <ConfirmDialog onConfirm={() => deleteMember(String(member.id))} title='Archive Team Member?' description='Archive team member? You can view archived team members by adjusting filter and restore them anytime.'>
                                                <Button disabled={member.role == 'organization'} variant="ghost" size="icon">
                                                    <Trash className="h-4 w-4 text-delete " />
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
            </div>

            {drawerId && (
                <ProfileDrawer memberId={drawerId} />
            )}
        </>

    )
}