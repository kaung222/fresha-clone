import { ArrowLeft, Bell, Calendar, Globe, Search, Settings, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileSideBar from '@/components/dashboard/profile/ProfileSideBar';

type Props = {
    children: React.ReactNode
}

export default function UserProfile({ children }: Props) {
    return (
        <div className="flex flex-col h-screen bg-gray-100 fixed w-screen top-0 left-0 z-[60] ">
            <header className="bg-white border-b px-4 py-2 h-[70px] flex items-center justify-between ">
                <h1 className="text-xl font-bold">fresha</h1>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">PP</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="flex flex-1 flex-grow h-full ">
                <ProfileSideBar />

                {children}
            </div>
        </div>
    )
}