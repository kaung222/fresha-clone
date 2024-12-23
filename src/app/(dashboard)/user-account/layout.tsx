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
import { GetUserProfile } from '@/api/profile/get-user-profile';
import { shortName } from '@/lib/utils';
import LogoWithBrand from '@/components/common/LogoWithBrand';
import SingleLogo from '@/components/common/SingleLogo';
import { GetNotifications } from '@/api/notification/get-notifications';
import ControllableDropdown from '@/components/common/control-dropdown';
import { useState } from 'react';

type Props = {
    children: React.ReactNode
}

export default function UserProfile({ children }: Props) {
    const { data: organization } = GetOrganizationProfile();
    const { data: adminUser } = GetUserProfile('13');
    const { data: notifications, isLoading } = GetNotifications();
    const [notiOpen, setNotiOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-white to-brandColorLight/50 fixed w-screen top-0 left-0 z-[60] ">

            <header className="flex h-[70px] items-center justify-between px-3 md:px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <Link href={'/'} className=" ">
                    <div className=" block ">
                        <LogoWithBrand />
                    </div>
                    <div className="hidden ">
                        <SingleLogo />
                    </div>
                </Link>
                <div className="flex items-center gap-[10px] ">
                    <Badge className=" bg-brandColor ">{organization?.currency}</Badge>

                    <ControllableDropdown open={notiOpen} setOpen={setNotiOpen} trigger={(

                        <span className=' px-4 py-2 rounded-lg block hover:bg-gray-100 '>
                            <Bell className="h-5 w-5" />
                        </span>
                    )}>
                        <NotificationPage setOpen={setNotiOpen} notifications={notifications?.records || []} isLoading={isLoading} />
                    </ControllableDropdown>
                    <ProfileDropdown>
                        <Avatar className=' w-11 h-11 '>
                            <AvatarImage src={adminUser?.profilePictureUrl} alt={shortName(adminUser?.firstName)} />
                            <AvatarFallback>{shortName(adminUser?.firstName)}</AvatarFallback>
                        </Avatar>
                    </ProfileDropdown>
                </div>
            </header>

            <div className="flex flex-col md:flex-row flex-1 flex-grow h-h-screen-minus-70 ">
                <ProfileSideBar />
                {children}
            </div>
        </div>
    )
}