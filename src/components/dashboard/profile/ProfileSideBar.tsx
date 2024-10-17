
'use client'
import { Button } from '@/components/ui/button'

import { ArrowLeft, Globe, Search, Settings, Star, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

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
        path: '/user-account/reviews',
        name: 'Reviews',
        icon: <Star className=' mr-2 h-4 w-4' />
    }, {
        id: '3',
        path: '/user-account/settings',
        name: 'Settings',
        icon: <Settings className=' mr-2 h-4 w-4' />
    }, {
        id: '4',
        path: '/user-account/workplaces',
        name: 'Workplaces',
        icon: <Globe className=' mr-2 h-4 w-4 ' />
    }

]

const ProfileSideBar = (props: Props) => {
    const pathName = usePathname();
    const isPath = (path: string) => {
        return pathName.endsWith(path)
    }
    return (
        <>
            <aside className="w-64 bg-white border-r p-4 h-full overflow-auto ">
                <Button variant="link" className="mb-4 text-purple-600">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
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
        </>
    )
}

export default ProfileSideBar