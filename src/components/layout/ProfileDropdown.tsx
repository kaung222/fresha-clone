'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { ChevronDown, LocateIcon, LogOut, Mail, Settings, Star, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useLocalstorage } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode;
}

const ProfileDropdown = ({ children }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const { deleteData } = useLocalstorage();
    const logoutHandler = () => {
        deleteData('accessToken');
        router.push('/login');
    }

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent side='bottom' align="end" className="w-56">
                    <div className=' w-[300px] flex flex-col gap-1 '>
                        <Link href={'/user-account/profile'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <User className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Profile</span>
                        </Link>
                        <Link href={'/user-account/reviews'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <Star className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Review</span>
                        </Link>
                        <Link href={'/user-account/settings'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <Settings className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Setting</span>
                        </Link>
                        <Link href={'/user-account/workplaces'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <LocateIcon className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Location</span>
                        </Link>
                        <hr />
                        <Button variant={'ghost'} onClick={() => logoutHandler()} className=' w-full flex justify-start gap-2 '>
                            <LogOut className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm text-delete '>LogOut</span>
                        </Button>

                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default ProfileDropdown