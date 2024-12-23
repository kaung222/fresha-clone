'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import DashboardSideBar from '@/components/layout/DashboardSideBar'
import AppGuard from '@/components/providers/app-guard'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}


const Layout = ({ children }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <AppGuard>
            <div className=" w-full overflow-hidden ">
                <div className=' z-50 w-full fixed top-0 left-0 bg-white '>
                    <DashboardHeader open={open} handleOpen={handleOpen} />
                </div>
                <div className={`z-40 h-h-screen-minus-70 fixed top-[70px] ps-10 left-0  bg-white duration-500 ${open
                    ? " translate-x-0 lg:translate-x-[-298px] "
                    : " translate-x-[-298px] lg:translate-x-0 "}  `}>
                    <DashboardSideBar setOpen={setOpen} />
                </div>
                <div className=' mt-[70px] w-full flex min-h-h-screen-minus-70 overflow-hidden '>

                    <div className={` duration-500 flex-shrink-0 ${open ? " w-0 md:w-[298px] lg:w-0 " : "w-0 lg:w-[298px] "}`}></div>

                    <div style={{ msOverflowStyle: '-moz-initial' }} className={`flex-grow-1 ${open ? "w-full md:w-w-full-minus-298 lg:w-full " : " w-full lg:w-w-full-minus-298 "} h-h-screen-minus-70 overflow-auto `}>
                        {children}
                    </div>
                </div>


            </div>
        </AppGuard>
    )
}


export default Layout