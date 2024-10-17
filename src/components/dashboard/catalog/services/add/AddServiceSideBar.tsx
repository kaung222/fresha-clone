'use client'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import React from 'react'

type Props = {}

const AddServiceSideBar = (props: Props) => {
    const { setQuery } = useSetUrlParams();
    return (
        <>
            <aside className="w-64 border-r overflow-auto h-full">
                <nav className="space-y-2">
                    <Button onClick={() => setQuery({ key: 'section', value: 'basic-detail' })} variant="ghost" className="w-full justify-start bg-gray-100">
                        Basic details
                    </Button>
                    <Button onClick={() => setQuery({ key: 'section', value: 'team-members' })} variant="ghost" className="w-full  flex justify-between items-center">
                        Team members
                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">3</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Resources
                    </Button>
                    <h2 className="font-semibold mt-4 mb-2">Settings</h2>
                    <Button variant="ghost" className="w-full justify-start">
                        Online booking
                    </Button>
                    <Button variant="ghost" className="w-full flex justify-between items-center">
                        Forms
                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">1</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Commissions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Settings
                    </Button>
                </nav>
            </aside>
        </>
    )
}

export default AddServiceSideBar