import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className=" p-3 md:p-10 md:pt-10  md:pb-5 w-full h-full ">
            {children}
        </div>
    )
}

export default Layout