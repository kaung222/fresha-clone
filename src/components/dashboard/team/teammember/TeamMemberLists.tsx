'use client'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Filter, Mail, MoreHorizontal, Phone, Plus, Search } from 'lucide-react'
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

const teamMembers = [
    { id: '12353', name: 'Phwe Phwe', email: 'phwephwe6812@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '1253', name: 'Rose', email: 'nicolaus1997@gmail.com', jobTitle: 'Beauty care', phone: '09881262757', avatar: '/placeholder.svg?height=32&width=32' },
]

export default function TeamMembersList() {
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const { setQuery } = useSetUrlParams();
    const router = useRouter();

    const openDrawer = (query: string) => {
        setQuery({ key: 'member-drawer', value: query })
    }

    const toggleMember = (memberId: string) => {
        setSelectedMembers(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        )
    }

    const toggleAll = () => {
        setSelectedMembers(prev =>
            prev.length === teamMembers.length ? [] : teamMembers.map(m => m.id)
        )
    }

    return (
        <div className="w-full flex flex-col h-full max-w-7xl mx-auto bg-white">
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
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={selectedMembers.length === teamMembers.length}
                                onCheckedChange={toggleAll}
                            />
                        </TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900">Member ID</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900">Member name</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900">Job title</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900">Phone number</TableHead>
                        <TableHead className=" text-text font-bold text-zinc-900">Rating</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teamMembers.map((member) => (
                        <TableRow key={member.id}  >
                            <TableCell>
                                <Checkbox
                                    checked={selectedMembers.includes(member.id)}
                                    onCheckedChange={() => toggleMember(member.id)}
                                />
                            </TableCell>
                            <TableCell>{member.id}</TableCell>
                            <TableCell onClick={() => openDrawer(member.name)}>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div>{member.name}</div>
                                        <div className="text-sm text-gray-500">{member.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{member.jobTitle}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                                    {member.phone}
                                </div>
                            </TableCell>
                            <TableCell>No reviews yet</TableCell>
                            <TableCell>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                    <ConfirmDialog onConfirm={() => console.log('first')} title='Archive Team Member?' description='Archive team member? You can view archived team members by adjusting filter and restore them anytime.'>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </ConfirmDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-auto">
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
            </div>
        </div>
    )
}