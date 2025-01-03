'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LogOut, Star, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useLocalstorage } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/api/auth/logout'
import ConfirmDialog from '../common/confirm-dialog'

type Props = {
    children: React.ReactNode;
}

const ProfileDropdown = ({ children }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { mutate } = useLogout()
    const router = useRouter();
    const { deleteData } = useLocalstorage();
    const logoutHandler = () => {
        mutate()
        localStorage.clear()
        router.push('/login')
    }
    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent side='bottom' align="end" className="w-56 relative z-[70]  ">
                    <div className=' w-[300px] flex flex-col gap-1 '>
                        <Link href={'/user-account/profile'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <User className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Profile</span>
                        </Link>
                        <Link href={'/user-account/reviews'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                            <Star className=' h-5 w-5 ' />
                            <span className=' font-semibold text-sm '>Review</span>
                        </Link>
                        <hr />
                        <ConfirmDialog title='Are you sure to logout?' description='You will need email and password to login again.' onConfirm={() => logoutHandler()} button='Log Out'>
                            <Button variant={'ghost'} className=' w-full flex justify-start gap-2 '>
                                <LogOut className=' h-5 w-5 ' />
                                <span className=' font-semibold text-sm text-delete '>LogOut</span>
                            </Button>
                        </ConfirmDialog>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default ProfileDropdown