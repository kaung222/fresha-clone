import React from 'react'
import { Button } from '../ui/button'
import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ProfileDropdown from './ProfileDropdown'
import AppDropdown from '../common/DropDown'
import NotificationPage from '../dashboard/notification/NotificationPage'

type Props = {
    open: boolean;
    handleOpen: () => void;
}

const DashboardHeader = ({ open, handleOpen }: Props) => {
    return (
        <>
            <header className="flex h-[80px] items-center justify-between px-10 py-5 bg-white border-[#E5E5E5] border-b">
                <h1 className="text-2xl leading-[20px] font-bold text-logo " onClick={handleOpen}>fresha</h1>
                <div className="flex items-center gap-[10px] ">
                    {/* <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button> */}
                    <AppDropdown trigger={(

                        <span className=' px-4 py-2 rounded-lg hover:bg-gray-100 '>
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