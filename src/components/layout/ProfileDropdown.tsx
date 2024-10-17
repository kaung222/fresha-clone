'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { ChevronDown, Mail } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

type Props = {
    children: React.ReactNode;
}

const ProfileDropdown = ({ children }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }} >
                        <Link href={`/user-account/profile`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Reviews</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Workspaces</DropdownMenuItem>
                    <DropdownMenuItem>Help center</DropdownMenuItem>
                    <DropdownMenuItem>English GB</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default ProfileDropdown