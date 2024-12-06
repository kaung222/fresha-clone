'use client'
import { ArrowLeft, Bell, Calendar, Globe, Search, Settings, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileSideBar from '@/components/dashboard/user-account/ProfileSideBar';
import ProfileDropdown from '@/components/layout/ProfileDropdown';
import Link from 'next/link';
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile';
import { Badge } from '@/components/ui/badge';
import AppDropdown from '@/components/common/DropDown';
import NotificationPage from '@/components/dashboard/notification/NotificationPage';

type Props = {
    children: React.ReactNode
}

export default function UserProfile({ children }: Props) {
    const { data: organization } = GetOrganizationProfile()
    return (
        <div className="flex flex-col h-screen bg-gray-100 fixed w-screen top-0 left-0 z-[60] ">

            <header className="flex h-[80px] items-center justify-between px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <Link href={'/dashboard'} className="text-2xl leading-[20px] font-bold text-logo ">fresha</Link>
                <div className="flex items-center gap-[10px] ">
                    <Badge>{organization?.currency}</Badge>

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

            <div className="flex flex-col md:flex-row flex-1 flex-grow h-h-screen-minus-80 ">
                <ProfileSideBar />
                {children}
            </div>
        </div>
    )
}