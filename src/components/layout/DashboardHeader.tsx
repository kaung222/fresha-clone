'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Bell, Menu, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ProfileDropdown from './ProfileDropdown'
import AppDropdown from '../common/DropDown'
import NotificationPage from '../dashboard/notification/NotificationPage'
import { useLocalstorage } from '@/lib/helpers'
import { Organization } from '@/types/organization'
import { Badge } from '../ui/badge'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import LogoWithBrand from '../common/LogoWithBrand'
import SingleLogo from '../common/SingleLogo'


type Props = {
    open: boolean;
    handleOpen: () => void;
}

const DashboardHeader = ({ open, handleOpen }: Props) => {
    const { data: organization } = GetOrganizationProfile()
    return (
        <>
            <header className="flex h-[80px] items-center justify-between px-3 md:px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <div className=" flex items-center gap-2 ">
                    <Button onClick={handleOpen} variant="ghost">
                        <Menu className=" w-6 h-6 " />
                    </Button>
                    <div className=" hidden sm:block ">
                        <LogoWithBrand />
                    </div>
                    <div className=" block sm:hidden ">
                        <SingleLogo />
                    </div>
                    {/* <h1 className="text-2xl leading-[20px] font-bold text-logo hidden sm:block  " >Baranie</h1> */}

                </div>
                <div className="flex items-center gap-[10px] ">

                    <Badge className=" bg-brandColor ">{organization?.currency}</Badge>

                    <AppDropdown trigger={(
                        <span className=' px-4 py-2 rounded-lg block hover:bg-gray-100 '>
                            <Bell className="h-5 w-5" />
                        </span>
                    )}>
                        <NotificationPage />
                    </AppDropdown>
                    <ProfileDropdown>
                        <Avatar className=' w-11 h-11 '>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PP" />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                    </ProfileDropdown>
                </div>
            </header>
        </>
    )
}

export default DashboardHeader