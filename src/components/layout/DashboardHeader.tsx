'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Bell, CircleHelp, Lightbulb, Menu, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ProfileDropdown from './ProfileDropdown'
import NotificationPage from '../dashboard/notification/NotificationPage'
import { Badge } from '../ui/badge'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import LogoWithBrand from '../common/LogoWithBrand'
import SingleLogo from '../common/SingleLogo'
import { GetUserProfile } from '@/api/profile/get-user-profile'
import { shortName } from '@/lib/utils'
import { GetNotifications } from '@/api/notification/get-notifications'
import { Notification } from '@/types/notification'
import ControllableDropdown from '../common/control-dropdown'
import Link from 'next/link'
import { LabelGuide } from '../dashboard/guide/label-guide'
import TooltipApp from '../common/tool-tip-sidebar'



type Props = {
    open: boolean;
    handleOpen: () => void;
}

const DashboardHeader = ({ open, handleOpen }: Props) => {
    const { data: organization } = GetOrganizationProfile();
    const { data: adminUser } = GetUserProfile('13');
    const { data: notifications, isLoading } = GetNotifications();
    const [notiOpen, setNotiOpen] = useState<boolean>(false);

    const unreadNoti = (notis: Notification[]) => {
        const unread = notis.filter(not => !not.isRead);
        return unread.length
    }

    return (
        <>
            <header className="flex h-[70px] items-center justify-between px-3 md:px-10 py-5 bg-white border-[#E5E5E5] border-b">
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
                <div className="flex items-center gap-3 md:gap-[20px] ">
                    <TooltipApp trigger={(
                        <Link href={'/search'} className=' px-2 py-2 rounded-lg cursor-pointer '>
                            <Search className=" w-6 h-6" />
                        </Link>
                    )}>
                        <p>Search</p>
                    </TooltipApp>
                    <TooltipApp trigger={(
                        <div>
                            <LabelGuide currentIndex={0}>
                                <Lightbulb className=' w-6 h-6 cursor-pointer ' />
                            </LabelGuide>
                        </div>
                    )}>
                        <p>Guide</p>
                    </TooltipApp>
                    <TooltipApp trigger={(
                        <div>
                            <Badge className=" bg-brandColor hover:bg-brandColor/90 ">{organization?.currency}</Badge>
                        </div>
                    )}>
                        <p>currency</p>
                    </TooltipApp>
                    <ControllableDropdown open={notiOpen} setOpen={setNotiOpen} trigger={(
                        <span className=' relative '>
                            <Bell className="h-6 w-6 " />
                            {notifications && unreadNoti(notifications.records) > 0 && (
                                <span className=' text-delete font-medium border-brandColor rounded-full border absolute -top-2 -right-2 text-xs size-4 bg-white '>{unreadNoti(notifications.records)}</span>
                            )}
                        </span>
                    )}>
                        <NotificationPage setOpen={setNotiOpen} notifications={notifications?.records || []} isLoading={isLoading} />
                    </ControllableDropdown>
                    <ProfileDropdown>
                        <div className=' border border-brandColorLight rounded-full '>
                            <Avatar className=' w-11 h-11 border border-brandColor'>
                                <AvatarImage src={adminUser?.profilePictureUrl} alt={shortName(adminUser?.firstName)} />
                                <AvatarFallback>{shortName(adminUser?.firstName)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </ProfileDropdown>
                </div>
            </header>
        </>
    )
}

export default DashboardHeader