import SideBar from '@/components/dashboard/team/SideBar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (

        <div className=" px-10 w-full h-full ">
            {children}
            {/* <div className="flex h-full w-full bg-white">
                <SideBar />
                <div className=' h-full w-full max-w-[1200px] mx-auto p-10 overflow-y-auto '>
                    {children}
                </div>
            </div> */}
        </div>

    )
}

export default Layout