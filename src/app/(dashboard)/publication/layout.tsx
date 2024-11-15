'use client'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className=" px-10 w-full h-full ">
            {children}
        </div>
    )
}

export default Layout