'use client'
import DashboardHeader from '@/components/layout/DashboardHeader'
import DashboardSideBar from '@/components/layout/DashboardSideBar'
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
        <div className=" w-full ">
            <div className=' z-50 w-full fixed top-0 left-0 bg-white '>
                <DashboardHeader open={open} handleOpen={handleOpen} />
            </div>
            <div className={`z-40 h-h-screen-minus-80 fixed top-[80px] ps-10 left-0  bg-white duration-500 ${open
                ? " translate-x-0 lg:translate-x-[-298px] "
                : " translate-x-[-298px] lg:translate-x-0 "}  `}>
                <DashboardSideBar />
            </div>
            <div className=' mt-[80px] w-full flex min-h-h-screen-minus-80  '>

                <div className={` duration-500 flex-shrink-0 ${open ? " w-0 md:w-[298px] lg:w-0 " : "w-0 lg:w-[298px] "}`}></div>

                <div className=" flex-grow-1 w-full min-h-h-screen-minus-80 p-[40px] ">
                    {children}
                </div>
            </div>


        </div>
    )
}


export default Layout