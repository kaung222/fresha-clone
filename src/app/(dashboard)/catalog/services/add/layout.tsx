'use client'
import AddServiceSideBar from '@/components/dashboard/catalog/services/add/AddServiceSideBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');


    return (

        <div className=" fixed w-screen h-screen bg-white z-[60] top-0 left-0 px-10 ">
            <header className="flex justify-between items-center p-4 border-b h-[70px] ">
                <h1 className="text-xl font-semibold">New service</h1>
                <div className="flex space-x-2">
                    <Button variant="outline">Close</Button>
                    <Button>Save</Button>
                </div>
            </header>

            <div className="flex h-h-screen-minus-70 w-full relative ">
                <AddServiceSideBar />

                {children}
            </div>
        </div>
    )
}

export default Layout