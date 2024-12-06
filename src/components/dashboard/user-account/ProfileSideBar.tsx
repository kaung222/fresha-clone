
'use client'
import { Button } from '@/components/ui/button'

import { ArrowLeft, Briefcase, ChevronLeft, Clock, Globe, Menu, Search, Settings, Star, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Props = {}

type ProfileSidebarDataType = {
    id: string;
    path: string;
    name: string;
    icon: React.ReactNode;
}

const profileSidebarData: ProfileSidebarDataType[] = [
    {
        id: '1',
        path: '/user-account/profile',
        name: 'My profile',
        icon: <User className=' mr-2 h-4 w-4' />
    },
    {
        id: '2',
        path: '/user-account/organization',
        name: 'My Organization',
        icon: <Globe className=' mr-2 h-4 w-4' />
    },
    {
        id: '3',
        path: '/user-account/reviews',
        name: 'Reviews',
        icon: <Star className=' mr-2 h-4 w-4' />
    },
    // {
    //     id: '4',
    //     path: '/user-account/settings',
    //     name: 'Settings',
    //     icon: <Settings className=' mr-2 h-4 w-4' />
    // },
    // {
    //     id: '5',
    //     path: '/user-account/workplaces',
    //     name: 'Workplaces',
    //     icon: <Globe className=' mr-2 h-4 w-4 ' />
    // },
    {
        id: '6',
        path: '/user-account/business-hours',
        name: 'Opening Hour',
        icon: <Clock className=' mr-2 h-4 w-4 ' />
    }

]

const ProfileSideBar = (props: Props) => {
    const pathName = usePathname();
    const isPath = (path: string) => {
        return pathName.endsWith(path)
    }
    return (
        <>
            <aside className="w-64 hidden md:block bg-white border-r p-4 h-full overflow-auto ">
                <Link href={'/'}>
                    <Button variant="link" className="mb-4 text-purple-600">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </Link>
                <h2 className="font-semibold mb-2">Your account</h2>
                <nav className="space-y-1">
                    {profileSidebarData.map((side) => (
                        <Link key={side.id} href={side.path}>
                            <Button variant="ghost" className={`w-full pointer-events-none justify-start ${isPath(side.path) ? 'bg-gray-100' : ''} `}>
                                {side.icon}
                                {side.name}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className=' block md:hidden px-3 '>
                <Sheet >
                    <SheetTrigger asChild className=' '>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-6 py-1 z-[62] h-h-screen-minus-80 top-[80px] ">
                        <SheetTitle>
                            <Link href={'/'}>
                                <Button variant="ghost" className="w-fit gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </Link>
                        </SheetTitle>
                        <div className="flex flex-col gap-6 py-2">
                            <div>
                                <h2 className="text-sm font-semibold mb-4">Your account</h2>
                                <nav className="space-y-1">
                                    {profileSidebarData.map((side) => (
                                        <Link key={side.id} href={side.path}>
                                            <Button variant="ghost" className={`w-full pointer-events-none justify-start ${isPath(side.path) ? 'bg-gray-100' : ''} `}>
                                                {side.icon}
                                                {side.name}
                                            </Button>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default ProfileSideBar